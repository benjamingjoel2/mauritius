// Static site build. No dependencies: run `node build.js` (or `npm run build`)
// and the finished site is written to dist/.

const fs = require("fs");
const path = require("path");
const config = require("./site.config");
const { checkContrast } = require("./scripts/contrast");
const { layout } = require("./src/templates/layout");
const { months, calmPicks, coastNames } = require("./src/content/months");

const OUT = path.join(__dirname, "dist");
const ASSETS = path.join(__dirname, "src", "assets");

const pageModules = ["home", "regions", "things", "food", "when", "other"];

function write(rel, content) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function fileFor(page) {
  if (page.file) return page.file;
  return path.join(page.path.replace(/^\//, ""), "index.html");
}

function paletteCss() {
  const vars = Object.entries(config.palette)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n");
  return `:root {\n${vars}\n}\n\n`;
}

function favicon() {
  const { ink, sand } = config.palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${ink}"/><text x="32" y="40" font-family="Georgia,serif" font-size="24" fill="${sand}" text-anchor="middle">${config.brand.monogram}</text></svg>`;
}

// Light, safe CSS minification: drop comments and indentation/blank lines.
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function build() {
  const failures = checkContrast(config);
  if (failures.length) {
    console.error("Palette fails WCAG AA (4.5:1) for these text/background pairs:");
    failures.forEach((f) => console.error(`  ${f.fg} on ${f.bg}: ${f.ratio.toFixed(2)}:1`));
    process.exit(1);
  }

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // Assets
  const fontsDir = path.join(ASSETS, "fonts");
  write(
    "styles.css",
    minifyCss(paletteCss() + fs.readFileSync(path.join(fontsDir, "fonts.css"), "utf8") + "\n" + fs.readFileSync(path.join(ASSETS, "styles.css"), "utf8")),
  );
  for (const file of fs.readdirSync(fontsDir)) {
    if (file.endsWith(".woff2")) write(path.join("fonts", file), fs.readFileSync(path.join(fontsDir, file)));
  }
  for (const file of fs.readdirSync(ASSETS)) {
    if (file.endsWith(".js")) fs.copyFileSync(path.join(ASSETS, file), path.join(OUT, file));
  }
  write("coast-data.js", `window.COAST_DATA = ${JSON.stringify({ months, calmPicks, coastNames })};\n`);
  write("favicon.svg", favicon());

  // Pages
  const pages = pageModules.flatMap((name) => require(`./src/pages/${name}`)());
  const seen = new Set();
  for (const page of pages) {
    const file = fileFor(page);
    if (seen.has(file)) throw new Error(`Two pages write to ${file}`);
    seen.add(file);
    write(file, layout(page));
  }

  // Sitemap and robots
  const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${config.siteUrl}${p.path}</loc></url>`);
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

  console.log(`Built ${pages.length} pages into dist/`);
}

build();
