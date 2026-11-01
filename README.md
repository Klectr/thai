# thai.klectr.dev

Learn to read Thai: one pattern a week, ten minutes every morning.

Static site, no build step. Plain HTML, one stylesheet, one small script.

## What is here

- `index.html` — landing page: this week's pack, the earlier packs, the free primer.
- `lessons/` — the short lessons, one reading pattern each, in the order they were written.
- `files/thai-reading-primer.pdf` — the Week 1 primer, free with no signup.
- `d/<token>/` — worksheet pack PDFs behind the email gate. The token paths are
  unguessable links; the gate is an honor-system signup, not access control.
- `assets/gate.js` — the unlock flow. The reader enters an email once; the site
  stores it in the browser's local storage and reveals the download on that device.

## Connecting the email list

The gate form currently posts nowhere. To connect Kit (or any provider that
accepts a form endpoint), set the `data-endpoint` attribute on each `.gate`
element in `index.html` to the provider's form action URL. The script posts the
address as `email_address` and unlocks immediately, so readers never wait on
the provider. The weekly email itself is sent from the provider, linking to the
new pack's page.

## Adding a new week

1. Put the new pack PDF in a fresh `d/<token>/` folder (any random string).
2. Update the "This week's pack" card in `index.html` and add a gate block for
   it in the packs list, following the existing ones.
3. If the week has a lesson, add its page under `lessons/` and a row in
   `lessons/index.html`.

## Deploying

Serve the folder as static files at thai.klectr.dev (nginx on the VPS, or any
static host). No server-side code is involved.
