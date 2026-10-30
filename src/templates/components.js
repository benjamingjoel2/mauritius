const config = require("../../site.config");
const { esc, img, credit, getPhoto, shortLocation } = require("./helpers");

const pad = (n) => String(n).padStart(2, "0");

// Full-bleed photo hero with oversized type. Without a photo, a plain
// editorial page head on sand.
function pageHero({ kicker, title, lede, photo, eager = true, meta = [], actions = "", size = "" }) {
  if (!photo) {
    return `<header class="page-head">
  <div class="container">
    ${kicker ? `<p class="label">${kicker}</p>` : ""}
    <h1 class="display page-head-title">${title}</h1>
    ${lede ? `<p class="lede page-head-lede">${lede}</p>` : ""}
    ${actions}
  </div>
</header>`;
  }
  const where = shortLocation(getPhoto(photo).location);
  const metaItems = meta.length ? meta : [where];
  return `<header class="hero ${size}" data-photo="${photo}">
  <div class="hero-media">${img(photo, { eager, sizes: "100vw" })}</div>
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="container hero-content">
    <div class="hero-meta label">
      ${kicker ? `<span>${kicker}</span>` : ""}
      ${metaItems.map((m) => `<span>${m}</span>`).join("")}
    </div>
    <h1 class="display hero-title">${title}</h1>
    <div class="hero-foot">
      ${lede ? `<p class="lede hero-lede">${lede}</p>` : ""}
      ${actions}
    </div>
  </div>
  <p class="hero-credit label">${credit(photo)}</p>
</header>`;
}

// "(02) Regions" style section heading with an optional link on the right.
function sectionHead({ index, label, title, link, lede, id }) {
  return `<div class="sec-head">
  <p class="label">${index ? `<span class="label-index">(${pad(index)})</span> ` : ""}${label}</p>
  <div class="sec-head-row">
    <h2 class="display sec-title"${id ? ` id="${id}"` : ""}>${title}</h2>
    ${link ? `<a class="arrow-link" href="${link.href}">${link.text} <span aria-hidden="true">→</span></a>` : ""}
  </div>
  ${lede ? `<p class="sec-lede">${lede}</p>` : ""}
</div>`;
}

function enquiryCta(text = "Tell us what you love doing and when you can travel. We'll suggest a route that fits.", photo = "WV4B_aVj0aQ") {
  return `<section class="cta" aria-labelledby="cta-title">
  <div class="cta-media" aria-hidden="true">${img(photo, { sizes: "100vw", alt: "" })}</div>
  <div class="container cta-inner">
    <p class="label">Plan with ${esc(config.brand.name)}</p>
    <h2 class="display cta-title" id="cta-title"><a href="/enquire/">Start planning <span class="cta-arrow" aria-hidden="true">→</span></a></h2>
    <p class="cta-text">${text}</p>
  </div>
  <p class="credit cta-credit">${credit(photo)}</p>
</section>`;
}

// Editorial card: image, mono kicker, serif title, short text, credit.
function card({ href, photo, title, text, kicker, index, ratio = 4 / 5, sizes = "(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" }) {
  return `<article class="card">
  ${photo ? `<div class="card-media">${img(photo, { ratio, sizes })}</div>` : ""}
  <div class="card-body">
    <p class="label card-kicker">${index ? `<span>${pad(index)}</span>` : ""}${kicker ? `<span>${kicker}</span>` : ""}</p>
    <h3 class="card-title"><a href="${href}">${title}</a></h3>
    ${text ? `<p class="card-text">${text}</p>` : ""}
    ${photo ? `<p class="credit card-credit">${credit(photo)}</p>` : ""}
  </div>
</article>`;
}

// One row in an index list (regions, journal): number, big name, detail,
// thumbnail and arrow, separated by hairlines.
function indexRow({ href, index, title, kicker, text, photo, aside }) {
  return `<li class="index-row">
  <a href="${href}" class="index-link">
    <span class="label index-num">${pad(index)}</span>
    <span class="index-main">
      <span class="display index-title">${title}</span>
      ${kicker ? `<span class="label index-kicker">${kicker}</span>` : ""}
    </span>
    ${text ? `<span class="index-text">${text}</span>` : ""}
    ${aside ? `<span class="label index-aside">${aside}</span>` : ""}
    ${photo ? `<span class="index-thumb">${img(photo, { ratio: 4 / 3, sizes: "(min-width: 64em) 14rem, 30vw" })}</span>` : ""}
    <span class="index-arrow" aria-hidden="true">→</span>
  </a>
  ${photo ? `<p class="credit index-credit">${credit(photo)}</p>` : ""}
</li>`;
}

// Photo tile with the title set over the image (regions, pillars).
function tile({ href, photo, title, kicker, index, text, className = "", sizes = "(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw", ratio }) {
  return `<article class="tile ${className}">
  <div class="tile-media">${img(photo, { sizes, ratio })}</div>
  <div class="tile-shade" aria-hidden="true"></div>
  <div class="tile-body">
    <p class="label tile-kicker">${index ? `<span>${pad(index)}</span>` : ""}${kicker ? `<span>${kicker}</span>` : ""}</p>
    <h3 class="display tile-title"><a href="${href}">${title}</a></h3>
    ${text ? `<p class="tile-text">${text}</p>` : ""}
  </div>
  <p class="credit tile-credit">${credit(photo)}</p>
</article>`;
}

module.exports = { pageHero, sectionHead, enquiryCta, card, indexRow, tile, pad };
