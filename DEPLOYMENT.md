# DCV Production Deployment

## Production Files

Use the generated production folder:

```text
outputs/dcv-site-dist
```

This is a static production build. It contains `index.html`, route folders, assets, CSS, `sitemap.xml`, `robots.txt`, and deployment config files.

## Vercel

1. Create a new Vercel project.
2. Import the project folder or upload the production folder.
3. Use these settings:
   - Framework Preset: Other
   - Build Command: leave empty
   - Output Directory: `.`
4. Keep `vercel.json` in the root.
5. Deploy.

If using Git, set the project root to:

```text
outputs/dcv-site-dist
```

## Netlify

1. Open Netlify and create a new site.
2. Drag and drop `outputs/dcv-site-dist` into Netlify Drop, or connect via Git.
3. Use these settings:
   - Build command: leave empty
   - Publish directory: `.`
4. Keep `netlify.toml` and `_redirects` in the root.
5. Deploy.

## Hostinger

1. Open Hostinger hPanel.
2. Go to File Manager for the domain.
3. Open `public_html`.
4. Upload all files inside:

```text
outputs/dcv-site-dist
```

5. Make sure `index.html`, `.htaccess`, `assets`, `src`, and route folders are directly inside `public_html`.
6. Clear Hostinger cache if enabled.

## Post-Deployment Checklist

- Open `https://dcv.jo/`
- Test `/services`, `/projects`, `/contact-us`, and service pages.
- Confirm video background loads.
- Confirm `https://dcv.jo/sitemap.xml` works.
- Confirm `https://dcv.jo/robots.txt` works.
- Test mobile navigation and WhatsApp button.
