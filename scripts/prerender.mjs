import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { render, routes, pageMeta, company, articles } from '../dist-ssr/entry-server.js'
const origin = 'https://www.ajobllc.com'
const template = await readFile('dist/index.html','utf8')
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
for (const route of [...routes, '/404/']) {
  const { title, description } = pageMeta(route)
  const article = articles.find(a=>route===`/journal/${a.slug}/`)
  const graph = [ { '@type':'Organization', '@id':`${origin}/#organization`, name:company.name, url:origin, foundingDate:'2023-10-17', address:{ '@type':'PostalAddress', streetAddress:company.address, addressCountry:'JP' } } ]
  if(article) graph.push({ '@type':'Article', headline:article.title, description:article.description, author:{'@type':'Organization',name:'AJOB',url:origin}, publisher:{'@id':`${origin}/#organization`}, mainEntityOfPage:origin+route, inLanguage:'ja' })
  const meta = `<link rel="canonical" href="${origin+route}" />\n<meta property="og:type" content="${article?'article':'website'}" />\n<meta property="og:locale" content="ja_JP" />\n<meta property="og:site_name" content="AJOB合同会社" />\n<meta property="og:title" content="${escape(title)}" />\n<meta property="og:description" content="${escape(description)}" />\n<meta property="og:url" content="${origin+route}" />\n<meta property="og:image" content="${origin}/assets/illustrations/hero-social.jpg" />\n<meta name="twitter:card" content="summary_large_image" />\n${route==='/404/'?'<meta name="robots" content="noindex" />':''}\n<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>`
  const html = template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(description)}" />`).replace('<!--page-meta-->',meta).replace('<div id="root"></div>',`<div id="root">${render(route)}</div>`)
  const directory = route==='/404/'?'dist':`dist${route}`
  await mkdir(directory,{recursive:true})
  await writeFile(route==='/404/'?'dist/404.html':`${directory}/index.html`,html)
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`\n  <url><loc>${origin+route}</loc></url>`).join('')}\n</urlset>\n`)
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
await rm('dist-ssr',{recursive:true,force:true})
console.log(`Prerendered ${routes.length} pages + 404, sitemap.xml and robots.txt.`)
