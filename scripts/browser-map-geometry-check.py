"""Inspect the geographic board at desktop/tablet sizes after changing generated outlines."""
import os
from playwright.sync_api import sync_playwright,expect
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/snap/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 for width in [1440,768]:
  page=browser.new_page(viewport={'width':width,'height':1080},has_touch=width==768,reduced_motion='reduce')
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
  page.locator('#age-group').select_option('6-9y');page.locator('.material-card.world-puzzle-map').click();page.get_by_role('button',name='Begin the activity').click()
  expect(page.locator('.geography-mat .movable-piece')).to_have_count(7)
  # Ensure the new coastline asset remains manipulable and retains the seven-piece lifecycle.
  for i,name in enumerate(['South America','Australia','Africa','Antarctica','Asia','Europe','North America']):
   page.get_by_role('button',name='Lift '+name,exact=True).click()
   page.get_by_role('button',name=f'Try outline {i+1}',exact=True).click()
  expect(page.get_by_role('heading',name='Activity complete',exact=True)).to_be_visible()
  page.locator('.geography-mat').screenshot(path=f'/tmp/montessori-geography-final-{width}.png')
  assert not errors,errors
  page.close()
 browser.close()
print('PASS: corrected geography paths render at desktop/tablet sizes and all seven pieces lift and fit')
