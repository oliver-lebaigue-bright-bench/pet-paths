# Pet Paths

A small web app for sharing dog-walks, local pet profiles and short social posts. This repository contains the static frontend used across the site (profiles, walks, playdates, pet-net feed, admin tools) and integrates with a Firebase Realtime Database.

Why this repo
- Lightweight static pages with optional Firebase backend.
- Quick to run locally or host on static hosting (Netlify, GitHub Pages, etc).
- Minimal auth/profile system for basic community interactions.

Quick start (dev container)
1. Open the repository in the provided dev container (Ubuntu 24.04).
2. Use any static file server to preview (examples below).
3. The project is a static frontend — no build step required.

Run locally (simple options)
- Python 3:
  python3 -m http.server 8080
  open http://localhost:8080 in your browser.
- Serve (npm):
  npx http-server -p 8080

Notes about Firebase and secrets
- The frontend references a Firebase project configuration (client-side keys). These are not secret credentials — they identify the Firebase project. Do not commit service account/private keys to the repo.
- If you run your own Firebase instance, update the config blocks in the pages that import Firebase.

Development notes
- Files live at the repo root (index.html, walks.html, profiles.html, admin.html, etc).
- Styles for the pet-net subsite are under /pet-net/styles.css and behavior scripts under /pet-net/script.js.
- The dev container includes common CLI tools: apt, git, curl, docker, etc.

Security & reporting
- If you discover a vulnerability, see SECURITY.md for reporting instructions.
- Acceptable Use Policy: see ACCEPTABLE_USAGE_POLICY.md for permitted and prohibited behaviours.
- Terms of Service: see TERMS_OF_SERVICE.md for the service terms and limitations.

Contributing
- Fork, make changes, open a PR.
- Keep changes small and focused; include screenshots for UI changes and a short description for functionality changes.

License
- MIT License — see LICENSE file (or add a LICENSE file if missing).

Contact
- For security reports or questions: oliverlebaigue@gmail.com
