# Kreol Coast: Mauritius travel website

A static, mobile-first travel site for Mauritius and Rodrigues: food, hiking, culture and quieter coasts, for couples and families who want more than a sunbed.

It has no framework and no npm dependencies. A small Node script (`build.js`) turns the content files into plain HTML, one CSS file and a few small scripts in `dist/`.

## Run it

You need Node.js 18 or newer.

```sh
npm run build   # writes the site to dist/
npm run serve   # serves dist/ at http://localhost:8080
npm run dev     # build, then serve
```

There's no watch mode: run `npm run build` again after editing and refresh the browser.

## Deploy to Vercel

`vercel.json` tells Vercel to run `node build.js` and publish `dist/`. Either:

- import the GitHub repository in the Vercel dashboard (no settings to change), or
- from this folder, run `npx vercel deploy --prod`.

Any static host works the same way: build, then upload `dist/`.

## Where things live

| To change | Edit |
| --- | --- |
| Brand name, tagline, contact details, palette, enquiry endpoint | `site.config.js` |
| Regions (north, east, south, west, central plateau, Rodrigues) | `src/content/regions.js` |
| Things to do (hikes, lagoons, diving, tea and rum, markets) | `src/content/things.js` |
| Street-food trail and cooking traditions | `src/content/food.js` |
| Coast chooser: month-by-month coast, wind and weather data | `src/content/months.js` |
| Stays (currently placeholders) | `src/content/stays.js` |
| Journal posts | `src/content/journal.js` |
| Photos and their credits | `src/content/photos.js` |
| Page layouts | `src/pages/*.js` |
| Header, footer, navigation | `src/templates/layout.js` |
| Styles | `src/assets/styles.css` |
| Fonts | `src/assets/fonts/` |
| Coast chooser and enquiry form behaviour | `src/assets/chooser.js`, `src/assets/enquiry.js` |

Content files are plain JavaScript objects: change the text between the quotes and rebuild. Some copy contains simple HTML such as `<strong>`.

## Rebranding

Everything brand-specific is in `site.config.js`:

- `brand.name`, `brand.monogram` (the letters in the round logo), `brand.tagline`, `brand.pitch`, `brand.nameStory`. A commented-out alternative for **Le Morne & Co.** is included.
- `contact`: email (`kreolcoast@tourground.com`), business address and hours. The site shows no phone number, WhatsApp or social links. **Confirm the street address before launch** (see Before launch).
- `palette`: every colour on the site. The stylesheet only uses these as CSS variables (`var(--lagoon)` and so on), and the favicon is generated from them.
- `siteUrl`: the production URL used for canonical links, the sitemap and social cards.

### Contrast check

`contrastPairs` in `site.config.js` lists every text/background combination the stylesheet uses. The build checks each one against WCAG AA (4.5:1) and **refuses to build** if a palette change breaks one. Run `npm run check:contrast` to see every ratio. If you add a new text/background combination in CSS, add it to the list.

## The enquiry form

By default (`enquiry.endpoint` empty) the form checks the fields, then opens the visitor's email app with the enquiry written out and addressed to `contact.email`. Nothing is stored by the site.

To receive enquiries without relying on the visitor's email app, set `enquiry.endpoint` to any service that accepts a JSON `POST`, such as a [Formspree](https://formspree.io) form URL. The form posts there and sends the visitor to `/enquire/thanks/` on success, or offers the email fallback if the request fails. The form also has a hidden honeypot field to catch simple bots.

## Photos

All photos come from [Unsplash](https://unsplash.com) and are loaded from Unsplash's image CDN at the size each screen needs.

Rules for adding one:

1. **The location must match.** Only use a photo where the location the photographer recorded on Unsplash is the place you're using it for. Look it up through the Unsplash API (`GET /photos/:id`, field `location`), not just the search results or the description.
2. Add it to `src/content/photos.js` with its `raw` URL, size, photographer name and username, the recorded `location`, and your own descriptive `alt` text.
3. Use it by id: `figure("id")`, `img("id")` or the `photo` field in content files. The build stops if an id is missing from `photos.js`.

The Unsplash licence does not require attribution, so captions show only the recorded location; photographer details stay in `src/content/photos.js`. If a Creative Commons image is ever added, it must be credited (bring back a credits page for those images only).

The central plateau page uses a photo from Black River Gorges National Park (on the plateau's south-western edge) and says so in a caption. The tea and rum section has no photo, because no Unsplash photo with a matching recorded location turned up; it uses a Chamarel-earth colour panel instead.

## Content rules

- **No invented reviews, ratings, testimonials, press logos or awards.** The About page says plainly that there aren't any yet.
- Stays are marked as placeholders on the site. Replace them with real partners.
- Every factual claim that needs checking is listed in [`FACTS-TO-VERIFY.md`](FACTS-TO-VERIFY.md). When you change a claim, update that list too.

## Design

The look follows editorial travel sites: oversized serif display type over full-bleed photography, small monospace labels with index numbers, hairline grids, index-style lists, a "day of eating" timeline and a large wordmark in the footer.

- **Fonts:** Instrument Serif (display), Inter Tight (text) and IBM Plex Mono (labels). They're self-hosted from `src/assets/fonts/` (Latin subset, SIL Open Font License), so no request goes to Google at runtime. To change fonts, swap the files and update `fonts.css` and the `--font-*` variables at the top of `styles.css`.
- **Colour:** only the palette variables from `site.config.js`. Dark sections use `ink` with `sand` text and `fog` for secondary text.
- **Motion:** a slow zoom on hero photos and a fade-up as sections scroll into view. Both are switched off for visitors who prefer reduced motion, and content is fully visible without JavaScript.

## Accessibility and performance

- Semantic HTML with landmarks, a skip link, visible focus styles and labelled form fields with an error summary.
- Works without JavaScript: the navigation shows as a plain list, the coast chooser shows a month plus a full-year table, and the form falls back to a `mailto:` submission.
- Respects `prefers-reduced-motion`.
- Three self-hosted font files are preloaded (about 85 KB in total); one stylesheet and a few kilobytes of script on the pages that need it.
- Responsive images with `srcset`; only the hero image loads eagerly.
- The site was checked with axe-core (WCAG 2.1 AA rules) at phone and desktop widths. White hero text sits on a dark gradient over the photo; automated tools can't measure contrast over images, so check new hero photos by eye.

## Legal pages

`/privacy/`, `/booking-terms/` and `/cookies/` are built by `src/pages/legal.js` from the copy in `src/content/legal.js`, using the brand name, email and address in `site.config.js`. The site stores nothing in the browser; if you add analytics or local storage, list it in the cookie policy. Have a lawyer review all three before launch.

## Before launch

- Confirm the business address in `site.config.js` (`contact.address` is city-level only for now).
- Set up the `kreolcoast@tourground.com` mailbox and point `kreolcoast.tourground.com` at the Vercel project.
- Replace the `[Placeholder]` stays and request images for them (`IMAGES-NEEDED.md`).
- Work through `FACTS-TO-VERIFY.md` and have a lawyer review the legal pages.

## Project layout

```
site.config.js        brand, contact details, palette, contrast pairs
build.js              builds dist/
scripts/contrast.js   WCAG contrast checker (used by the build)
scripts/serve.js      local preview server
src/content/          all site copy and data
src/pages/            one module per page or page group
src/templates/        layout, shared components, image helpers, map
src/assets/           CSS and browser scripts
FACTS-TO-VERIFY.md    claims to check before launch
vercel.json           Vercel build settings
```
