"""Check six age environments, numbered tour links, and accessible text."""
import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/snap/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    for width in [1440,768]:
        page=browser.new_page(viewport={'width':width,'height':1000},has_touch=width==768)
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
        expect(page.locator('#age-group option')).to_have_count(6)
        for age,slug in [('0-18m','nido'),('6-9y','lower-elementary'),('9-12y','upper-elementary'),('12-18y','adolescent')]:
            page.locator('#age-group').select_option(age)
            expect(page.locator('.room-canvas canvas')).to_be_visible()
            expect(page.locator('.environment-guide')).to_be_visible()
            expect(page.locator('.material-card')).to_have_count({'6-9y':5,'9-12y':2}.get(age,0))
            expect(page.locator('.environment-marker')).to_have_count(3)
            page.locator('.environment-marker').first.click()
            expect(page.locator('.environment-points details').first).to_have_attribute('open','')
            expect(page.locator('.environment-points summary').first).to_be_focused()
            page.locator('.environment-points summary').first.press('Enter')
            expect(page.locator('.environment-points details').first).not_to_have_attribute('open','')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')
            page.locator('.room-section').scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            page.locator('.room-section').screenshot(path=f'/tmp/montessori-{slug}-{width}.png')
        page.locator('#age-group').select_option('18m-3y')
        expect(page.locator('.material-card')).to_have_count(3)
        expect(page.locator('.environment-guide')).to_have_count(0)
        page.locator('#age-group').select_option('3-6y')
        expect(page.locator('.material-card')).to_have_count(10)
        assert not errors,errors
        page.close()
    browser.close()
print('PASS: six environments; desktop/tablet tours, keyboard links, no overflow, original classroom regression')
