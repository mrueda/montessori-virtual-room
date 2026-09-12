"""Build local SVG geometry from Natural Earth's public-domain 1:110m regions.
Usage: python3 scripts/build-continent-paths.py /tmp/montessori-regions.geojson /tmp/montessori-land.geojson
Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_geography_regions_polys.geojson
Build-time dependency: Shapely 2.1.2. No runtime geographic library dependency. Seven continent groups;
hemisphere-edge fragments stay with their continent in this digital adaptation.
"""
import json, math, sys
from pathlib import Path
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

def clip(points, limit, lower):
    result=[]
    if not points: return result
    previous=points[-1]
    for current in points:
        pin=previous[0]>=limit if lower else previous[0]<=limit
        cin=current[0]>=limit if lower else current[0]<=limit
        if pin != cin:
            t=(limit-previous[0])/(current[0]-previous[0])
            result.append([limit,previous[1]+t*(current[1]-previous[1])])
        if cin: result.append(current)
        previous=current
    return result

def simplify(points, tolerance=0.35):
    if len(points)<3:return points
    a,b=points[0],points[-1]
    dx,dy=b[0]-a[0],b[1]-a[1]; length=dx*dx+dy*dy
    def distance(p):
        t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/length)) if length else 0
        return math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)
    index=max(range(1,len(points)-1),key=lambda i:distance(points[i]))
    if distance(points[index])<=tolerance:return [a,b]
    return simplify(points[:index+1],tolerance)[:-1]+simplify(points[index:],tolerance)

def project(lon,lat,center,cx):
    a=math.radians(lon-center); b=math.radians(lat)
    # Lambert azimuthal equal-area: avoid crushing polar land into a thin rim.
    k=1/math.sqrt(1+math.cos(b)*math.cos(a))
    return [round(cx+170*k*math.cos(b)*math.sin(a),2),round(200-170*k*math.sin(b),2)]

names={'NORTH AMERICA':('north-america','North America','#d69735',[210,120]),'SOUTH AMERICA':('south-america','South America','#d37493',[325,290]),'EUROPE':('europe','Europe','#c95250',[505,72]),'AFRICA':('africa','Africa','#578b61',[495,225]),'ASIA':('asia','Asia','#e2bf42',[620,130]),'AUSTRALIA':('australia','Australia','#a47752',[718,280]),'ANTARCTICA':('antarctica','Antarctica','#f4eee2',[585,363])}
features=json.load(open(sys.argv[1]))['features']
land=unary_union([shape(f['geometry']) for f in json.load(open(sys.argv[2]))['features']])
result=[]
for continent in [f for f in features if f['properties']['FEATURECLA']=='Continent']:
    p=continent['properties']
    ident,name,color,knob=names[p['NAME']]
    anchors={'north-america':(-105,42,-110,205),'south-america':(-58,-15,-110,205),'europe':(20,52,70,595),'africa':(20,0,70,595),'asia':(95,40,70,595),'australia':(134,-25,70,595),'antarctica':(70,-78,70,595)}
    knob=project(*anchors[ident])
    region='Oceania' if name=='Australia' else name
    additions=[shape(f['geometry']) for f in features if f['properties']['REGION']==region and f['properties']['FEATURECLA'] in ['Island','Island group','Isthmus']]
    # Region groups include ocean envelopes (e.g. Polynesia); only actual land may be colored.
    combined=unary_union([shape(continent['geometry']),*additions]).intersection(land)
    assert combined.difference(land).area < 1e-8
    geometry=mapping(combined)
    coordinates=geometry['coordinates'] if geometry['type']=='MultiPolygon' else [geometry['coordinates']]
    paths=[]
    for polygon in coordinates:
        for ring in polygon:
            # Unwrap individual rings before clipping; retain all island outlines.
            unwrapped=[]
            for lon,lat in ring:
                if unwrapped:
                    while lon-unwrapped[-1][0]>180: lon-=360
                    while lon-unwrapped[-1][0]<-180: lon+=360
                unwrapped.append([lon,lat])
            for shift in [-360,0,360]:
                pts=[[x+shift,y] for x,y in unwrapped]
                for low,high,center,cx in [(-200,-20,-110,205),(-20,160,70,595)]:
                    part=clip(clip(pts,low,True),high,False)
                    if len(part)<3:continue
                    # Densify long clipped edges before projecting.
                    dense=[]
                    for i,a in enumerate(part):
                        b=part[(i+1)%len(part)]
                        steps=max(1,math.ceil(max(abs(a[0]-b[0]),abs(a[1]-b[1]))/2))
                        for j in range(steps):
                            dense.append(project(a[0]+(b[0]-a[0])*j/steps,a[1]+(b[1]-a[1])*j/steps,center,cx))
                    dense=simplify(dense)
                    if len(dense)<3: continue
                    paths.append('M'+'L'.join(f'{x},{y}' for x,y in dense)+'Z')
    result.append(dict(id=ident,name=name,color=color,knob=knob,path=''.join(paths)))
Path('src/content/geography/continents.json').write_text(json.dumps(result,separators=(',',':'))+'\n')
print('Wrote',len(result),'continent groups')
