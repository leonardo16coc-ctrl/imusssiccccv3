# IMÜSIC★ — Public Music Community / Artist Worlds

A GitHub-ready front-end prototype for IMÜSIC: a public music-video community inspired by the expressive profile culture of the late-2000s web, but with a simple modern editing flow.

## Core product rules

- IMÜSIC is **public**. Visitors can browse the home page, Artist Worlds, music videos, playlists and public comments without signing in.
- Signing in is required only for actions such as commenting, liking/saving, adding friends, uploading videos and editing a profile.
- **Every registered user can customize their profile.** There is no artist-only design permission in this prototype.
- Every account can upload a profile photo, banner and full-page background; add stickers/decorations; choose site accents and button colors; and show/hide profile modules.
- The IMÜSIC★ brand remains visible while each profile can have its own visual world.

## Pages

- `index.html` — public home / discovery
- `artist.html` — public customizable Artist World
- `edit-profile.html` — simple universal profile editor with live preview
- `upload.html` — music-video upload UI
- `signin.html` — sign-in flow
- `register.html` — account creation

## Local preview

Open `index.html` directly, or run a tiny local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Demo persistence

This build uses `localStorage` so banner/background/avatar/button colors/module settings can be tested immediately in the browser. It is intentionally a front-end prototype.

## Production connection plan

Recommended production split:

- Firebase Authentication — Google/email sign-in; Apple through the appropriate provider setup
- Firestore — profile metadata, comments, friendships, playlists and public settings
- Cloudflare R2 — banners, backgrounds, photos, stickers and image assets
- Cloudflare Stream or equivalent video pipeline — transcoding and playback of uploaded music videos

Never expose R2 or service-account secrets in browser code. Use signed upload URLs from a backend/Worker.

## Customization fields

The demo stores:

- profile name, tagline, bio, location, genre, website
- avatar, banner and background
- stickers/decorations
- accent color
- main button color
- secondary button color
- button text color
- visible/hidden modules

See `config/firebase-config.example.js` and `cloudflare/worker.example.js` for placeholders.
