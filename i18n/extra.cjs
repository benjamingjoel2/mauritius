// Dictionary entries generated from copy that is already written in every language:
// the legal pages (src/content/legal.js). Merged under i18n/<lang>.json by scripts/translate-site.cjs.
const { LEGAL } = require("../src/content/legal");
const legalOptions = require("../src/content/legal-options");
const { zipRuns } = require("../scripts/translate-site.cjs");
const config = require("../site.config");

const render = (d) =>
  [d.privacy, d.terms, d.cookies]
    .map((doc) => `<h1>${doc.title}</h1><p>${doc.intro}</p>` + doc.sections.map((s) => `<h2>${s.h}</h2>${s.html}`).join(""))
    .join("");

module.exports = (lang) => {
  if (!LEGAL[lang] || lang === "en") return {};
  const en = LEGAL.en(legalOptions("en"));
  const tr = LEGAL[lang](legalOptions(lang));
  const out = zipRuns(render(en), render(tr));
  const name = config.brand.name;
  for (const k of ["privacy", "terms", "cookies"]) {
    out[`${en[k].title} | ${name}`] = `${tr[k].title} | ${name}`;
    out[`${en[k].title} for ${name}.`] = `${tr[k].title} – ${name}.`;
  }
  return out;
};
