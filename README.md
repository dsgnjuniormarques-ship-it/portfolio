# Evaldo M. · Portfolio

A plain HTML site. No build step: every change you push goes live.

## Change any text
Edit `assets/js/content.js`. Every word on the site lives there.

## Add an image
1. Put the file in `images/` (for example `images/activate/hero.jpg`).
2. In `content.js`, find the placeholder with the matching label and fill in `src`:
   `{ src: "images/activate/hero.jpg", label: "Hero image", ratio: "16/10" }`

Tips: JPG or WebP, max 2400 px wide, under ~500 KB. Videos: MP4, muted, short.

## Add a project to the wall
Copy one block inside `projects: [ ... ]` in `content.js`, give it a new `slug`, and fill it in.

## Pages
- `index.html` home · `about.html` about
- `case-study.html?p=activate` (password protected)
- `project.html?p=livelo-crm`

## Password
The case studies use a simple password (currently `tickles`). It keeps casual visitors out, but it is not real security.
