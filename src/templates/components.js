const config = require("../../site.config");
const { esc, img, credit } = require("./helpers");

// Page header. With a photo it's a full-bleed hero; without, a plain band.
function pageHero({ kicker, title, lede, photo, eager = true, tone = "" }) {
  if (!photo) {
    return `<header class="page-head ${tone}">
  <div class="wrap">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ""}
  </div>
</header>`;
  }
  return `<header class="hero">
  <div class="hero-media">${img(photo, { eager, sizes: "100vw" })}</div>
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="wrap hero-content">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ""}
  </div>
  <p class="hero-credit">${credit(photo)}</p>
</header>`;
}

function enquiryCta(text = "Tell us what you love doing and when you can travel, and we'll suggest a route that fits.") {
  return `<section class="cta-band">
  <div class="wrap cta-inner">
    <div>
      <h2>Plan a trip with ${esc(config.brand.name)}</h2>
      <p>${text}</p>
    </div>
    <a class="button button-light" href="/enquire/">Start an enquiry</a>
  </div>
</section>`;
}

function card({ href, photo, title, text, kicker, ratio = 4 / 3, sizes = "(min-width: 60em) 30vw, (min-width: 40em) 45vw, 100vw" }) {
  return `<article class="card">
  ${photo ? `<div class="card-media">${img(photo, { ratio, sizes })}</div>` : ""}
  <div class="card-body">
    ${kicker ? `<p class="card-kicker">${kicker}</p>` : ""}
    <h3><a href="${href}">${title}</a></h3>
    <p>${text}</p>
    ${photo ? `<p class="credit card-credit">${credit(photo)}</p>` : ""}
  </div>
</article>`;
}

module.exports = { pageHero, enquiryCta, card };
