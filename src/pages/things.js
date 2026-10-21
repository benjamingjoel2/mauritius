const things = require("../content/things");
const { figure } = require("../templates/helpers");
const { pageHero, enquiryCta } = require("../templates/components");

module.exports = () => {
  const body = `
${pageHero({
  kicker: "Things to do",
  title: "Hikes, lagoons, reefs, estates and markets",
  lede: "The best of Mauritius is mostly outdoors and mostly early in the day. Here's where to start.",
  photo: "gK_1lF9Mj2o",
})}
<nav class="section-nav" aria-label="On this page">
  <div class="wrap">
    <ul role="list">
      ${things.map((t) => `<li><a href="#${t.slug}">${t.name}</a></li>`).join("")}
    </ul>
  </div>
</nav>
${things
  .map(
    (t, i) => `<section class="section ${i % 2 ? "section-sand" : ""}" id="${t.slug}" aria-labelledby="${t.slug}-title">
  <div class="wrap">
    <div class="split ${t.photo ? "" : "split-text"}">
      <div>
        <p class="kicker kicker-${t.accent}">${String(i + 1).padStart(2, "0")}</p>
        <h2 id="${t.slug}-title">${t.name}</h2>
        <p class="section-lede">${t.intro}</p>
      </div>
      ${
        t.photo
          ? figure(t.photo, { sizes: "(min-width: 60em) 45vw, 100vw", ratio: 3 / 2 })
          : `<div class="earth-panel" aria-hidden="true"><span></span><span></span><span></span></div>`
      }
    </div>
    <ul class="activity-list" role="list">
      ${t.items
        .map(
          (item) => `<li class="activity" style="--accent: var(--${t.accent})">
        <h3>${item.title}</h3>
        <p class="activity-meta"><span>${item.where}</span><span>${item.level}</span></p>
        <p>${item.text}</p>
      </li>`,
        )
        .join("")}
    </ul>
    <p class="note">${t.note}</p>
  </div>
</section>`,
  )
  .join("")}
${enquiryCta("Tell us which of these you'd like to do and we'll plan the days around the weather.")}`;

  return [
    {
      path: "/things-to-do/",
      title: "Things to do",
      description: "Hiking, lagoons and snorkelling, diving, tea and rum estates, and markets in Mauritius and Rodrigues.",
      ogPhoto: "gK_1lF9Mj2o",
      body,
    },
  ];
};
