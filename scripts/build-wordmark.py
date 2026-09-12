"""Outline DM Sans lettering for a portable SVG wordmark.
Usage: python3 scripts/build-wordmark.py /path/to/DMSans-variable.ttf
Source: https://github.com/google/fonts/tree/main/ofl/dmsans (SIL OFL 1.1).
Requires fontTools only when regenerating, not in the application.
"""
from pathlib import Path
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

def lettering(text,size,weight,x,y,tracking,color):
 font=instantiateVariableFont(TTFont(sys.argv[1]),{'wght':weight,'opsz':36},inplace=False)
 glyphs=font.getGlyphSet(); cmap=font.getBestCmap();scale=size/font['head'].unitsPerEm
 output=[]
 for char in text:
  name=cmap[ord(char)];pen=SVGPathPen(glyphs);glyphs[name].draw(pen)
  if pen.getCommands():output.append(f'<path d="{pen.getCommands()}" transform="translate({x:.3f} {y}) scale({scale:.5f} {-scale:.5f})" fill="{color}"/>')
  x+=glyphs[name].width*scale+tracking
 return '\n'.join(output)
mark=Path('public/brand/mark.svg').read_text();body=mark[mark.index('  <rect'):mark.rindex('</svg>')]
svg='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 208" role="img" aria-labelledby="title desc">
<title id="title">Montessori Virtual Room</title>
<desc id="desc">The Pink Tower in an open room, with a softly rounded Montessori Virtual Room wordmark.</desc>
<rect width="720" height="208" rx="28" fill="#f5f1e6"/>
<g transform="translate(34 32) scale(1.125)">
'''+body+'</g>\n'+lettering('montessori',73,500,205,110,-2.2,'#344f3d')+'\n'+lettering('VIRTUAL ROOM',18,500,211,149,5.2,'#687b60')+'\n</svg>\n'
Path('public/brand/logo.svg').write_text(svg)
