"""Build AJOB's small, original SVG vocabulary and its private review catalogue.
No external artwork, fonts, scripts, or raster assets are used in these icons.
"""
from pathlib import Path
from html import escape
import json

icons = [
 ('idea','アイデア','気づき・考えるきっかけ', '''<path fill="#E6DFF9" d="M19 28a13 13 0 0 1 26 0c0 7-6 10-7 16H26c-1-6-7-9-7-16Z"/><path d="M27 49h10m-9 5h8M32 44V32m-5-5 5 5 5-5"/><path d="M32 6V2M13 13l-4-4m42 4 4-4M10 29H5m49 0h5"/><path fill="#DFED45" d="m48 45 3-5 3 5 5 3-5 3-3 5-3-5-5-3Z"/>'''),
 ('ai-advisory','AIの相談','経営者の相談・AI顧問', '''<path fill="#E6DFF9" d="M7 14h40a4 4 0 0 1 4 4v27a4 4 0 0 1-4 4H23L12 57v-8H7a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"/><path fill="#DEEFE7" d="M13 26h10v10H13z"/><path d="M23 31h8m0 0 4-6m-4 6 4 6"/><circle cx="39" cy="22" r="4" fill="#FF EADF"/><circle cx="39" cy="40" r="4" fill="#FFEADF"/><path fill="#DFED45" d="m51 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"/>'''.replace('#FF EADF','#FFEADF')),
 ('dialogue','対話','話す・聞く・連絡する', '''<path fill="#E6DFF9" d="M5 8h35a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H20L9 46v-8H5a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z"/><path fill="#DEEFE7" d="M26 24h33a3 3 0 0 1 3 3v21a3 3 0 0 1-3 3h-5v9l-11-9H26a3 3 0 0 1-3-3V27a3 3 0 0 1 3-3Z"/><path d="M11 18h22M32 34h20m-20 8h13"/><path fill="#FFEADF" d="M48 5h9v9h-9z"/>'''),
 ('workflow','業務フロー','仕事の流れ・役割をつなぐ', '''<path d="M17 20v12h29v12M32 32v12m-4-4 4 4 4-4m6 0 4 4 4-4"/><rect x="6" y="5" width="22" height="15" rx="2" fill="#E6DFF9"/><rect x="21" y="44" width="22" height="15" rx="2" fill="#DEEFE7"/><rect x="46" y="44" width="14" height="15" rx="2" fill="#FFEADF"/><path d="M46 32h7v12"/><path fill="#DFED45" d="m45 8 9 9-9 9-9-9Z"/>'''),
 ('line-connect','LINE連携','身近な入口から業務システムへ', '''<rect x="8" y="4" width="31" height="55" rx="5" fill="#DEEFE7"/><path d="M19 10h9m-9 43h9"/><path fill="#FFFFFF" d="M15 20h17v20H15z"/><path d="M19 26h9m-9 7h5M39 30h13m-5-5 5 5-5 5"/><rect x="45" y="7" width="13" height="13" rx="2" fill="#E6DFF9"/><path fill="#FFEADF" d="m51 40 9 16H42Z"/>'''),
 ('community','地域のつながり','地域・会社・共同集客', '''<path d="M15 29v11h33V29M32 40v8"/><path fill="#E6DFF9" d="M5 16h20v16H5z"/><path fill="#FFEADF" d="m3 16 12-10 12 10Z"/><path d="M12 32v-9h6v9"/><path fill="#DEEFE7" d="M40 14h19v18H40z"/><path fill="#FFEADF" d="M38 9h23v7H38z"/><path d="M45 22h9m-5 3v7"/><path fill="#DFED45" d="m21 48 11-8 11 8v12H21Z"/><path d="M29 60v-8h6v8"/>'''),
 ('improve','改善','試して育てる・次の一歩', '''<path fill="#FFEADF" d="M6 43h12v15H6z"/><path fill="#DEEFE7" d="M25 32h12v26H25z"/><path fill="#E6DFF9" d="M44 20h12v38H44z"/><path d="M7 32c17-2 25-13 42-23m-11 0h12v12"/><path fill="#DFED45" d="m13 4 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/>'''),
 ('journal','記事・ヒント','読む・知識を持ち帰る', '''<path fill="#DEEFE7" d="M9 12h36v47H9z"/><path fill="#FFFFFF" d="M17 5h27l12 12v35H17Z"/><path fill="#E6DFF9" d="M44 5v12h12"/><path d="M24 25h24m-24 8h24m-24 8h14"/><path fill="#FFEADF" d="M6 3h10v19l-5-4-5 4Z"/>'''),
 ('plan','整理・計画','優先順位・合意する範囲', '''<rect x="10" y="10" width="43" height="49" rx="3" fill="#FFFFFF"/><path fill="#E6DFF9" d="M22 5h19v11H22z"/><path fill="#DEEFE7" d="M16 24h10v10H16z"/><path d="m18 28 2 2 4-4m9 3h12M17 42h8m8 0h12m-28 9h8m8 0h7"/><path fill="#DFED45" d="m53 36 8 8-8 8-8-8Z"/>'''),
 ('build','つくる','実装・仕組みを組み立てる', '''<path fill="#E6DFF9" d="M5 34h23v24H5z"/><path fill="#DEEFE7" d="M32 34h25v24H32z"/><path fill="#FFEADF" d="M19 6h24v24H19z"/><path d="M5 44h23m4 0h25M19 16h24M31 6v10M16 44v14m28-14v14"/><path d="M51 9v14m-5-5 5 5 5-5"/>'''),
]
root=Path('public/assets/icons');root.mkdir(parents=True,exist_ok=True)
svgs=[]
for name,label,usage,body in icons:
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><title>{escape(label)}</title><g stroke="#20211F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>\n'
 (root/f'{name}.svg').write_text(svg)
 svgs.append(svg)
Path('review').mkdir(exist_ok=True)
colors=['#e6dff9','#deefe7','#ffeadf']
cards=''.join(f'<article><div class="stage" style="background:{colors[i%3]}">{svg}</div><h2>{escape(label)}</h2><p>{escape(usage)}</p><code>{name}.svg</code><div class="sizes">'+''.join(f'<span style="width:{size}px;height:{size}px">{svg}</span>' for size in [24,32,48])+'</div></article>' for i,((name,label,usage,_),svg) in enumerate(zip(icons,svgs)))
html='''<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>AJOB — Icon collection</title><style>*{box-sizing:border-box}body{margin:0;background:#fdfdfa;color:#20211f;font-family:system-ui,sans-serif;padding:48px}header{max-width:1200px;margin:0 auto 35px}h1{font-size:40px;margin:10px 0 18px;letter-spacing:-.05em}header p{font-size:14px;line-height:1.9}small{letter-spacing:.15em}.grid{max-width:1200px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:20px}article{border:1px solid #d5d6ce;padding:16px;border-radius:4px}h2{font-size:16px;margin:20px 0 9px}p{font-size:12px;line-height:1.7;margin:0 0 12px}code{font-size:11px}.stage{height:150px;display:grid;place-items:center}.stage svg{width:100px;height:100px}.sizes{display:flex;align-items:center;gap:20px;margin-top:20px;min-height:48px}.sizes svg{height:100%;width:100%;display:block}footer{max-width:1200px;margin:30px auto 0;font-size:12px;line-height:1.8}@media(max-width:600px){body{padding:24px}h1{font-size:30px}.grid{grid-template-columns:1fr 1fr;gap:12px}article{padding:10px}.stage{height:110px}.stage svg{width:80px;height:80px}.sizes{gap:10px}}</style><header><small>AJOB / VISUAL VOCABULARY</small><h1>アイデアを伝える、10のかたち。</h1><p>64 × 64 / 輪郭 2.2 / チャコール＋ラベンダー・ミント・ピーチ・ライム<br>上段は拡大表示、下段は24・32・48px。個別SVGは public/assets/icons/ にあります。</p></header><main class="grid">'''+cards+'''</main><footer>レビュー用見本です。サイトの公開ナビには追加しません。SVGは装飾として添え、意味を伝える見出しやラベルを残します。LINE連携アイコンは機能を表す独自の図案で、LINE公式ロゴではありません。会社のロゴには、このアイコンのスタイルを適用しません。</footer></html>'''
Path('review/icon-catalog.html').write_text(html)
# A standalone SVG contact sheet can also be opened in vector/image tools.
sheet='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="570" viewBox="0 0 1200 570"><rect width="1200" height="570" fill="#fdfdfa"/><text x="32" y="45" font-family="sans-serif" font-size="24" fill="#20211f">AJOB / ICON COLLECTION</text>'
for i,((name,label,usage,body),svg) in enumerate(zip(icons,svgs)):
 x=25+(i%5)*235;y=75+(i//5)*240
 sheet+=f'<rect x="{x}" y="{y}" width="215" height="155" rx="3" fill="{colors[i%3]}"/><g transform="translate({x+59} {y+26}) scale(1.5)" fill="none" stroke="#20211f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">{body}</g><text x="{x+5}" y="{y+184}" fill="#20211f" font-family="sans-serif" font-size="15">{name}</text>'
sheet+='</svg>'
Path('review/icon-catalog.svg').write_text(sheet)
Path('review/icon-manifest.json').write_text(json.dumps([{'name':n,'label':l,'usage':u} for n,l,u,_ in icons],ensure_ascii=False,indent=2)+'\n')
print(f'Created {len(icons)} SVG icons and review catalogues.')
