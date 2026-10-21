const regions = require("../content/regions");
const stays = require("../content/stays");
const { esc, figure } = require("../templates/helpers");
const { pageHero, enquiryCta, card } = require("../templates/components");

function indexPage() {
  const body = `
${pageHero({
  kicker: "Regions",
  title: "Where to go in Mauritius",
  lede: "Each coast has its own weather, its own pace and its own best months. Add the cool central plateau and the slow island of Rodrigues, and you have six very different trips.",
  photo: "IfRThYDUjCE",
})}
<section class="section" aria-labelledby="regions-list">
  <div class="wrap">
    <h2 id="regions-list" class="visually-hidden">All regions</h2>
    <div class="grid grid-3">
      ${regions
        .map((r) =>
          card({
            href: `/regions/${r.slug}/`,
            photo: r.photo,
            title: r.name,
            kicker: r.kicker,
            text: `${r.summary} <strong class="card-meta">Calmest: ${esc(r.calmMonths)}</strong>`,
          }),
        )
        .join("")}
    </div>
    <p class="note">Not sure which coast suits your dates? <a href="/when-to-go/">Use the coast chooser</a>.</p>
  </div>
</section>
${enquiryCta()}`;
  return {
    path: "/regions/",
    title: "Regions",
    description: "The north, east, south and west coasts of Mauritius, the central plateau and Rodrigues: what each is like and when to go.",
    ogPhoto: "IfRThYDUjCE",
    body,
  };
}

function regionPage(region, index) {
  const regionStays = stays.filter((s) => s.region === region.slug);
  const prev = regions[(index - 1 + regions.length) % regions.length];
  const next = regions[(index + 1) % regions.length];

  const body = `
${pageHero({ kicker: region.kicker, title: region.name, lede: region.summary, photo: region.photo })}
<section class="section">
  <div class="wrap prose-grid">
    <div class="prose">
      ${region.intro.map((p) => `<p>${p}</p>`).join("")}
      ${region.photoNote ? `<p class="note">${region.photoNote}</p>` : ""}
    </div>
    <aside class="fact-box" aria-label="${esc(region.name)} at a glance">
      <h2>At a glance</h2>
      <dl>
        <dt>Good for</dt>
        <dd><ul>${region.bestFor.map((b) => `<li>${b}</li>`).join("")}</ul></dd>
        <dt>Calmest water</dt>
        <dd>${esc(region.calmMonths)}</dd>
      </dl>
      <a href="/when-to-go/">Check the month you're travelling</a>
    </aside>
  </div>
</section>

<section class="section section-sand">
  <div class="wrap">
    <h2 class="section-title">Highlights</h2>
    <ul class="highlights" role="list">
      ${region.highlights.map((h) => `<li><h3>${h.title}</h3><p>${h.text}</p></li>`).join("")}
    </ul>
  </div>
</section>

${
  region.gallery.length
    ? `<section class="section">
  <div class="wrap gallery gallery-${Math.min(region.gallery.length, 3)}">
    ${region.gallery.map((id) => figure(id, { sizes: "(min-width: 60em) 33vw, 100vw", ratio: 4 / 3 })).join("")}
  </div>
</section>`
    : ""
}

${
  regionStays.length
    ? `<section class="section section-mist">
  <div class="wrap">
    <h2 class="section-title">Where to stay</h2>
    <p class="section-lede">Placeholder listings while we sign up partners.</p>
    ${regionStays.map((s) => `<p><strong>${esc(s.name)}</strong>, ${esc(s.area)}: ${esc(s.type)}. <a href="/stays/">See all stays</a></p>`).join("")}
  </div>
</section>`
    : ""
}

<nav class="section pager" aria-label="More regions">
  <div class="wrap pager-inner">
    <a href="/regions/${prev.slug}/" rel="prev"><span>Previous region</span>${prev.name}</a>
    <a href="/regions/${next.slug}/" rel="next"><span>Next region</span>${next.name}</a>
  </div>
</nav>
${enquiryCta(`Want to build a trip around ${region.name.replace(/^The /, "the ")}? Tell us your dates and what you enjoy.`)}`;

  return {
    path: `/regions/${region.slug}/`,
    title: `${region.name}: ${region.kicker}`,
    description: region.summary,
    ogPhoto: region.photo,
    body,
  };
}

module.exports = () => [indexPage(), ...regions.map(regionPage)];
