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

  const nav = NAV.map(
    (item) =>
      `<li><a href="${item.href}"${isCurrent(item.href, path) ? ' aria-current="page"' : ""}>${item.label}</a></li>`,
  ).join("");

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
<meta name="theme-color" content="${config.palette.lagoon}">
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="logo" href="/" aria-label="${esc(brand.name)}, home">
      <span class="logo-mark" aria-hidden="true">${esc(brand.monogram)}</span>
      <span class="logo-name">${esc(brand.name)}</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="nav-toggle-bars" aria-hidden="true"></span>Menu
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>${nav}</ul>
      <a class="button button-small nav-cta" href="/enquire/"${path === "/enquire/" ? ' aria-current="page"' : ""}>Plan a trip</a>
    </nav>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <p class="footer-brand">${esc(brand.name)}</p>
      <p>${esc(brand.pitch)}</p>
    </div>
    <div>
      <h2 class="footer-heading">Explore</h2>
      <ul class="footer-links">
        ${NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
        <li><a href="/credits/">Photo credits</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-heading">Contact</h2>
      <ul class="footer-links">
        <li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>
        <li><a href="${telHref(contact.phone)}">${esc(contact.phone)}</a></li>
        <li>${esc(contact.address)}</li>
        <li>${esc(contact.hours)}</li>
      </ul>
      <a class="button button-light" href="/enquire/">Send an enquiry</a>
    </div>
  </div>
  <div class="wrap footer-small">
    <p>© ${new Date().getFullYear()} ${esc(brand.name)}. Photos from Unsplash, credited on each image and on the <a href="/credits/">credits page</a>.</p>
  </div>
</footer>
<script src="/site.js" defer></script>
${scripts.map((src) => `<script src="${src}" defer></script>`).join("\n")}
</body>
</html>
`;
}

module.exports = { layout, telHref };
