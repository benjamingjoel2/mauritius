const photos = require("../content/photos");
const config = require("../../site.config");

const brandSlug = config.brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const UTM = `utm_source=${brandSlug}&utm_medium=referral`;

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPhoto(id) {
  const photo = photos[id];
  if (!photo) throw new Error(`Unknown photo id "${id}". Add it to src/content/photos.js first.`);
  return photo;
}

// Unsplash serves resized images through imgix, so we never ship originals.
function photoUrl(photo, width, ratio) {
  let url = `${photo.raw}&w=${width}&q=60&auto=format`;
  if (ratio) url += `&fit=crop&h=${Math.round(width / ratio)}`;
  return url;
}

// 828 and 1100 match common phone widths (414px @2x, ~393px @2.75x) so phones
// do not jump straight to a 1280px file.
const WIDTHS = [400, 640, 828, 1100, 1280, 1600, 1920];

// <img> with srcset. `ratio` (width / height) crops; otherwise the photo's
// own proportions are kept.
function img(id, { sizes = "100vw", ratio, eager = false, className = "", alt } = {}) {
  const photo = getPhoto(id);
  const r = ratio || photo.width / photo.height;
  const srcset = WIDTHS.map((w) => `${photoUrl(photo, w, ratio)} ${w}w`).join(", ");
  return `<img src="${esc(photoUrl(photo, 1200, ratio))}" srcset="${esc(srcset)}" sizes="${esc(sizes)}"
    width="1200" height="${Math.round(1200 / r)}" alt="${esc(alt ?? photo.alt)}"
    ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"
    style="background-color:${esc(photo.color)}"${className ? ` class="${className}"` : ""}>`;
}

// Caption line under a photo: its recorded location. The Unsplash licence does not
// require attribution, so photographer credits are kept in photos.js only.
function credit(id) {
  const photo = getPhoto(id);
  return esc(shortLocation(photo.location));
}

function shortLocation(location) {
  return location.replace(/, Mauritius$/, "").replace(/, Maurice$/, "");
}

function figure(id, { caption = "", className = "", ...opts } = {}) {
  return `<figure class="photo ${className}">
    ${img(id, opts)}
    <figcaption>${caption ? `<span class="photo-caption">${caption}</span> ` : ""}<span class="credit">${credit(id)}</span></figcaption>
  </figure>`;
}

function formatDate(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Attributes for <link rel="preload" as="image"> so the hero starts
// downloading before the stylesheet is parsed.
function preloadAttrs(id, sizes = "100vw") {
  const photo = getPhoto(id);
  return `imagesrcset="${esc(WIDTHS.map((w) => `${photoUrl(photo, w)} ${w}w`).join(", "))}" imagesizes="${sizes}"`;
}

module.exports = { preloadAttrs, esc, getPhoto, photoUrl, img, credit, figure, formatDate, shortLocation, UTM };
