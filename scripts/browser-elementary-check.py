"""Exercise all five concrete activities through the public UI, including correction/reset/examples."""
import os
from playwright.sync_api import sync_playwright,expect
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/snap/bin/chromium'),headless=True,args=ARGS)
 page=browser.new_page(viewport={'width':1440,'height':1080},reduced_motion='reduce')
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
 def open_activity(id,age='6-9y'):
  if page.get_by_role('button',name='Back to the classroom').count():page.get_by_role('button',name='Back to the classroom').click()
  page.locator('#age-group').select_option(age)
  page.locator('.material-card.'+id).click()
  expect(page.get_by_role('button',name='Listen',exact=False)).to_be_visible()
  page.get_by_role('button',name='Begin the activity').click()
  expect(page.locator('.elementary-work')).to_be_visible()
  expect(page.get_by_role('group',name='Activity view')).to_have_count(0)
 def screenshot(id):
  page.locator('.elementary-work').screenshot(path=f'/tmp/montessori-{id}.png')
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 def reset():
  page.get_by_role('button',name='Start again',exact=True).click()
  expect(page.locator('.completion-note')).to_contain_text('Take your time')
 open_activity('cards-counters')
 for n in range(1,11):
  page.get_by_role('button',name=f'Choose numeral {n}',exact=True).click()
  page.get_by_role('button',name=f'Numeral place {n}',exact=True).click()
  slots=[(r,side) for r in range(n//2) for side in ['left','right']]+([(n//2,'center')] if n%2 else [])
  for row,side in slots:page.get_by_role('button',name=f'Place counter at column {n}, row {row+1}, {side}',exact=True).click()
 expect(page.locator('.completion-note')).to_contain_text('numerals and quantities correspond')
 screenshot('cards-counters')
 page.get_by_role('button',name='Return counter at column 1, row 1, center').click()
 expect(page.locator('.completion-note')).to_contain_text('Take your time')
 reset()
 open_activity('stamp-game')
 page.get_by_label('Choose an addition').select_option('1')
 for row,value in [(1,1286),(2,1457)]:
  for stamp in [1000,100,10,1]:
   for _ in range(value//stamp%10):page.get_by_role('button',name=f'Add {stamp} stamp to addend {row}',exact=True).click()
 page.get_by_role('button',name='Remove divider & combine').click()
 page.get_by_role('button',name='Exchange ten 1s',exact=True).click()
 page.get_by_role('button',name='Exchange ten 10s',exact=True).click()
 page.get_by_label('Record your sum').fill('2743')
 expect(page.locator('.completion-note')).to_contain_text('represented quantities')
 screenshot('stamp-game');reset()
 open_activity('fraction-insets','9-12y')
 page.get_by_role('button',name='Choose 1/3 inset',exact=True).click()
 for _ in range(2):page.get_by_role('button',name='Move one 1/3 to comparison',exact=True).click()
 expect(page.locator('.completion-note')).to_contain_text('Take your time')
 reset()
 page.get_by_role('button',name='Choose 1/4 inset',exact=True).click()
 for _ in range(2):page.get_by_role('button',name='Move one 1/4 to comparison',exact=True).click()
 expect(page.locator('.completion-note')).to_contain_text('same area')
 screenshot('fraction-insets')
 page.get_by_role('button',name='Guidance',exact=True).click()
 page.get_by_role('button',name='Watch a demonstration').click()
 expect(page.get_by_role('button',name='Play example',exact=True)).to_be_visible()
 for _ in range(3):page.get_by_role('button',name='Next step',exact=True).click()
 expect(page.locator('.example-caption')).to_contain_text('Two fourths')
 page.get_by_role('button',name='Return to my work',exact=True).click()
 expect(page.locator('.completion-note')).to_contain_text('same area');reset()
 open_activity('constructive-triangles','9-12y')
 # Rotate with keyboard-accessible controls, then use pointer movement in SVG coordinates.
 for index,x,y,turns in [(1,180,200,3),(3,250,460,-3),(5,745,230.829,4)]:
  page.get_by_label('Selected triangle',exact=True).select_option(str(index))
  for _ in range(abs(turns)):page.get_by_role('button',name='Rotate right 30°' if turns>0 else 'Rotate left 30°',exact=True).click()
  svg=page.locator('.geometry-mat');svg.scroll_into_view_if_needed();box=svg.bounding_box()
  piece=svg.locator('g.movable-piece').nth(index)
  # Centroid is the SVG translate; drag from inside the colored triangle.
  import re
  pos=[float(v) for v in re.search(r'translate\(([^)]+)\)',piece.get_attribute('transform')).group(1).split()]
  page.mouse.move(box['x']+pos[0]*box['width']/900,box['y']+pos[1]*box['height']/600)
  page.mouse.down();page.mouse.move(box['x']+x*box['width']/900,box['y']+y*box['height']/600,steps=8);page.mouse.up()
 expect(page.locator('.completion-note')).to_contain_text('three pairs form')
 screenshot('constructive-triangles');reset()
 open_activity('world-puzzle-map')
 names=['South America','Australia','Africa','Antarctica','Asia','Europe','North America']
 for i,name in enumerate(names):
  page.get_by_role('button',name='Lift '+name,exact=True).click()
  if i==0:
   page.get_by_role('button',name='Try outline 2',exact=True).click()
   expect(page.get_by_role('button',name='Select South America',exact=True)).to_be_visible()
  page.get_by_role('button',name=f'Try outline {i+1}',exact=True).click()
 expect(page.locator('.completion-note')).to_contain_text('Every continent')
 screenshot('world-puzzle-map');reset()
 # Tablet: use a touch-enabled context and exercise actual touch pointer events.
 page.close()
 page=browser.new_page(viewport={'width':768,'height':1024},has_touch=True,reduced_motion='reduce')
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
 for id in ['cards-counters','stamp-game','fraction-insets','constructive-triangles','world-puzzle-map']:
  open_activity(id)
  screenshot(id+'-tablet')
 # Touch-drag Africa away and back by its knob, without relying on answer buttons.
 page.get_by_role('button',name='Lift Africa',exact=True).click()
 svg=page.locator('.geography-mat');svg.scroll_into_view_if_needed()
 piece=svg.locator('[aria-label="Africa, on the mat"]')
 position=piece.evaluate('el => {const c=el.querySelector("circle:last-child"); const x=+c.getAttribute("cx"),y=+c.getAttribute("cy");const at=new DOMPoint(x,y).matrixTransform(el.getScreenCTM());const home=new DOMPoint(x,y).matrixTransform(el.ownerSVGElement.getScreenCTM());return {x:at.x,y:at.y,tx:home.x,ty:home.y}}')
 cdp=page.context.new_cdp_session(page)
 cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':position['x'],'y':position['y']}]})
 for step in range(1,9):
  t=step/8
  cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':position['x']+(position['tx']-position['x'])*t,'y':position['y']+(position['ty']-position['y'])*t}]})
 cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
 expect(page.get_by_role('button',name='Lift Africa',exact=True)).to_be_visible()
 assert not errors,errors
 browser.close()
print('PASS: all five activities; completion, correction, reset, example state isolation, pointer movement, touch dragging, and tablet layouts')
