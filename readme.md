# Optitude360 — Executive Search Psychology

Static marketing website for **Optitude360**, a UK executive-search advisory that combines executive search with the psychology of leadership judgement.

- **Positioning:** Executive Search Psychology · Judgment-First Search
- **Framework:** the Optitude Core — Attitude · Aptitude · Fortitude
- **Live:** https://optitude360.vercel.app

## Stack

Plain static HTML/CSS/JS. No framework, no build step, no third-party runtime dependencies.

```
/                    homepage
/approach/           Executive Search Psychology · The Optitude Core · How We Assess
/services/           5 services (executive search, critical hire, succession, interim, assessment)
/who-we-help/        4 audiences (CEO & board, private equity, founder-led, transformation)
/about/              About + Simon Childs (founder)
/contact/            enquiry form (GDPR-aware, unticked consent)
/insights/           Leadership Briefings hub
/privacy-policy/     UK GDPR / PECR (flagged for legal review)
/cookie-policy/      cookie policy
/assets/css/styles.css   design system ("11 Build" luxury minimalism)
/assets/js/main.js       nav toggle, consent banner, analytics hook
nginx.conf               Function Compute (nginx) serving config — ignored by Vercel
```

## Run locally

Any static file server works. For example:

```bash
# Node
npx serve .

# Python
python -m http.server 8000
```

Then open http://localhost:8000/.

## Deploy

- **Vercel** (current): `vercel --prod` from this directory. Framework auto-detected as static; `index.html` is the entry.
- **Function Compute (nginx):** `nginx.conf` at the zip root, served on port 9000 (see `nginx.conf`).

## Where to change things

| What | Where |
|---|---|
| Copy / headlines | the relevant `.html` file (each page is self-contained) |
| Colours, fonts, spacing | `assets/css/styles.css` (CSS custom properties in `:root`) |
| Navigation | the `<header>` block in every `.html` (identical across pages) |
| Footer / legal line | the `<footer>` block in every `.html` |
| Title + meta description | the `<head>` of each `.html` |
| Enquiry email + form endpoint | `assets/js/main.js` is general; the contact page has an inline script with an `email` variable to set |
| Analytics ID | `assets/js/main.js` (`window.O360_GA4_ID`, loaded only after consent) |
| Sitemap / robots | `sitemap.xml`, `robots.txt` |
| 301 redirects | `nginx.conf` (Function Compute); for Vercel add redirects in `vercel.json` |

## Owner-review items (not yet confirmed)

Marked inline as `[OWNER REVIEW REQUIRED]`: registered business name/address/phone, founder bio facts, logo + OG image, evidence/outcome data, and the enquiry email address.

## Notes

- No clients, testimonials, statistics or bio facts are invented — every unverifiable item is explicitly flagged.
- Analytics loads only after explicit consent (UK GDPR/PECR).
- AI/generative-search crawlers are permitted in `robots.txt`.
