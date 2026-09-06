# HeldenCuts

Static portfolio website for Heldenhuf, built with HTML, CSS and vanilla JavaScript.

## Structure

- `index.html` - homepage
- `work/` - portfolio overview and canonical project pages
- `services.html` - services
- `about.html` - editor profile
- `contact.html` - project inquiry and FAQ
- `imprint.html` and `privacy-policy.html` - legal pages
- `components/` - shared HTML fragments
- `css/` - tokens, shared layout, page, portfolio, header, footer and legal styles
- `js/` - shared loader, homepage behavior and portfolio video behavior
- `assets/` - local font and brand imagery

## Local preview

Because components are loaded with `fetch`, use a static server from the project root:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173/` in a browser.
