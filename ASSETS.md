# AJOB supplied artwork

Five standalone images supplied for this redesign were inspected and integrated:

- illustrations/hero.webp — homepage hero
- illustrations/about.webp — company introduction
- illustrations/advisory.webp — AI advisory
- illustrations/portal.webp — regional portal / prototype
- photos/office.webp — fictional generated office, visibly labelled on the site

Sources: the approved `ajob-assets` output set from the originating design conversation, September 2026. The original images remain outside this repository in the supplied output folder. WebP derivatives use quality 88 without artistic changes. `hero-social.jpg` is a JPEG derivative for Open Graph compatibility. No all-in-one concept screenshot is embedded in the site. The images do not depict actual AJOB staff or premises.


## Original AJOB icon collection

Ten original 64×64 SVG icons live in `public/assets/icons/`: idea, ai-advisory, dialogue, workflow, line-connect, community, improve, journal, plan and build. They share a 2.2-unit charcoal stroke and the site's lavender, mint, peach and lime. They are code-native vectors, not emoji or an external icon font. The LINE connection graphic represents the service; it is not a LINE trademark logo.

`Icon.tsx` makes them decorative by default, with meaningful adjacent text retained. The standalone review catalogues are `review/icon-catalog.html`, `review/icon-catalog.svg` and `review/icon-catalog.png`. Regenerate SVGs and the HTML/vector catalogue with `python3 scripts/create-icons.py`.

## Supplied brand logos

`public/assets/brand/ajob-horizontal-original.png` and `ajob-symbol-original.png` are byte-for-byte copies of the user's supplied 9.png and 10.png. Both are RGBA 2000×2000. Black foreground pixels are opaque and must not be removed. The white AJOB band is part of the original artwork.

`BrandMark.tsx` uses CSS overflow/positioning to crop transparent padding, preserving proportions and all original pixels. Horizontal crop viewport: (54, 855, 1848, 313); symbol: (361, 470, 1234, 1130). Each includes 10px of safety padding around the nontransparent bounds. `manifest.json` records hashes and crop coordinates. The favicon is an SVG viewport wrapper embedding the original symbol PNG, not a new drawing.

Header and homepage company information use the horizontal logo. At widths of 1000px or less, the header uses the symbol; the footer also uses the symbol. All are on light backgrounds. Review proofs are `review/brand-catalog.html` and `review/brand-catalog.png`.
