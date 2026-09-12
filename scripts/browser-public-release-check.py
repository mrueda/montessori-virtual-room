"""Fresh visitors can access every material without accounts or school codes."""
import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=os.environ.get('CHROMIUM_PATH', '/snap/bin/chromium'),
        headless=True,
        args=['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    )
    page = browser.new_page(viewport={'width': 1280, 'height': 1000})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    base = os.environ.get('APP_URL', 'http://127.0.0.1:8001/').rstrip('/') + '/'
    for suffix in ['', '?preview=school', 'school/greenwood/']:
        page.goto(base + suffix, wait_until='networkidle')
        expect(page.get_by_role('heading', name='A room for curiosity.')).to_be_visible()
        expect(page.get_by_role('button', name='For schools', exact=True)).to_have_count(0)
        expect(page.locator('input[type="password"]')).to_have_count(0)
        assert not page.locator('.school-access-gate').count()
    voice_checked = False
    for age, ids in [('3-6y', ['pink-tower', 'cylinder-blocks', 'pouring', 'dressing-frame', 'color-tablets', 'red-rods', 'broad-stair', 'number-rods', 'sandpaper-letters', 'continent-globe', 'world-puzzle-map', 'land-water-forms', 'botany-cabinet', 'animal-classification', 'life-cycle-sequencing', 'color-mixing', 'line-design', 'greeting-practice', 'table-setting', 'walking-around-mat']), ('18m-3y', ['transferring', 'shape-puzzle'])]:
        page.get_by_label('YOUR LEARNING ENVIRONMENT').select_option(age)
        for material in ids:
            page.locator('.material-card.' + material).click()
            listen = page.get_by_role('button', name='Listen to narrated introduction')
            expect(listen).to_be_visible()
            if not voice_checked:
                with page.expect_response(lambda response: response.url.endswith('.mp3')) as response_info:
                    listen.click()
                assert response_info.value.ok
                expect(page.get_by_role('button', name='Pause narrated introduction')).to_be_visible()
                page.get_by_role('button', name='Pause narrated introduction').click()
                page.get_by_text('Read narration transcript', exact=True).click()
                expect(page.locator('.narration-control details p')).to_be_visible()
                voice_checked = True
            page.get_by_role('button', name='Read the parent & educator notes').click()
            expect(page.locator('.educator-notes')).to_be_visible()
            page.get_by_role('button', name='Begin the activity').click()
            expect(page.get_by_role('button', name='Guidance', exact=True)).to_be_visible()
            page.get_by_role('button', name='Back to the classroom').click()
    assert not errors, '\n'.join(errors)
    print('PASS: fresh public entry, narration, legacy links, both classrooms, all 22 activities, adult notes, and no school gate')
    browser.close()
