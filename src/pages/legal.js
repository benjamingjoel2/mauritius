// Privacy policy, booking terms and cookie policy. Copy lives in src/content/legal.js.
const config = require("../../site.config");
const { LEGAL } = require("../content/legal");
const legalOptions = require("../content/legal-options");
const { pageHero } = require("../templates/components");

module.exports = () => {
  const { brand } = config;
  const docs = LEGAL.en(legalOptions("en"));

  const page = (path, doc) => ({
    path,
    title: doc.title,
    description: `${doc.title} for ${brand.name}.`,
    body: `
${pageHero({ kicker: "Legal", title: doc.title, lede: doc.intro })}
<section class="sec">
  <div class="container post-body prose legal">
    ${doc.sections.map((s) => `<h2>${s.h}</h2>\n${s.html.replace("COOKIES_URL", "/cookies/")}`).join("\n")}
  </div>
</section>`,
  });
  return [page("/privacy/", docs.privacy), page("/booking-terms/", docs.terms), page("/cookies/", docs.cookies)];
};
