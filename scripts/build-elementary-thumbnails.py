"""Generate original SVG illustrations from the same material geometry as activities."""
from pathlib import Path
import json, math
root=Path('public/materials')
def save(name,body,view='0 0 320 200'):
 (root/(name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" width="640" height="400">'+body+'</svg>\n')
board='<rect x="3" y="3" width="314" height="194" rx="8" fill="#d3b688"/>'
body=board
for col,(label,color) in enumerate([('1000','#548966'),('100','#bc5850'),('10','#5181a4'),('1','#548966')]):
 for row in range(3):
  x=16+col*76;y=20+row*52
  body+=f'<rect x="{x}" y="{y}" width="62" height="43" rx="3" fill="{color}"/><text x="{x+31}" y="{y+28}" text-anchor="middle" font-family="sans-serif" font-size="19" fill="white">{label}</text>'
save('stamp-game',body)
body=board
for i in range(5):
 x=34+i*62;n=i+1
 body+=f'<text x="{x}" y="48" text-anchor="middle" font-family="serif" font-size="32" fill="#334d3c">{n}</text>'
 for j in range(n):
  cx=x+(0 if n%2 and j==n-1 else (-10 if j%2==0 else 10));cy=76+(j//2)*30
  body+=f'<circle cx="{cx}" cy="{cy}" r="9" fill="#b94e46"/>'
save('cards-counters',body)
body=board
for i,d in enumerate([2,3,4]):
 x=57+i*102;body+=f'<rect x="{x-47}" y="51" width="94" height="98" fill="#4a8164"/><circle cx="{x}" cy="100" r="41" fill="#bc5149"/>'
 for j in range(d):
  a=j*2*math.pi/d
  body+=f'<path d="M{x},100L{x+41*math.sin(a)},{100-41*math.cos(a)}" stroke="#eddfbc" stroke-width="2"/>'
save('fraction-insets',body)
save('constructive-triangles',board+'<rect x="17" y="62" width="62" height="62" fill="#5a9267"/><path d="M17 124L79 62" stroke="#354133" stroke-width="3"/><rect x="100" y="68" width="98" height="56" fill="#9b9f9b"/><path d="M100 124L198 68" stroke="#354133" stroke-width="3"/><path d="M235 93L270 32.38L305 93L270 153.62Z" fill="#ddc151"/><path d="M235 93H305" stroke="#354133" stroke-width="3"/>')
body='<rect width="800" height="400" rx="14" fill="#c3a476"/><circle cx="205" cy="200" r="170" fill="#86b9cb"/><circle cx="595" cy="200" r="170" fill="#86b9cb"/>'
for c in json.load(open('src/content/geography/continents.json')):
 body+=f'<path d="{c["path"]}" fill="{c["color"]}" stroke="#766b54" stroke-width=".7"/><circle cx="{c["knob"][0]}" cy="{c["knob"][1]}" r="6" fill="#e4c99d"/>'
save('world-puzzle-map',body,'0 0 800 400')
