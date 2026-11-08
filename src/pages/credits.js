// Photo credits: every photo on the site with its photographer, licence and source link.
// Generated from src/content/photos.js. Credits never sit on the photos themselves
// (owner rule, 8 Nov 2026); captions show the recorded location only.
const config = require("../../site.config");
const photos = require("../content/photos");
const { pageHero } = require("../templates/components");
const { esc, shortLocation } = require("../templates/helpers");

module.exports = () => {
  const { brand } = config;
  const items = Object.values(photos)
    .map(
      (p) => `<li class="photo-credit">
      <p class="photo-credit__place">${esc(shortLocation(p.location))}</p>
      <p>${esc(p.alt)}</p>
      <dl>
        <dt>Photographer</dt><dd><a href="https://unsplash.com/@${esc(p.username)}" rel="noopener">${esc(p.author)}</a></dd>
        <dt>Licence</dt><dd><a href="https://unsplash.com/license" rel="noopener">Unsplash License</a></dd>
        <dt>Source</dt><dd><a href="${esc(p.page)}" rel="noopener">Photo page on Unsplash</a></dd>
      </dl>
    </li>`
    )
    .join("\n    ");
  return [
    {
      path: "/photo-credits/",
      title: "Photo credits",
      description: `Photographers, licences and sources for the photos on the ${brand.name} website.`,
      body: `
${pageHero({ kicker: "Legal", title: "Photo credits", lede: "Every photo on this site, with its recorded location, photographer and source. Photos may be cropped to fit the layout." })}
<section class="sec">
  <div class="container post-body prose legal">
    <ul class="photo-credits" role="list">
    ${items}
    </ul>
  </div>
</section>`,
    },
  ];
};
