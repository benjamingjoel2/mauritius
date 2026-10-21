const { months, calmPicks, coastNames } = require("../content/months");
const { esc, figure } = require("../templates/helpers");
const { pageHero, enquiryCta } = require("../templates/components");
const { coastMap } = require("../templates/map");

const RATING = ["Breezy, choppy", "Fine", "Calmest"];
const ORDER = ["north", "east", "south", "west"];

// The month panel. Rendered at build time for the first month (so the page
// works without JavaScript) and re-rendered in the browser by chooser.js,
// which uses the same markup via data-* hooks.
function monthPanel(m) {
  return `<div class="chooser-result" data-panel>
  <p class="chooser-season"><span data-f="season">${m.season}</span> · <span data-f="wind">${m.wind}</span> winds</p>
  <h3 class="chooser-best">Best coast in <span data-f="name">${m.name}</span>: <strong data-f="bestName">${coastNames[m.best]}</strong></h3>
  <p data-f="why">${m.why}</p>

  <div class="chooser-modes">
    <section class="mode mode-calm" data-mode="calm">
      <h4>Calm water</h4>
      <ul class="coast-ratings" role="list" data-f="ratings">
        ${ORDER.map((c) => `<li class="rating-${m.coasts[c]}"><span class="coast-name">${coastNames[c]}</span> <span class="coast-rating">${RATING[m.coasts[c]]}</span></li>`).join("")}
      </ul>
      <p><strong>Try:</strong> <span data-f="picks">${calmPicks[m.best]}</span></p>
    </section>
    <section class="mode mode-kite" data-mode="kite">
      <h4>Kitesurfing</h4>
      <p data-f="kite">${m.kite}</p>
    </section>
  </div>

  <dl class="chooser-weather">
    <div><dt>Air</dt><dd data-f="air">${m.air}</dd></div>
    <div><dt>Sea</dt><dd data-f="sea">${m.sea}</dd></div>
    <div><dt>Rain</dt><dd data-f="rain">${m.rain}</dd></div>
    <div><dt>Cyclones</dt><dd data-f="cyclone">${m.cyclone ? "Cyclone season" : "Outside cyclone season"}</dd></div>
  </dl>
  <ul class="chooser-extras" data-f="extras">${m.extras.map((e) => `<li>${e}</li>`).join("")}</ul>
</div>`;
}

module.exports = () => {
  const first = months[0];
  const body = `
${pageHero({
  kicker: "When to go",
  title: "Which coast, which month?",
  lede: "There's no bad month for Mauritius, only the wrong coast. The trade winds decide which side of the island is calm, so choose your base by the month you travel.",
  photo: "-5UEyBFp-fE",
})}

<section class="section" aria-labelledby="chooser-title">
  <div class="wrap">
    <h2 id="chooser-title" class="section-title">The coast chooser</h2>
    <p class="section-lede">Pick a month, then choose whether you're after calm water or wind for kitesurfing.</p>

    <div class="chooser" data-chooser data-mode="both">
      <div class="chooser-controls">
        <fieldset class="month-picker">
          <legend>Month</legend>
          <div class="month-options">
            ${months
              .map(
                (m, i) => `<label class="month-option"><input type="radio" name="month" value="${m.key}"${i === 0 ? " checked" : ""}><span>${m.name.slice(0, 3)}<span class="visually-hidden">${m.name.slice(3)}</span></span></label>`,
              )
              .join("")}
          </div>
        </fieldset>
        <fieldset class="mode-picker">
          <legend>I want</legend>
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
          <ul class="map-key" role="list">
            <li><span class="swatch rating-2"></span>Calmest</li>
            <li><span class="swatch rating-1"></span>Fine</li>
            <li><span class="swatch rating-0"></span>Breezy</li>
            <li><span class="swatch swatch-kite"></span>Kite spot</li>
          </ul>
          <p class="map-note">Schematic map, not to scale.</p>
        </div>
        <div aria-live="polite">${monthPanel(first)}</div>
      </div>
    </div>
    <p class="note">Weather figures are rough long-term averages for the coast; the central plateau is several degrees cooler and much wetter. Always check a current forecast, and in cyclone season follow the Mauritius Meteorological Services.</p>
  </div>
</section>

<section class="section section-sand" aria-labelledby="year-title">
  <div class="wrap">
    <h2 id="year-title" class="section-title">The whole year at a glance</h2>
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

<section class="section">
  <div class="wrap split">
    <div class="prose">
      <h2>The short version</h2>
      <h3>Winter: May to October</h3>
      <p>Cooler, drier and windier. Stay west or north for calm lagoons and sunsets; go to Le Morne, Belle Mare or Rodrigues for kitesurfing. The best hiking weather of the year.</p>
      <h3>Summer: November to April</h3>
      <p>Hot, humid and wetter, with the warmest sea. Winds are lighter, so the east coast's breeze is a blessing and its lagoons are calm. Cyclones are possible, most likely from January to March: book flexible rates and good travel insurance.</p>
      <h3>Sweet spots</h3>
      <p>April and May, and September to November: warm sea, less rain, and most coasts calm. School holidays (and Christmas) are the busiest and most expensive times.</p>
    </div>
    ${figure("v6dBUEPJD4s", { sizes: "(min-width: 60em) 45vw, 100vw", ratio: 4 / 5, caption: "Fishing from the beach at Le Morne." })}
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
