"""Exercise the three sourced additions through the public UI and touch layouts."""
import os
from playwright.sync_api import sync_playwright, expect
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/snap/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 errors=[]
 page=browser.new_page(viewport={'width':1440,'height':1080},reduced_motion='reduce')
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
 def open_activity(id,age='3-6y'):
  if page.get_by_role('button',name='Back to the classroom').count():page.get_by_role('button',name='Back to the classroom').click()
  page.locator('#age-group').select_option(age)
  page.locator('.material-card.'+id).click()
  expect(page.get_by_role('button',name='Listen to narrated introduction',exact=True)).to_be_visible()
  page.get_by_role('button',name='Begin the activity').click()
  expect(page.locator('.elementary-work')).to_be_visible()
 def shot(name):page.locator('.elementary-work').screenshot(path='/tmp/montessori-'+name+'.png')
 def example():
  page.get_by_role('button',name='Guidance',exact=True).click()
  page.get_by_role('button',name='Watch a demonstration').click()
  expect(page.get_by_role('button',name='Play example',exact=True)).to_be_visible()
  while page.get_by_role('button',name='Next step',exact=True).is_enabled():page.get_by_role('button',name='Next step',exact=True).click()
  page.get_by_role('button',name='Return to my work',exact=True).click()
 def tilt(value):
  slider=page.get_by_role('slider',name='Pitcher tilt')
  slider.focus();slider.press('Home')
  for _ in range(value//5):slider.press('ArrowRight')
 open_activity('movable-alphabet')
 page.get_by_label('Choose an invitation').select_option('0')
 for index,letter in enumerate('sun'):
  page.get_by_role('button',name=f'Choose letter {letter},',exact=False).click()
  page.get_by_role('button',name=f'Place letter at row 1, place {index+1}',exact=True).click()
 page.get_by_role('button',name='Check my work',exact=True).click()
 expect(page.locator('#activity-feedback')).to_contain_text('conventional spelling')
 shot('movable-alphabet');example()
 expect(page.get_by_role('button',name='Select s at row 1, place 1',exact=True)).to_be_visible()
 for i,letter in enumerate('sun'):
  page.get_by_role('button',name=f'Select {letter} at row 1, place {i+1}',exact=True).click()
  page.get_by_role('button',name='Return selected letter',exact=True).click()
 expect(page.locator('#activity-feedback')).to_contain_text('material is put away')
 page.get_by_role('button',name='Start again',exact=True).click()
 expect(page.locator('.alphabet-slot.has-letter')).to_have_count(0)
 open_activity('land-water-forms')
 page.get_by_role('button',name='Pick up pitcher',exact=True).click()
 for name in ['Island','Lake']:
  page.get_by_role('button',name='Move over '+name,exact=True).click();tilt(40)
  expect(page.get_by_text('Water reveals the outline.',exact=True)).to_have_count(1 if name=='Island' else 2,timeout=8000)
  tilt(0)
 page.get_by_role('button',name='Return pitcher',exact=True).click()
 if page.get_by_role('button',name='Wipe the tray',exact=True).is_enabled():page.get_by_role('button',name='Wipe the tray',exact=True).click()
 expect(page.locator('#activity-feedback')).to_contain_text('Activity complete')
 shot('land-water-forms')
 page.get_by_role('button',name='3D',exact=True).click();expect(page.locator('.activity-stage canvas')).to_be_visible()
 shot('land-water-forms-3d');example()
 expect(page.locator('#activity-feedback')).to_contain_text('Activity complete')
 page.get_by_role('button',name='Start again',exact=True).click()
 for pair in ['1','2']:
  page.get_by_label('Compare a pair').select_option(pair);shot('land-water-pair-'+pair)
 open_activity('checkerboard','6-9y')
 page.get_by_label('Choose a multiplication').select_option('1')
 for row,multiplier in [(1,4),(2,2)]:
  for col,bar in [(1,6),(2,3)]:
   page.get_by_role('button',name=f'Select row {row}, column {col},',exact=False).click()
   page.get_by_role('button',name=f'Choose {bar}-bead bar',exact=True).click()
   for _ in range(multiplier):page.get_by_role('button',name='Place one selected bar',exact=True).click()
 shot('checkerboard-partials')
 page.get_by_role('button',name='Gather along equal-value diagonals',exact=True).click()
 for col in [1,2]:
  page.get_by_role('button',name=f'Select row 1, column {col},',exact=False).click()
  page.get_by_role('button',name='Exchange groups of ten to the left',exact=True).click()
 page.get_by_label('Record the product').fill('864')
 expect(page.locator('#activity-feedback')).to_contain_text('Activity complete')
 shot('checkerboard-product');example()
 expect(page.get_by_label('Record the product')).to_have_value('864')
 page.get_by_role('button',name='Return to partial products',exact=True).click()
 expect(page.locator('.checker-bars svg')).to_have_count(12)
 page.close()
 page=browser.new_page(viewport={'width':768,'height':1024},has_touch=True,reduced_motion='reduce')
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
 for width in [768,390]:
  page.set_viewport_size({'width':width,'height':1024})
  for id,age in [('movable-alphabet','3-6y'),('land-water-forms','3-6y'),('checkerboard','9-12y')]:
   open_activity(id,age);shot(id+'-'+str(width))
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'),(id,width)
   if id=='movable-alphabet':
    page.get_by_role('button',name='Choose letter a,',exact=False).tap()
    page.get_by_role('button',name='Place letter at row 1, place 1',exact=True).tap()
    expect(page.get_by_role('button',name='Select a at row 1, place 1',exact=True)).to_be_visible()
   if id=='checkerboard':
    page.get_by_role('button',name='Select row 1, column 1,',exact=False).tap()
    page.get_by_role('button',name='Place one selected bar',exact=True).tap()
    expect(page.locator('.checker-bars svg')).to_have_count(1)
 assert not errors,errors
 browser.close()
print('PASS: composition/restoration, pouring in 2D/3D, dynamic multiplication, example isolation, reset, responsive layouts and touch controls')
