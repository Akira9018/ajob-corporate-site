"""Validate deployable HTML without browser/network or submitting contact requests."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import hashlib
import xml.etree.ElementTree as ET

ROOT = Path('dist')
ORIGIN = 'https://www.ajobllc.com'
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.tags = []
        self.ids = []
        self.text = []
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag,attrs))
        if 'id' in attrs: self.ids.append(attrs['id'])
    def handle_data(self, text): self.text.append(text)
    def find(self, tag, **attrs):
        return [a for t,a in self.tags if t==tag and all(a.get(k)==v for k,v in attrs.items())]

def demand(condition, message):
    if not condition: raise AssertionError(message)

files = list(ROOT.rglob('index.html'))
demand(len(files)==14, f'Expected 14 pages, found {len(files)}')
pages = {('/'+str(p.parent.relative_to(ROOT)).strip('.')+'/').replace('//','/'):Page(p) for p in files}
images = set()
link_count = 0
for route,page in pages.items():
    demand(len(page.find('h1'))==1, f'{route}: expected one h1')
    demand(len(page.ids)==len(set(page.ids)), f'{route}: duplicate ids')
    demand(page.find('html', lang='ja'), f'{route}: missing Japanese language')
    demand(len(page.find('main'))==1, f'{route}: missing main landmark')
    demand(page.find('link',rel='canonical',href=ORIGIN+route),f'{route}: wrong canonical')
    demand(page.find('meta',name='description')[0]['content'],f'{route}: empty description')
    demand(len(''.join(page.text))>400,f'{route}: empty prerendered content')
    for tag,attrs in page.tags:
        if tag=='img':
            demand('alt' in attrs,f'{route}: image missing alt')
            demand('width' in attrs and 'height' in attrs,f'{route}: image missing intrinsic size')
        ref = attrs.get('src') if tag in ('img','script') else attrs.get('href') if tag in ('a','link') else None
        if not ref: continue
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        if url.path.startswith('/_vercel/'): continue  # served by Vercel at runtime (Web Analytics)
        if not url.path:
            demand(unquote(url.fragment) in page.ids,f'{route}: broken fragment {ref}')
            continue
        if tag=='a':
            link_count += 1
            demand(url.path in pages, f'{route}: broken page link {ref}')
            if url.fragment: demand(unquote(url.fragment) in pages[url.path].ids, f'{route}: bad target {ref}')
        else:
            target=ROOT/url.path.lstrip('/')
            demand(target.is_file(),f'{route}: missing asset {ref}')
            if tag=='img':images.add(ref)
    for script in page.find('script',type='application/ld+json'):
        demand(script is not None,'Missing schema')

for expected in ['hero','about','advisory','portal']:
    demand('/assets/illustrations/'+expected+'.webp' in images,f'Missing approved asset {expected}')
demand('/assets/photos/office.webp' in images,'Missing office asset')
icon_files = sorted((ROOT/'assets/icons').glob('*.svg'))
demand(len(icon_files)==10, 'Expected 10 original SVG icons')
for file in icon_files:
    svg=ET.parse(file).getroot()
    demand(svg.get('viewBox')=='0 0 64 64', f'{file}: inconsistent icon grid')
    demand('/assets/icons/'+file.name in images, f'{file}: unused or missing icon integration')
    demand(not svg.findall('.//{*}script'), f'{file}: SVG must not contain scripts')
    demand(not svg.findall('.//{*}image'), f'{file}: icon should remain native vector')
for item in json.loads((ROOT/'assets/brand/manifest.json').read_text()):
    file=ROOT/'assets/brand'/item['file']
    demand(hashlib.sha256(file.read_bytes()).hexdigest()==item['sha256'], f'{file}: supplied original changed')
    demand('/assets/brand/'+item['file'] in images, f'{file}: logo not integrated')

contact=pages['/contact/']
demand(contact.find('form',action='https://formspree.io/f/mqalbgwy',method='post'),'Changed or unsafe native contact destination')
for name,tag in [('company','input'),('name','input'),('email','input'),('message','textarea'),('consent','input')]:
    demand('required' in contact.find(tag,name=name)[0],f'Missing required {name}')
demand(contact.find('input',name='email',type='email'),'Missing native email validation')
demand(contact.find('div',role='status'),'Missing announced form result')
demand(contact.find('a',href='/privacy/'),'Missing policy link')
for route,page in pages.items():
    if route.startswith('/journal/') and route!='/journal/':
        demand(len(page.find('section'))>=4,f'{route}: missing substantive article sections')
        demand('datePublished' not in page.path.read_text(),f'{route}: invented publication date')
        demand('<p class="article-author">AJOB</p>' in page.path.read_text(),f'{route}: incorrect author label')
        demand('AJOB編集部' not in page.path.read_text(),f'{route}: unapproved editorial organization')

sitemap=ET.parse(ROOT/'sitemap.xml')
locations={e.text for e in sitemap.findall('.//{*}loc')}
demand(locations=={ORIGIN+p for p in pages},'Sitemap differs from generated routes')
demand(f'Sitemap: {ORIGIN}/sitemap.xml' in (ROOT/'robots.txt').read_text(),'Robots missing sitemap')
demand(Page(ROOT/'404.html').find('meta',name='robots',content='noindex'),'404 should not be indexed')
text=''.join(pages['/'].text)
for value in ['アイデアに、','実行力を。','髙畠光','2023年10月17日','ダミーデータ']:
    demand(value in text,f'Homepage missing {value}')
print(json.dumps({'pages':len(pages),'internal_links_checked':link_count,'unique_approved_images':len([i for i in images if i.endswith('.webp')]),'original_svg_icons':len(icon_files),'supplied_brand_pngs':2,'contact':'native validation + unchanged endpoint','sitemap':'all routes','result':'PASS'},ensure_ascii=False,indent=2))

for page in pages.values():
    demand("開発中" not in "".join(page.text), "Removed project status must not be shown")
    demand("オフィスイメージ（生成画像）" not in "".join(page.text), "Removed office caption must not be shown")
