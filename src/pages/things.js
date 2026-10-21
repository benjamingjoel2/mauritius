const things = require("../content/things");
const { figure } = require("../templates/helpers");
const { pageHero, enquiryCta, pad } = require("../templates/components");

module.exports = () => {
  const body = `
${pageHero({
  kicker: "Things to do",
  title: "Hikes, lagoons, <em>reefs</em> and markets",
  lede: "The best of Mauritius is mostly outdoors and mostly early in the day. Here's where to start.",
  photo: "gK_1lF9Mj2o",
})}
<nav class="chip-nav" aria-label="On this page">
  <div class="container">
    <ul role="list">
      ${things.map((t, i) => `<li><a href="#${t.slug}"><span class="label">${pad(i + 1)}</span> ${t.name}</a></li>`).join("")}
    </ul>
  </div>
</nav>
${things
  .map(
    (t, i) => `<section class="sec theme ${i % 2 ? "sec-paper" : ""}" id="${t.slug}" aria-labelledby="${t.slug}-title">
  <div class="container">
    <div class="theme-head">
      <div class="theme-intro" data-reveal>
        <p class="label"><span class="label-index">(${pad(i + 1)})</span> Things to do</p>
        <h2 class="display theme-title" id="${t.slug}-title">${t.name}</h2>
        <p class="sec-lede">${t.intro}</p>
      </div>
      ${
        t.photo
          ? figure(t.photo, { className: "theme-photo", sizes: "(min-width: 64em) 40vw, 100vw", ratio: 4 / 5 })
          : `<div class="earth-panel" aria-hidden="true"><span></span><span></span><span></span></div>`
      }
    </div>
    <ol class="rows rows-4" role="list">
      ${t.items
        .map(
          (item, n) => `<li class="row" data-reveal>
        <span class="label row-num">${pad(n + 1)}</span>
        <h3 class="row-title">${item.title}</h3>
        <p class="label row-meta"><span>${item.where}</span><span>${item.level}</span></p>
        <p class="row-text">${item.text}</p>
      </li>`,
        )
        .join("")}
    </ol>
    <p class="note note-box"><span class="label">Good to know</span> ${t.note}</p>
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
