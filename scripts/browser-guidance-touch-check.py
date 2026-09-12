"""Touch-sized guidance navigation on tablet, phone, and landscape layouts."""
import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=os.environ.get('CHROMIUM_PATH', '/snap/bin/chromium'),
        headless=True,
        args=['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    )
    page = browser.new_page(viewport={'width': 820, 'height': 1180}, has_touch=True)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(os.environ.get('APP_URL', 'http://127.0.0.1:8001/'), wait_until='networkidle')
    page.locator('.material-card.pink-tower').tap()
    page.get_by_role('button', name='Begin the activity').tap()
    page.get_by_role('button', name='Guidance', exact=True).tap()
    page.get_by_role('button', name='Watch a demonstration').tap()
    dialog = page.get_by_role('dialog')
    expect(dialog.locator('canvas')).to_be_visible(timeout=15000)
    dialog.get_by_role('button', name='Pause demonstration').tap()
    dialog.get_by_label('Movement speed').select_option('0.5')
    expect(dialog.get_by_label('Movement speed')).to_have_value('0.5')
    dialog.locator('summary').tap()
    steps = dialog.locator('.demo-transcript li button')
    steps.nth(5).tap()
    expect(dialog.locator('.demo-playback-settings')).to_contain_text('Step 6 of 10')
    expect(steps.nth(5)).to_have_attribute('aria-current', 'step')
    expect(dialog.get_by_role('button', name='Play demonstration')).to_be_visible()
    dialog.get_by_role('button', name='Previous step').tap()
    expect(dialog.locator('.demo-playback-settings')).to_contain_text('Step 5 of 10')
    dialog.get_by_role('button', name='Next step').tap()
    expect(dialog.locator('.demo-playback-settings')).to_contain_text('Step 6 of 10')
    steps.nth(0).tap()
    expect(dialog.get_by_role('button', name='Previous step')).to_be_disabled()
    steps.nth(9).tap()
    dialog.get_by_role('button', name='Next step').tap()
    expect(dialog.get_by_role('status')).to_contain_text('The example is complete')
    dialog.get_by_role('button', name='Previous step').tap()
    expect(dialog.get_by_role('button', name='Next step')).to_be_enabled()
    for width, height in [(820, 1180), (1180, 820), (390, 844), (844, 390)]:
        page.set_viewport_size({'width': width, 'height': height})
        assert dialog.evaluate('(el) => el.scrollWidth <= el.clientWidth + 1'), 'Dialog overflows horizontally'
        for button in dialog.locator('.demo-controls button').all():
            box = button.bounding_box()
            assert box['height'] >= 48 and box['width'] >= 48, 'Touch target too small'
        dialog.get_by_role('button', name='Previous step').scroll_into_view_if_needed()
    page.set_viewport_size({'width': 820, 'height': 1180})
    dialog.locator('summary').tap()
    dialog.evaluate('(el) => el.scrollTop = 0')
    page.screenshot(path='/tmp/montessori-tablet-guidance.png')
    dialog.get_by_role('button', name='Return to my work').tap()
    expect(page.get_by_role('dialog')).to_have_count(0)
    assert not errors, '\n'.join(errors)
    print('PASS: touch step selection, previous/next/completion navigation, speed selection, readable tablet/phone layouts, and return to work')
    browser.close()
