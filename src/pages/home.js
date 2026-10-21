const config = require("../../site.config");
const regions = require("../content/regions");
const { trail, roots } = require("../content/food");
const journal = require("../content/journal");
const { esc, figure, formatDate } = require("../templates/helpers");
const { pageHero, enquiryCta, card } = require("../templates/components");

const PILLARS = [
  {
    title: "Food",
    text: "Indian, Creole, Chinese and French cooking side by side, and a street-food trail from dholl puri at breakfast to alouda in the afternoon heat.",
    href: "/food/",
    color: "ochre",
  },
  {
    title: "Hiking",
    text: "Volcanic peaks, rainforest gorges and a UNESCO mountain, mostly done before lunch.",
    href: "/things-to-do/#hikes",
    color: "caneLight",
  },
  {
    title: "Culture",
    text: "Temples, pagodas, churches and mosques; sugar and tea estates; markets where the whole island shops.",
    href: "/things-to-do/#markets",
    color: "coral",
  },
  {
    title: "Quieter coasts",
    text: "Pick the right coast for the month and you'll swim in calm water away from the resort strips.",
    href: "/when-to-go/",
    color: "lagoonBright",
  },
];

module.exports = () => {
  const latest = journal.slice(0, 3);
  const body = `
${pageHero({
  kicker: config.brand.tagline,
  title: "Mauritius, for people who want more than a sunbed",
  lede: "Street food in Port Louis, dawn hikes, Hindu festivals and Creole Sunday lunches, and the calmest coast for the month you travel. For couples and families.",
  photo: "WV4B_aVj0aQ",
})}

<section class="section">
  <div class="wrap">
    <h2 class="section-title">Beyond the resort</h2>
    <ul class="pillars" role="list">
      ${PILLARS.map(
        (p) => `<li class="pillar" style="--accent: var(--${p.color})">
        <h3><a href="${p.href}">${p.title}</a></h3>
        <p>${p.text}</p>
      </li>`,
      ).join("")}
    </ul>
  </div>
</section>

<section class="section section-mist">
  <div class="wrap split">
    <div>
      <p class="kicker">Signature tool</p>
      <h2>Which coast, which month?</h2>
      <p>The south-east trade winds blow hardest from about June to August. That makes the east and south breezy and choppy while the west and north stay calm. In the hot summer months the picture flips, and the east's breeze is what you want.</p>
      <p>Our chooser shows the calmest coast for every month, plus where to go if you're after wind for kitesurfing instead.</p>
      <p class="this-month" data-this-month hidden></p>
      <a class="button" href="/when-to-go/">Open the coast chooser</a>
    </div>
    ${figure("L6hI8SK9Hr0", { caption: "Kitesurf lessons at Graviers, Rodrigues.", sizes: "(min-width: 60em) 45vw, 100vw" })}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2 class="section-title">Six places, six moods</h2>
      <a class="more" href="/regions/">All regions</a>
    </div>
    <div class="grid grid-3">
      ${regions
        .map((r) => card({ href: `/regions/${r.slug}/`, photo: r.photo, title: r.name, kicker: r.kicker, text: r.summary }))
        .join("")}
    </div>
  </div>
</section>

<section class="section section-sand">
  <div class="wrap">
    <div class="section-head">
      <h2 class="section-title">The street-food trail</h2>
      <a class="more" href="/food/#trail">Follow the trail</a>
    </div>
    <p class="section-lede">Five dishes, four culinary roots, one day. Eat them in this order.</p>
    <ol class="trail-mini" role="list">
      ${trail
        .map(
          (d, i) => `<li>
        <span class="trail-step" aria-hidden="true">${i + 1}</span>
        <div>
          <h3><a href="/food/#${d.slug}">${d.name}</a></h3>
          <p class="trail-when">${d.when}</p>
          <p class="tags">${d.roots.map((r) => `<span class="tag" style="--tag: var(--${roots[r].color})">${roots[r].label}</span>`).join("")}</p>
        </div>
      </li>`,
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2 class="section-title">From the journal</h2>
      <a class="more" href="/journal/">All stories</a>
    </div>
    <div class="grid grid-3">
      ${latest
        .map((p) => card({ href: `/journal/${p.slug}/`, photo: p.photo, title: esc(p.title), kicker: formatDate(p.date), text: esc(p.summary) }))
        .join("")}
    </div>
  </div>
</section>

${enquiryCta()}
`;
  return [{ path: "/", title: "Home", body, ogPhoto: "WV4B_aVj0aQ", scripts: ["/coast-data.js", "/this-month.js"] }];
};
