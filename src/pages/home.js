const config = require("../../site.config");
const regions = require("../content/regions");
const { trail, roots } = require("../content/food");
const { months, coastNames } = require("../content/months");
const journal = require("../content/journal");
const { esc, img, credit, formatDate } = require("../templates/helpers");
const { pageHero, sectionHead, enquiryCta, card, tile, pad } = require("../templates/components");

const PILLARS = [
  {
    title: "Food",
    text: "Indian, Creole, Chinese and French cooking side by side, and a street-food trail from dholl puri at breakfast to alouda in the afternoon heat.",
    href: "/food/",
    photo: "BvxRDzTXqjc",
  },
  {
    title: "Hiking",
    text: "Volcanic peaks, rainforest gorges and a UNESCO-listed mountain, mostly done before lunch.",
    href: "/things-to-do/#hikes",
    photo: "SsfxuAYTLxg",
  },
  {
    title: "Culture",
    text: "Temples, pagodas, churches and mosques; sugar and tea estates; markets where the whole island shops.",
    href: "/things-to-do/#markets",
    photo: "h2DBBDaFBbg",
  },
  {
    title: "Quieter coasts",
    text: "Pick the right coast for the month and swim in calm water, away from the resort strips.",
    href: "/when-to-go/",
    photo: "NeweseMfeeg",
  },
];

// Suggested times of day for the trail teaser. Illustrative, not rules.
const TRAIL_TIMES = ["08:00", "10:30", "12:30", "15:30", "16:30"];

const COAST_CLASS = { north: "c-north", east: "c-east", south: "c-south", west: "c-west" };

module.exports = () => {
  const latest = journal.slice(0, 3);

  const body = `
${pageHero({
  title: `Mauritius, <em>beyond</em> the resort`,
  lede: "Street food at eight, a ridge walk before the heat, a Creole Sunday lunch, and the calm side of the island for the month you travel. Trips for couples and families who want more than a sunbed.",
  photo: "WV4B_aVj0aQ",
  size: "hero-xl",
  meta: ["Le Morne Brabant", "20°27′S 57°19′E"],
  actions: `<div class="hero-actions">
    <a class="pill pill-light" href="/enquire/">Plan a trip <span aria-hidden="true">→</span></a>
    <a class="pill pill-ghost" href="/when-to-go/">Which coast, which month?</a>
  </div>`,
})}

<section class="sec pillars-sec" aria-labelledby="pillars-title">
  <div class="container">
    <h2 class="visually-hidden" id="pillars-title">What we plan trips around</h2>
    <div class="pillar-tiles">
      ${PILLARS.map((p, i) => tile({ href: p.href, photo: p.photo, title: p.title, index: i + 1, text: p.text, ratio: 3 / 4, className: "tile-tall", sizes: "(min-width: 64em) 25vw, (min-width: 40em) 50vw, 100vw" })).join("")}
    </div>
  </div>
</section>

<section class="sec statement" aria-labelledby="idea-title">
  <div class="container statement-grid">
    <p class="label" id="idea-title"><span class="label-index">(01)</span> The idea</p>
    <div>
      <p class="statement-text">Most people see Mauritius from a sunbed. We plan trips for the other island: <span class="hl">the market at Port Louis</span>, <span class="hl">a ridge above the cane fields</span>, <span class="hl">a Hindu festival</span>, and the lagoon that's calm in the month you're there.</p>
      <dl class="facts-row">
        <div><dt class="label">Regions</dt><dd class="display">6</dd></div>
        <div><dt class="label">Months mapped</dt><dd class="display">12</dd></div>
        <div><dt class="label">Street foods</dt><dd class="display">5</dd></div>
        <div><dt class="label">Islands</dt><dd class="display">2</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="sec sec-paper" aria-labelledby="regions-title">
  <div class="container">
    ${sectionHead({ index: 2, label: "Regions", title: "Six places, <em>six moods</em>", id: "regions-title", link: { href: "/regions/", text: "All regions" } })}
    <div class="mosaic">
      ${regions
        .map((r, i) => tile({ href: `/regions/${r.slug}/`, photo: r.photo, title: r.name.replace(/^The /, ""), kicker: r.kicker, index: i + 1, className: `mosaic-${i + 1}`, sizes: i < 2 ? "(min-width: 64em) 50vw, 100vw" : "(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw" }))
        .join("")}
    </div>
  </div>
</section>

<section class="coast-teaser" aria-labelledby="coast-title">
  <div class="coast-bg" aria-hidden="true">${img("7otLZRAeuQ8", { sizes: "100vw", alt: "" })}</div>
  <div class="container coast-card sec-dark">
    ${sectionHead({ index: 3, label: "Signature tool", title: "Which coast, <em>which month?</em>", id: "coast-title", lede: "The south-east trade winds blow hardest from about June to August, making the east and south breezy while the west and north stay calm. In the hot summer months, the east's breeze is what you want." })}
    <div class="coast-strip">
      <table class="coast-strip-table">
        <caption class="visually-hidden">Calmest coast for each month</caption>
        <thead><tr><th scope="row" class="label">Month</th>${months.map((m) => `<th scope="col" class="label">${m.name.slice(0, 3)}</th>`).join("")}</tr></thead>
        <tbody><tr><th scope="row" class="label">Calmest</th>${months
          .map((m) => `<td class="${COAST_CLASS[m.best]}"><span class="coast-letter">${coastNames[m.best][0]}</span><span class="visually-hidden">${coastNames[m.best]}</span></td>`)
          .join("")}</tr></tbody>
      </table>
      <p class="coast-strip-key label"><span class="c-north">N</span> North <span class="c-east">E</span> East <span class="c-west">W</span> West</p>
    </div>
    <div class="coast-teaser-foot">
      <p class="this-month" data-this-month hidden></p>
      <a class="pill pill-light" href="/when-to-go/">Open the coast chooser <span aria-hidden="true">→</span></a>
    </div>
  </div>
  <p class="credit coast-credit">${credit("7otLZRAeuQ8")}</p>
</section>

<section class="sec day sec-coral" aria-labelledby="day-title">
  <div class="container day-grid">
    <div class="day-intro">
      ${sectionHead({ index: 4, label: "The street-food trail", title: "A day of eating <em>in Port Louis</em>", id: "day-title", lede: "Five dishes and four culinary roots, in the order you'd eat them." })}
      <div class="day-photo">${img("Iiw8FxkZHfI", { ratio: 4 / 3, sizes: "(min-width: 64em) 40vw, 100vw" })}<p class="credit">${credit("Iiw8FxkZHfI")}</p></div>
      <a class="arrow-link" href="/food/#trail">Follow the full trail <span aria-hidden="true">→</span></a>
    </div>
    <ol class="day-list" role="list">
      ${trail
        .map(
          (d, i) => `<li class="day-item">
        <span class="label day-time">${TRAIL_TIMES[i]}</span>
        <div>
          <h3 class="day-dish"><a href="/food/#${d.slug}">${d.name}</a></h3>
          <p class="day-when">${d.when}. ${d.what.split(". ")[0].replace(/\.$/, "")}.</p>
          <p class="tags">${d.roots.map((r) => `<span class="tag" style="--tag: var(--${roots[r].color})">${roots[r].label}</span>`).join("")}</p>
        </div>
      </li>`,
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="split split-lagoon" aria-labelledby="name-title">
  <div class="split-media">${img("h2DBBDaFBbg", { ratio: 1, sizes: "(min-width: 64em) 50vw, 100vw" })}<p class="credit split-credit">${credit("h2DBBDaFBbg")}</p></div>
  <div class="split-panel">
    <p class="label">(05) The name</p>
    <h2 class="display split-title" id="name-title">${esc(config.brand.name)}</h2>
    <p>${esc(config.brand.nameStory)}</p>
    <a class="arrow-link" href="/about/">About us <span aria-hidden="true">→</span></a>
  </div>
</section>

<section class="sec" aria-labelledby="journal-title">
  <div class="container">
    ${sectionHead({ index: 6, label: "Journal", title: "Stories <em>and guides</em>", id: "journal-title", link: { href: "/journal/", text: "All stories" } })}
    <div class="cards">
      ${latest.map((p, i) => card({ href: `/journal/${p.slug}/`, photo: p.photo, title: esc(p.title), kicker: formatDate(p.date), index: i + 1, text: esc(p.summary) })).join("")}
    </div>
  </div>
</section>

${enquiryCta()}
`;
  return [{ path: "/", title: "Home", body, ogPhoto: "WV4B_aVj0aQ", scripts: ["/coast-data.js", "/this-month.js"] }];
};
