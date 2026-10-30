// Privacy policy, booking terms and cookie policy. Copy lives in src/content/legal.js.
const config = require("../../site.config");
const { legalPages } = require("../content/legal");
const { pageHero } = require("../templates/components");

const UPDATED = "30 October 2026";

module.exports = () => {
  const { brand, contact, enquiry } = config;
  const docs = legalPages({
    brand: brand.name,
    email: contact.email,
    address: contact.address,
    updated: UPDATED,
    storage: [],
    enquiryNote: enquiry.endpoint
      ? "The enquiry form is sent to our form-handling provider, which delivers it to our inbox."
      : "The enquiry form does not send anything itself: it opens your own email app with your enquiry filled in.",
    processors: ["with our website host and email provider, who process data on our behalf under contract;"],
    thirdParty:
      "Fonts are served from this website's own domain. Photos load from Unsplash's image service (images.unsplash.com), which does not set cookies.",
  });
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
