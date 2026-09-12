"""Verify drawing, restoration, table arrangement, examples, 3D and touch through the UI."""
import math,os,io
from PIL import Image
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/snap/bin/chromium'),headless=True,downloads_path=str(Path.cwd()/".browser-downloads"),args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 errors=[]
 page=browser.new_page(viewport={'width':1440,'height':1080},reduced_motion='reduce')
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
 def open_activity(id,age='3-6y'):
  if page.get_by_role('button',name='Back to the classroom').count():page.get_by_role('button',name='Back to the classroom').click()
  page.locator('#age-group').select_option(age);page.locator('.material-card.'+id).click()
  expect(page.get_by_role('button',name='Listen to narrated introduction',exact=True)).to_be_visible()
  page.get_by_role('button',name='Begin the activity').click();expect(page.locator('.elementary-work')).to_be_visible()
 def svg_point(svg,x,y,w,h):
  box=svg.bounding_box();return (box['x']+x*box['width']/w,box['y']+y*box['height']/h)
 def line(points):
  svg=page.locator('.inset-drawing-surface');svg.scroll_into_view_if_needed()
  page.mouse.move(*svg_point(svg,*points[0],820,560));page.mouse.down()
  for point in points[1:]:page.mouse.move(*svg_point(svg,*point,820,560))
  page.mouse.up()
 def shot(name):page.locator('.elementary-work').screenshot(path='/tmp/montessori-'+name+'.png')
 def rendered_canvas():
  canvas=page.locator('.activity-stage canvas')
  expect(canvas).to_be_visible()
  for _ in range(20):
   capture=canvas.screenshot()
   rendered=Image.open(io.BytesIO(capture)).convert('RGB')
   width,height=rendered.size
   colors=rendered.crop((width//4,height//4,width*3//4,height*3//4)).getcolors(maxcolors=1_000_000)
   if colors and len(colors)>100:
    Path('/tmp/montessori-table-setting-rendered-canvas.png').write_bytes(capture)
    return
   page.wait_for_timeout(250)
  raise AssertionError('The 3D canvas has not rendered visible geometry')
 def example():
  page.get_by_role('button',name='Guidance',exact=True).click();page.get_by_role('button',name='Watch a demonstration').click()
  while page.get_by_role('button',name='Next step',exact=True).is_enabled():page.get_by_role('button',name='Next step',exact=True).click()
  page.get_by_role('button',name='Return to my work',exact=True).click()
 open_activity('metal-insets')
 circle=[(280+130*math.cos(i*math.pi/48),280+130*math.sin(i*math.pi/48)) for i in range(97)]
 for tool,color in [('Place frame on paper','Terracotta'),('Place inset on paper','Blue')]:
  page.get_by_role('button',name=tool,exact=True).click();page.get_by_role('button',name='Choose pencil '+color,exact=True).click();line(circle)
 page.get_by_role('button',name='Check my work',exact=True).click();expect(page.locator('#activity-feedback')).to_contain_text('Both outlines')
 page.get_by_role('button',name='Return both to tray',exact=True).click();page.get_by_role('button',name='Choose pencil Green',exact=True).click()
 for x in range(185,386,20):
  dy=math.sqrt(130**2-(x-280)**2);line([(x,280-dy+5),(x,280+dy-5)])
 before=page.locator('.inset-drawing-surface > path').count();shot('metal-insets')
 example();expect(page.locator('.inset-drawing-surface > path')).to_have_count(before)
 with page.expect_download() as download:page.get_by_role('button',name='Keep my drawing',exact=True).click()
 assert download.value.failure() is None, download.value.failure()
 download.value.save_as('/tmp/montessori-inset-export.svg')
 assert '<svg' in open('/tmp/montessori-inset-export.svg').read()
 page.get_by_role('button',name='Put away my materials',exact=True).click();expect(page.locator('#activity-feedback')).to_contain_text('materials are put away')
 page.get_by_role('button',name='Start again',exact=True).click();expect(page.locator('.inset-drawing-surface > path')).to_have_count(0)
 # Keyboard pencil, without mouse tracing or automatic completion.
 paper=page.get_by_role('application',name='Metal Insets drawing paper');paper.focus();paper.press('Space')
 for _ in range(8):paper.press('ArrowDown')
 paper.press('Space');expect(page.locator('.inset-drawing-surface > path')).to_have_count(1)
 open_activity('table-setting','18m-3y')
 page.get_by_role('button',name='Fold napkin in half',exact=True).click()
 # Drag every snack item, using both a wrong placement and subsequent correction.
 for name,x,y in [('Plate',350,285),('Spoon',505,300),('Glass',490,140),('Napkin',125,300)]:
  item=page.get_by_role('button',name='Select '+name,exact=True);item.scroll_into_view_if_needed();svg=page.locator('.setting-surface')
  center=item.evaluate('el=>{const m=el.getScreenCTM();return {x:m.e,y:m.f}}')
  page.mouse.move(center['x'],center['y']);page.mouse.down()
  page.mouse.move(*svg_point(svg,x,y,1000,550),steps=12);page.mouse.up()
 expect(page.locator('#activity-feedback')).to_contain_text('Activity complete');shot('table-setting')
 example();expect(page.locator('#activity-feedback')).to_contain_text('Activity complete')
 page.get_by_role('button',name='3D',exact=True).click();rendered_canvas();shot('table-setting-3d')
 page.get_by_label('Selected object',exact=True).select_option('0');page.get_by_role('button',name='Rotate right 15°',exact=True).click();expect(page.locator('#activity-feedback')).to_contain_text('Activity complete')
 page.get_by_role('button',name='Return selected object to tray',exact=True).click();expect(page.locator('.completion-note')).to_contain_text('Take your time')
 page.get_by_role('button',name='Start again',exact=True).click();page.get_by_label('Choose a setting',exact=True).select_option('meal');expect(page.get_by_label('Selected object',exact=True).locator('option')).to_have_count(6)
 page.close()
 page=browser.new_page(viewport={'width':768,'height':1024},has_touch=True,reduced_motion='reduce');page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('APP_URL','http://127.0.0.1:8001/'),wait_until='networkidle')
 for width in [768,390]:
  page.set_viewport_size({'width':width,'height':1024})
  for id in ['metal-insets','table-setting']:
   open_activity(id);shot(id+'-'+str(width));assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(id,width)
   if id=='metal-insets':
    page.get_by_role('button',name='Place frame on paper',exact=True).tap();svg=page.locator('.inset-drawing-surface');svg.scroll_into_view_if_needed()
    cdp=page.context.new_cdp_session(page);x,y=svg_point(svg,410,280,820,560);cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    for point in circle[1:26]:
     x,y=svg_point(svg,*point,820,560);cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});expect(page.locator('.inset-drawing-surface > path')).to_have_count(1)
   else:
    page.get_by_label('Selected object',exact=True).select_option('0');page.get_by_role('button',name='Move to center of mat',exact=True).tap()
    expect(page.get_by_role('button',name='Select Plate',exact=True)).to_have_attribute('transform','translate(350 285) rotate(0)')
 assert not errors,errors
 browser.close()
print('PASS: deliberate tracing, free drawing/export, keyboard pencil, table completion/correction, 3D, independent examples, touch drawing and responsive layouts')
