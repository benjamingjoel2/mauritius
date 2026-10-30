const { months, calmPicks, coastNames } = require("../content/months");
const { esc, figure } = require("../templates/helpers");
const { pageHero, sectionHead, enquiryCta } = require("../templates/components");
const { coastMap } = require("../templates/map");

const RATING = ["Breezy, choppy", "Fine", "Calmest"];
const ORDER = ["north", "east", "south", "west"];

// The month panel. Rendered at build time for the first month (so the page
// works without JavaScript) and re-rendered in the browser by chooser.js,
// which fills the same data-f hooks.
function monthPanel(m) {
  return `<div class="chooser-result" data-panel>
  <p class="label chooser-season"><span data-f="season">${m.season}</span> · <span data-f="wind">${m.wind}</span> winds</p>
  <p class="chooser-month display" data-f="name">${m.name}</p>
  <h3 class="chooser-best">Best coast: <strong class="display" data-f="bestName">${coastNames[m.best]}</strong></h3>
  <p class="chooser-why" data-f="why">${m.why}</p>

  <div class="chooser-modes">
    <section class="mode mode-calm" data-mode="calm">
      <h4 class="label">Calm water</h4>
      <ul class="coast-ratings" role="list" data-f="ratings">
        ${ORDER.map((c) => `<li class="rating-${m.coasts[c]}"><span class="coast-name">${coastNames[c]}</span> <span class="coast-rating">${RATING[m.coasts[c]]}</span></li>`).join("")}
      </ul>
      <p class="mode-try"><span class="label">Try</span> <span data-f="picks">${calmPicks[m.best]}</span></p>
    </section>
    <section class="mode mode-kite" data-mode="kite">
      <h4 class="label">Kitesurfing</h4>
      <p data-f="kite">${m.kite}</p>
    </section>
  </div>

  <dl class="chooser-weather">
    <div><dt class="label">Air</dt><dd data-f="air">${m.air}</dd></div>
    <div><dt class="label">Sea</dt><dd data-f="sea">${m.sea}</dd></div>
    <div><dt class="label">Rain</dt><dd data-f="rain">${m.rain}</dd></div>
    <div><dt class="label">Cyclones</dt><dd data-f="cyclone">${m.cyclone ? "Cyclone season" : "Outside cyclone season"}</dd></div>
  </dl>
  <ul class="chooser-extras" data-f="extras">${m.extras.map((e) => `<li>${e}</li>`).join("")}</ul>
</div>`;
}

module.exports = () => {
  const first = months[0];
  const body = `
${pageHero({
  kicker: "When to go",
  title: "Which coast, <em>which month?</em>",
  lede: "There's no bad month for Mauritius, only the wrong coast. The trade winds decide which side of the island is calm, so choose your base by the month you travel.",
  photo: "-5UEyBFp-fE",
})}

<section class="sec" aria-labelledby="chooser-title">
  <div class="container">
    ${sectionHead({ index: 1, label: "Signature tool", title: "The coast <em>chooser</em>", id: "chooser-title", lede: "Pick a month, then choose whether you're after calm water or wind for kitesurfing." })}

    <div class="chooser" data-chooser data-mode="both">
      <div class="chooser-controls">
        <fieldset class="month-picker">
          <legend class="label">Month</legend>
          <div class="month-options">
            ${months
              .map(
                (m, i) => `<label class="month-option"><input type="radio" name="month" value="${m.key}"${i === 0 ? " checked" : ""}><span>${m.name.slice(0, 3)}<span class="visually-hidden">${m.name.slice(3)}</span></span></label>`,
              )
              .join("")}
          </div>
        </fieldset>
        <fieldset class="mode-picker">
          <legend class="label">I want</legend>
          <div class="mode-options">
            <label><input type="radio" name="mode" value="both" checked><span>Both</span></label>
            <label><input type="radio" name="mode" value="calm"><span>Calm water</span></label>
            <label><input type="radio" name="mode" value="kite"><span>Wind to kitesurf</span></label>
          </div>
        </fieldset>
      </div>

      <div class="chooser-body">
        <div class="chooser-map" data-map>
          ${coastMap(first.coasts)}
          <ul class="map-key label" role="list">
            <li><span class="swatch rating-2"></span>Calmest</li>
            <li><span class="swatch rating-1"></span>Fine</li>
            <li><span class="swatch rating-0"></span>Breezy</li>
            <li><span class="swatch swatch-kite"></span>Kite spot</li>
          </ul>
          <p class="map-note label">Schematic map, not to scale</p>
        </div>
        <div aria-live="polite">${monthPanel(first)}</div>
      </div>
    </div>
    <p class="note">Weather figures are rough long-term averages for the coast; the central plateau is several degrees cooler and much wetter. Always check a current forecast, and in cyclone season follow the Mauritius Meteorological Services.</p>
  </div>
</section>

<section class="sec sec-paper" aria-labelledby="year-title">
  <div class="container">
    ${sectionHead({ index: 2, label: "Reference", title: "The whole year <em>at a glance</em>", id: "year-title" })}
    <div class="table-scroll" tabindex="0" role="region" aria-label="Month-by-month table (scrolls sideways on small screens)">
      <table class="year-table">
        <thead>
          <tr><th scope="col">Month</th><th scope="col">Season</th><th scope="col">Best coast for calm water</th><th scope="col">Kitesurfing</th><th scope="col">Sea</th></tr>
        </thead>
        <tbody>
          ${months
            .map(
              (m) => `<tr>
            <th scope="row">${m.name}</th>
            <td>${m.season}${m.cyclone ? '<span class="cyclone-flag"> · cyclone season</span>' : ""}</td>
            <td><strong>${coastNames[m.best]}</strong>. ${ORDER.filter((c) => c !== m.best && m.coasts[c] === 2).map((c) => `${coastNames[c]} also calm.`).join(" ")}</td>
            <td>${esc(m.kite.split(". ")[0].replace(/\.$/, ""))}.</td>
            <td>${m.sea}</td>
          </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="short-title">
  <div class="container tips-grid">
    <div>
      ${sectionHead({ index: 3, label: "In short", title: "Two seasons, <em>three sweet spots</em>", id: "short-title" })}
      <ol class="rows rows-tight" role="list">
        <li class="row"><span class="label row-num">May–Oct</span><h3 class="row-title">Winter</h3><p class="row-text">Cooler, drier and windier. Stay west or north for calm lagoons and sunsets; go to Le Morne, Belle Mare or Rodrigues to kitesurf. The best hiking weather of the year.</p></li>
        <li class="row"><span class="label row-num">Nov–Apr</span><h3 class="row-title">Summer</h3><p class="row-text">Hot, humid and wetter, with the warmest sea. Lighter winds make the east coast's breeze a blessing. Cyclones are possible, most likely January to March: book flexible rates and good travel insurance.</p></li>
        <li class="row"><span class="label row-num">Apr–May, Sep–Nov</span><h3 class="row-title">Sweet spots</h3><p class="row-text">Warm sea, less rain, and most coasts calm. School holidays and Christmas are the busiest and most expensive times.</p></li>
      </ol>
    </div>
    ${figure("v6dBUEPJD4s", { sizes: "(min-width: 64em) 45vw, 100vw", ratio: 4 / 5, caption: "Fishing from the beach at Le Morne." })}
  </div>
</section>
${enquiryCta("Tell us your dates and we'll suggest the right coast, or a two-centre trip that gets the best of both.")}`;

  return [
    {
      path: "/when-to-go/",
      title: "When to go: which coast, which month?",
      description: "The calmest coast of Mauritius for every month, where the wind is for kitesurfing, and what the weather is like through the year.",
      ogPhoto: "-5UEyBFp-fE",
      body,
      scripts: ["/coast-data.js", "/chooser.js"],
    },
  ];
};
