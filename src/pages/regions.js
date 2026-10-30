const regions = require("../content/regions");
const stays = require("../content/stays");
const { esc, figure } = require("../templates/helpers");
const { pageHero, sectionHead, enquiryCta, indexRow, tile, pad } = require("../templates/components");

const shortName = (r) => r.name.replace(/^The /, "");

function indexPage() {
  const body = `
${pageHero({
  kicker: "Regions",
  title: "Where to go <em>in Mauritius</em>",
  lede: "Each coast has its own weather, pace and best months. Add the cool central plateau and the slow island of Rodrigues, and you have six very different trips.",
  photo: "IfRThYDUjCE",
})}
<section class="sec" aria-labelledby="regions-list">
  <div class="container">
    ${sectionHead({ index: 1, label: "Six regions", title: "Choose your <em>side of the island</em>", id: "regions-list", link: { href: "/when-to-go/", text: "Which coast, which month?" } })}
    <div class="mosaic">
      ${regions
        .map((r, i) => tile({ href: `/regions/${r.slug}/`, photo: r.photo, title: shortName(r), kicker: r.kicker, index: i + 1, text: r.summary, className: `mosaic-${i + 1}`, sizes: i < 2 ? "(min-width: 64em) 50vw, 100vw" : "(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw" }))
        .join("")}
    </div>
    <ol class="index-list index-list-after" role="list">
      ${regions
        .map((r, i) =>
          indexRow({
            href: `/regions/${r.slug}/`,
            index: i + 1,
            title: shortName(r),
            kicker: r.kicker,
            text: r.summary,
            aside: `Calmest: ${esc(r.calmMonths)}`,
            photo: r.photo,
          }),
        )
        .join("")}
    </ol>
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
  const next = regions[(index + 1) % regions.length];
  const [first, ...rest] = region.intro;

  const body = `
${pageHero({
  kicker: `${pad(index + 1)} / ${pad(regions.length)} · Regions`,
  title: shortName(region),
  lede: region.summary,
  photo: region.photo,
  meta: [region.kicker],
})}

<section class="data-strip" aria-label="${esc(region.name)} at a glance">
  <dl class="container data-strip-grid">
    <div><dt class="label">Calmest water</dt><dd>${esc(region.calmMonths)}</dd></div>
    <div><dt class="label">Good for</dt><dd>${region.bestFor.join(" · ")}</dd></div>
    <div><dt class="label">Places</dt><dd>${esc(region.kicker)}</dd></div>
    <div><dt class="label">Plan by month</dt><dd><a href="/when-to-go/">Coast chooser →</a></dd></div>
  </dl>
</section>

<section class="sec">
  <div class="container intro-grid">
    <p class="label"><span class="label-index">(01)</span> Overview</p>
    <div>
      <p class="intro-big">${first}</p>
      <div class="intro-body">
        ${rest.map((p) => `<p>${p}</p>`).join("")}
        ${region.photoNote ? `<p class="note">${region.photoNote}</p>` : ""}
      </div>
    </div>
  </div>
</section>

<section class="sec sec-lagoon on-color" aria-labelledby="hl-title">
  <div class="container">
    ${sectionHead({ index: 2, label: "Highlights", title: `What to see <em>and do</em>`, id: "hl-title" })}
    <ol class="rows" role="list">
      ${region.highlights
        .map(
          (h, i) => `<li class="row">
        <span class="label row-num">${pad(i + 1)}</span>
        <h3 class="row-title">${h.title}</h3>
        <p class="row-text">${h.text}</p>
      </li>`,
        )
        .join("")}
    </ol>
  </div>
</section>

${
  region.gallery.length
    ? `<section class="sec gallery-sec" aria-label="Photos of ${esc(region.name)}">
  <div class="container gallery gallery-${Math.min(region.gallery.length, 3)}">
    ${region.gallery.map((id, i) => figure(id, { className: i === 0 ? "gallery-lead" : "", sizes: i === 0 ? "(min-width: 64em) 60vw, 100vw" : "(min-width: 64em) 35vw, 100vw", ratio: i === 0 ? 4 / 3 : 4 / 5 })).join("")}
  </div>
</section>`
    : ""
}

${
  regionStays.length
    ? `<section class="sec sec-mist" aria-labelledby="stay-title">
  <div class="container">
    ${sectionHead({ index: 3, label: "Where to stay", title: "Small places <em>to stay</em>", id: "stay-title", lede: "Placeholder listings while we sign up partners.", link: { href: "/stays/", text: "All stays" } })}
    <ul class="rows" role="list">
      ${regionStays
        .map(
          (s) => `<li class="row">
        <span class="label row-num">${esc(s.area)}</span>
        <h3 class="row-title">${esc(s.name)}</h3>
        <p class="row-text">${esc(s.type)}. ${esc(s.text)}</p>
      </li>`,
        )
        .join("")}
    </ul>
  </div>
</section>`
    : ""
}

<nav class="next-region" aria-label="Next region">
  <a class="container next-link" href="/regions/${next.slug}/">
    <span class="label">Next region · ${pad(((index + 1) % regions.length) + 1)}</span>
    <span class="display next-title">${shortName(next)} <span aria-hidden="true">→</span></span>
  </a>
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
