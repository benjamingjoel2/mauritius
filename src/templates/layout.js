const config = require("../../site.config");
const { esc, getPhoto, photoUrl } = require("./helpers");

const NAV = [
  { href: "/regions/", label: "Regions" },
  { href: "/things-to-do/", label: "Things to do" },
  { href: "/food/", label: "Food" },
  { href: "/when-to-go/", label: "When to go" },
  { href: "/stays/", label: "Stays" },
  { href: "/journal/", label: "Journal" },
  { href: "/about/", label: "About" },
];

function isCurrent(href, path) {
  return path === href || (href !== "/" && path.startsWith(href));
}

function telHref(number) {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

function layout({ path, title, description, body, ogPhoto, scripts = [], noindex = false }) {
  const { brand, contact, siteUrl } = config;
  const fullTitle = path === "/" ? `${brand.name}: ${brand.tagline}` : `${title} | ${brand.name}`;
  const desc = description || brand.pitch;
  const og = ogPhoto ? photoUrl(getPhoto(ogPhoto), 1200, 1200 / 630) : null;
  // Pages that open with a full-bleed photo get a transparent header over it.
  const overlay = /<header class="hero/.test(body);

  const current = (href) => (isCurrent(href, path) ? ' aria-current="page"' : "");
  const pad = (n) => String(n).padStart(2, "0");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${siteUrl}${path}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(brand.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${siteUrl}${path}">
${og ? `<meta property="og:image" content="${esc(og)}">\n<meta name="twitter:card" content="summary_large_image">` : ""}
<meta name="theme-color" content="${config.palette.ink}">
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="preload" href="/fonts/InstrumentSerif-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/InterTight-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
</head>
<body class="${overlay ? "has-hero" : "no-hero"}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header${overlay ? " is-overlay" : ""}" data-header>
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="${esc(brand.name)}, home">
      <span class="logo-mark" aria-hidden="true">${esc(brand.monogram)}</span>
      <span class="logo-name">${esc(brand.name)}</span>
    </a>
    <nav class="desktop-nav" aria-label="Main">
      <ul role="list">${NAV.map((item) => `<li><a href="${item.href}"${current(item.href)}>${item.label}</a></li>`).join("")}</ul>
    </nav>
    <div class="header-actions">
      <a class="pill pill-solid" href="/enquire/"${current("/enquire/")}>Plan a trip</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
        <span class="menu-toggle-label">Menu</span><span class="menu-toggle-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>
<div class="menu" id="menu" data-menu>
  <nav class="container menu-inner" aria-label="Main (mobile)">
    <ol role="list" class="menu-list">
      ${[{ href: "/", label: "Home" }, ...NAV, { href: "/enquire/", label: "Plan a trip" }]
        .map((item, i) => `<li><a href="${item.href}"${current(item.href)}><span class="label">${pad(i + 1)}</span>${item.label}</a></li>`)
        .join("")}
    </ol>
    <p class="menu-contact label"><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a> · <a href="${telHref(contact.phone)}">${esc(contact.phone)}</a></p>
  </nav>
</div>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-intro">
        <p class="label">${esc(brand.tagline)}</p>
        <p class="footer-pitch">${esc(brand.pitch)}</p>
        <a class="pill pill-light" href="/enquire/">Start an enquiry <span aria-hidden="true">→</span></a>
      </div>
      <div>
        <h2 class="label footer-heading">Explore</h2>
        <ul class="footer-links" role="list">
          ${NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
        </ul>
      </div>
      <div>
        <h2 class="label footer-heading">Contact</h2>
        <ul class="footer-links" role="list">
          <li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>
          <li><a href="${telHref(contact.phone)}">${esc(contact.phone)}</a></li>
          <li>${esc(contact.address)}</li>
          <li>${esc(contact.hours)}</li>
        </ul>
      </div>
    </div>
    <p class="footer-wordmark" aria-hidden="true">${esc(brand.name)}</p>
    <div class="footer-small label">
      <p>© ${new Date().getFullYear()} ${esc(brand.name)}</p>
      <p>Photos from Unsplash, credited on each image · <a href="/credits/">Photo credits</a></p>
      <p>20°10′S 57°31′E · Indian Ocean</p>
    </div>
  </div>
</footer>
<script src="/site.js" defer></script>
${scripts.map((src) => `<script src="${src}" defer></script>`).join("\n")}
</body>
</html>
`;
}

module.exports = { layout, telHref };
