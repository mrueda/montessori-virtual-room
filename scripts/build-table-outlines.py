"""Build the original transparent outline mats used by the 3D table surface."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
plate='<circle r="95"/><circle r="73"/>'
fork='<path d="M-6-22L-9 64Q0 79 9 64L6-22Q20-25 20-40V-72H14V-43H7V-72H2V-43H-4V-72H-10V-43H-15V-72H-21V-40Q-20-25-6-22Z"/>'
spoon='<path d="M-5-22C-5 8-9 35-8 64Q0 79 8 64C9 35 5 8 5-22Z"/><ellipse cy="-44" rx="20" ry="29"/>'
glass='<circle r="34"/><circle r="26"/>'
napkin='<rect x="-27" y="-57" width="54" height="114"/>'
objects=[(350,285,plate),(215,300,fork),(505,300,spoon),(490,140,glass),(125,300,napkin)]
for setting in ['snack','meal']:
 svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550"><g fill="none" stroke="#71846a" stroke-width="3">'
 for i,(x,y,art) in enumerate(objects):
  if setting=='snack' and i==1:continue
  svg+=f'<g transform="translate({x} {y})">{art}</g>'
 svg+='</g></svg>'
 (root/'public/materials'/f'table-outlines-{setting}.svg').write_text(svg+'\n')
