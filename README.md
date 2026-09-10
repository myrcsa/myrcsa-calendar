# myRCSA Calendar — static site

A single-page, static site for the Rotman Commerce Students' Association's
public event calendar. It does two things:

1. **Shows the calendar** — the live myRCSA Google Calendar, embedded, plus
   subscribe instructions for Google Calendar / Apple Calendar / Outlook.
2. **Explains how to use / add to it** — who can submit, the 6 event
   categories, turnaround time, and a link straight to the submission form.

No build step, no dependencies, no framework — just `index.html`, one CSS
file, and one small JS file. This is intentional: it deploys for free on
GitHub Pages with zero configuration and is easy for a future exec to edit
without needing to know any tooling.

```
rcsa-calendar-site/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── img/favicon.svg
```

---

## 1. Put this on GitHub

If you already unzipped this folder and it contains a `.git` directory, skip
to step 3 — it's already an initialized repo with one commit.

1. Create a new repository on GitHub (Settings can be anything — public repos
   get GitHub Pages for free; private repos need a paid plan for Pages).
   - Suggested name: `myrcsa-calendar` or `rcsa-calendar`
   - Do **not** initialize it with a README/gitignore/license (this folder
     already has its own history).
2. Copy the repo's URL, e.g. `https://github.com/<your-username>/myrcsa-calendar.git`
3. From inside this folder, run:

   ```bash
   git remote add origin https://github.com/<your-username>/myrcsa-calendar.git
   git branch -M main
   git push -u origin main
   ```

   (If this folder is **not** already a git repo, run `git init`,
   `git add .`, and `git commit -m "Initial commit"` first.)

## 2. Turn on GitHub Pages

1. On GitHub, open the repo → **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`. Save.
4. Wait ~1 minute, then refresh — GitHub shows the live URL, typically:

   ```
   https://<your-username>.github.io/myrcsa-calendar/
   ```

That's it — it's a fully static site, so there's nothing else to configure.
It will redeploy automatically every time you push to `main`.

### Using a custom domain (optional)

If you want it to live at `myrcsa.com` (as referenced in the RCSA event
submission doc) instead of the `github.io` URL:

1. In **Settings → Pages → Custom domain**, enter `myrcsa.com` (or a
   subdomain like `calendar.myrcsa.com`) and save. GitHub will create a
   `CNAME` file in the repo automatically.
2. At your domain registrar / DNS provider, add the DNS records GitHub's
   docs specify for Pages (an `A`/`ALIAS` record to GitHub's IPs for an apex
   domain, or a `CNAME` record to `<your-username>.github.io` for a
   subdomain).
3. Once DNS propagates, tick **Enforce HTTPS** back in the Pages settings.

## 3. What to edit when things change

Everything content-related lives in **`index.html`** — there's no CMS or
data file, just plain HTML sections. The main things you'll likely update:

| What | Where |
|---|---|
| Submission form link | Search `docs.google.com/forms` in `index.html` (appears twice: header button + submit CTA) |
| Calendar ID (if the calendar ever changes) | Search `group.calendar.google.com` in `index.html` (appears in the iframe `src`, the "open in Google Calendar" link, and the subscribe `.ics` link) |
| Contact names / roles | The `.contacts` list near the bottom of `index.html` |
| Event categories / colours | The `.legend-list` and `.category-list` sections in `index.html`; colours are defined once as CSS variables (`--cat-*`) at the top of `assets/css/style.css` |
| Logo | Overwrite `assets/img/logo.png` and `assets/img/favicon.png` (see section 4) |
| Colours | The design is intentionally black/white/gray only — see `:root` variables at the top of `assets/css/style.css` |
| Fall-semester submission notice | The `.notice` block in the "Submit an event" section |

No build tools are involved — edit the file, save, `git add . && git commit
-m "update" && git push`, and GitHub Pages redeploys automatically.

## 4. Updating the logo

The real RCSA logo is already wired in at `assets/img/logo.png` (used in the
header and footer) and `assets/img/favicon.png` (browser tab icon). To
replace it with a new version later, just overwrite those two files with the
same filenames — no HTML changes needed. If the new logo has a different
aspect ratio, adjust `.brand img.logo` and `.footer-inner img.logo` in
`assets/css/style.css`.

## Notes

- The calendar embed and the `.ics` subscribe link both come straight from
  the public calendar RCSA already maintains — nothing new to host or
  maintain there.
- The submission form linked on the page is the existing RCSA Google Form;
  this site does not replace or duplicate it, it just gives people a clean
  place to find it and understand the process first.
