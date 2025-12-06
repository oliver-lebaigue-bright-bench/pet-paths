# Pet Paths

[![Static-Site](https://img.shields.io/badge/type-static%20frontend-blue)](README.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/oliverlebaigue/pet-paths)](https://github.com/oliverlebaigue/pet-paths)
[![Issues](https://img.shields.io/github/issues/oliverlebaigue/pet-paths)](https://github.com/oliverlebaigue/pet-paths/issues)
[![Security Policy](https://img.shields.io/badge/security-policy-important)](SECURITY.md)

Pet Paths is a lightweight, community-focused web application for sharing dog walks, local pet profiles, and short social posts.  
This repository contains the static frontend, along with optional Firebase integration for real-time data.

---

## Overview

Pet Paths is designed to be simple, privacy-respecting, and easy to self-host.  
The site uses basic HTML, CSS and JS, with Firebase Realtime Database used only where dynamic features are needed.

This repository includes:

- Main static pages: `index.html`, `walks.html`, `profiles.html`, `admin.html`, etc.  
- Pet-Net subsite under `/pet-net/`  
- Light, optional client-side auth  
- No build system required  
- Ready to host anywhere that serves static files

---

## Quick Start (Development)

Open the repository in the included development container (Ubuntu 24.04) or any local environment.

### Serve locally

**Python 3 (recommended):**

python3 -m http.server 8080

Then visit:

http://localhost:8080


Node (http-server):

npx http-server -p 8080


No compilation or bundling required.