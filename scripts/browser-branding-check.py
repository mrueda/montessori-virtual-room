"""Verify local branding assets, responsive header, and the README's public app link."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
url=os.environ.get('APP_URL','http://127.0.0.1:8001/').rstrip('/')+'/'
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/snap/bin/chromium'),headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
 page=browser.new_page(viewport={'width':1100,'height':650})
 page.goto('about:blank')
 page.set_content(f'<body style="margin:0;background:#e5e8dc;display:grid;place-items:center;min-height:620px"><main style="text-align:center"><img src="{url}brand/logo.svg" width="620"><div style="display:flex;justify-content:center;align-items:center;gap:40px;margin-top:32px">'+''.join(f'<img src="{url}brand/mark.svg" width="{n}">' for n in [100,48,24])+'</div></main></body>')
 page.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)')
 page.screenshot(path='/tmp/montessori-brand-review.png')
 for width in [1440,768,390]:
  page.set_viewport_size({'width':width,'height':1000})
  page.goto(url,wait_until='networkidle')
  expect(page.locator('.brand-mark')).to_be_visible()
  assert page.locator('.brand-mark').evaluate('i=>i.complete&&i.naturalWidth>0')
  expect(page.locator('link[rel="icon"]')).to_have_attribute('href',__import__('re').compile(r'brand/mark\.svg$'))
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  page.locator('.site-header').screenshot(path=f'/tmp/montessori-branded-header-{width}.png')
 browser.close()
readme=Path('README.md').read_text()
assert 'https://mrueda.github.io/montessori-virtual-room/' in readme
assert 'SESSION_NOTES' not in readme and 'npm ' not in readme
print('PASS: logo assets, responsive header, favicon, and public README link')
