"""Pink Tower direct manipulation, correction, and restoration checks."""
import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/snap/bin/chromium'), args=['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    page = browser.new_page(viewport={'width': 1440, 'height': 1100}, has_touch=True)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(os.environ.get('APP_URL', 'http://127.0.0.1:8001/'), wait_until='networkidle')
    page.locator('.material-card.pink-tower').click()
    page.get_by_role('button', name='Begin the activity').click()
    mat = page.locator('.tower-mat')
    mat.scroll_into_view_if_needed()
    def point(locator):
        box = locator.bounding_box()
        return (box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
    def drag(locator, target):
        page.mouse.move(*point(locator))
        page.mouse.down()
        page.mouse.move(*target, steps=12)
        page.mouse.up()
    positions = [point(slot) for slot in page.locator('.cube-slot').all()]
    for size in range(10, 0, -1):
        cube = page.get_by_role('button', name=f'Select cube {size},', exact=False)
        before = cube.locator('.pink-cube').bounding_box()['width']
        drag(cube, point(mat))
        expect(page.locator('.stack-cube')).to_have_count(11-size)
        after = page.locator('.top-cube').bounding_box()['width']
        assert abs(before-after) < 0.1, 'Cube changes scale when carried'
    expect(page.locator('.completion-note')).not_to_contain_text('Take your time')
    assert positions == [point(slot) for slot in page.locator('.cube-slot').all()], 'Tray slots moved'
    x,y = point(mat)
    drag(page.locator('.top-cube'), (x+30,y))
    expect(page.locator('.completion-note')).to_contain_text('Take your time')
    for _ in range(10):page.get_by_role('button', name='Move top cube left').click()
    expect(page.locator('.completion-note')).not_to_contain_text('Take your time')
    page.get_by_role('button', name='3D', exact=True).click()
    expect(page.locator('.completion-note')).not_to_contain_text('Take your time')
    page.get_by_role('button', name='2D', exact=True).click()
    mat.scroll_into_view_if_needed()
    drag(page.locator('.top-cube'), point(page.locator('.cube-tray')))
    expect(page.locator('.stack-cube')).to_have_count(9)
    # A canceled touch must leave the material where it was.
    client = page.context.new_cdp_session(page)
    cube = page.get_by_role('button', name='Select cube 1, smallest')
    x,y=point(cube)
    client.send('Input.dispatchTouchEvent', {'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    tx,ty=point(mat)
    client.send('Input.dispatchTouchEvent', {'type':'touchMove','touchPoints':[{'x':tx,'y':ty}]})
    client.send('Input.dispatchTouchEvent', {'type':'touchCancel','touchPoints':[]})
    expect(page.locator('.stack-cube')).to_have_count(9)
    x,y=point(cube)
    client.send('Input.dispatchTouchEvent', {'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    client.send('Input.dispatchTouchEvent', {'type':'touchMove','touchPoints':[{'x':tx,'y':ty}]})
    client.send('Input.dispatchTouchEvent', {'type':'touchEnd','touchPoints':[]})
    expect(page.locator('.stack-cube')).to_have_count(10)
    for _ in range(10):page.get_by_role('button', name='Lift the top cube back to the tray').click()
    expect(page.locator('.stack-cube')).to_have_count(0)
    expect(page.locator('.cube-choice')).to_have_count(10)
    page.set_viewport_size({'width':390,'height':844})
    assert page.locator('.tower-layout').evaluate('(el) => el.scrollWidth <= el.clientWidth')
    assert not errors, '\n'.join(errors)
    print('PASS: drag construction, consistent cube proportions, stable tray, alignment correction, view switching, touch cancel/drop, and restoring all cubes')
    browser.close()
