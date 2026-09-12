"""Check the active classroom after withdrawing inaccurate draft interactions."""
import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/snap/bin/chromium'), headless=True, args=['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    page = browser.new_page(viewport={'width': 1280, 'height': 1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(os.environ.get('APP_URL', 'http://127.0.0.1:8001/'), wait_until='networkidle')
    expect(page.locator('.material-card')).to_have_count(14)
    for removed in ['line-design', 'sandpaper-letters', 'continent-globe']:
        expect(page.locator('.material-card.' + removed)).to_have_count(0)
    expect(page.get_by_label('Classroom views').get_by_role('button', name='Culture', exact=True)).to_have_count(1)
    page.locator('.material-card.pink-tower').click()
    page.get_by_role('button', name='Read the parent & educator notes').click()
    expect(page.get_by_role('heading', name='About this simulation')).to_be_visible()
    expect(page.get_by_role('link', name='Material or practice reference 1')).to_have_attribute('href', 'https://www.nienhuis.com/us/product/the-pink-tower/500_002400/')
    page.get_by_role('button', name='Begin the activity').click()
    expect(page.get_by_role('button', name='Guidance', exact=True)).to_be_visible()
    page.get_by_role('button', name='Back to the classroom').click()
    page.locator('#age-group').select_option('18m-3y')
    expect(page.locator('.material-card')).to_have_count(4)
    assert not errors, errors
    browser.close()
print('PASS: withdrawn drafts absent, remaining classrooms usable, source notes visible')
