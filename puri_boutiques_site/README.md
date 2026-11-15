# Boyana Shilpa & Radha Gopinath Bastralaya — Production Website Bundle

## 1. Clean Modular Project Structure
```text
puri_boutiques_site/
├── index.html                  # Semantic HTML5, SEO Meta, Open Graph & JSON-LD Structured Data
├── css/
│   └── styles.css              # Custom theme styles, animations & Odia/Hindi typography rules
├── js/
│   ├── data/
│   │   ├── i18n.js             # Multilingual translations (English, Hindi, Odia)
│   │   └── catalog.js          # Product catalog, starting prices, categories & Weave Guide data
│   ├── utils/
│   │   └── security.js         # HTML escaping, live input sanitization & regex validators
│   └── app.js                  # Main UI controller, state management & event delegation
├── assets/
│   └── images/                 # Optimized store & product photography (.jpg)
├── _headers                    # HTTP Security Headers for Cloudflare Pages / Netlify
├── vercel.json                 # HTTP Security Headers for Vercel
├── robots.txt                  # Search engine crawler instructions
└── sitemap.xml                 # XML sitemap for Google Search Console
```

## 2. Security & Vulnerability Protections Built In
- **DOM XSS Prevention:** All dynamic values rendered into HTML templates pass through strict entity escaping (`escapeHtml` in `js/utils/security.js`).
- **Real-Time Input Sanitization & Validation:**
  - **Name Field (`#visitorName`):** Strips special characters (`@`, `#`, `$`, `%`, digits, etc.) in real time while supporting English, Hindi, and Odia scripts (`2–60` characters).
  - **Phone / Email Field (`#visitorContact`):** Caps numeric phone inputs at 13 digits in real time and validates 10-digit Indian mobile numbers (`6–9xxxxxxxxx`), international numbers, or standard email addresses.
- **Anti-Bot Honeypot & Rate Limiting:** Hidden honeypot trap (`#hpWebsite`) and a 4-second submission cooldown protect the inquiry workflow against automated spam bots.
- **`localStorage` Deserialization Guard:** Validates stored JSON arrays against an explicit allowlist of product IDs and field length caps.
- **Reverse Tabnabbing Protection:** All external links (`target="_blank"`) enforce `rel="noopener noreferrer"`.
- **Production HTTP Security Headers:** Pre-configured `_headers` and `vercel.json` supply `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.
