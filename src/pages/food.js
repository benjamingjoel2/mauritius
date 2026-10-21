const { trail, roots, traditions } = require("../content/food");
const { figure } = require("../templates/helpers");
const { pageHero, sectionHead, enquiryCta, pad } = require("../templates/components");

const tag = (r) => `<span class="tag" style="--tag: var(--${roots[r].color})">${roots[r].label}</span>`;

// Suggested times of day. Illustrative only; see whenDetail for the advice.
const TIMES = ["08:00", "10:30", "12:30", "15:30", "16:30"];

module.exports = () => {
  const body = `
${pageHero({
  kicker: "Food",
  title: "An island <em>you can taste</em>",
  lede: "Indian, Creole, Chinese and French cooking have been borrowing from each other in Mauritius for nearly two centuries. The best of it is cheap, quick and eaten standing up.",
  photo: "Iiw8FxkZHfI",
})}

<section class="sec" aria-labelledby="kitchens-title">
  <div class="container">
    ${sectionHead({ index: 1, label: "Roots", title: "Four kitchens, <em>one island</em>", id: "kitchens-title" })}
    <ol class="columns-4" role="list">
      ${traditions
        .map(
          (t, i) => `<li class="col-item" style="--accent: var(--${t.color})">
        <span class="label">${pad(i + 1)}</span>
        <h3 class="col-title">${t.title}</h3>
        <p>${t.text}</p>
      </li>`,
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="sec sec-dark" id="trail" aria-labelledby="trail-title">
  <div class="container">
    ${sectionHead({ index: 2, label: "Signature trail", title: "The street-food <em>trail</em>", id: "trail-title", lede: "Five dishes in the order you'd eat them through a day. Each one tells part of the island's story: who arrived, when, and what they cooked. Times are suggestions." })}
    <p class="legend" aria-label="Key to roots">${Object.keys(roots).map(tag).join("")}</p>
    <ol class="trail" role="list">
      ${trail
        .map(
          (d, i) => `<li class="trail-stop" id="${d.slug}">
        <div class="trail-time">
          <span class="display trail-clock">${TIMES[i]}</span>
          <span class="label">${pad(i + 1)} · ${d.when}</span>
        </div>
        <article class="trail-card">
          <h3 class="display trail-name">${d.name}</h3>
          <p class="label trail-say">Say “${d.say}”</p>
          <p class="tags">${d.roots.map(tag).join("")}</p>
          <dl class="trail-facts">
            <div><dt class="label">What it is</dt><dd>${d.what}</dd></div>
            <div><dt class="label">Where it comes from</dt><dd>${d.story}</dd></div>
            <div><dt class="label">When to eat it</dt><dd>${d.whenDetail}</dd></div>
            <div><dt class="label">Where to find it</dt><dd>${d.where}</dd></div>
          </dl>
        </article>
      </li>`,
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="sec" aria-labelledby="tips-title">
  <div class="container tips-grid">
    <div>
      ${sectionHead({ index: 3, label: "Practical", title: "Eating well, <em>eating safely</em>", id: "tips-title" })}
      <ol class="rows rows-tight" role="list">
        <li class="row"><span class="label row-num">01</span><p class="row-text">Busy stalls turn food over fast. Follow the queue.</p></li>
        <li class="row"><span class="label row-num">02</span><p class="row-text">Chilli usually comes on the side: ask for <i>enn ti pe</i> (a little) if you're unsure.</p></li>
        <li class="row"><span class="label row-num">03</span><p class="row-text">Carry small notes in Mauritian rupees.</p></li>
        <li class="row"><span class="label row-num">04</span><p class="row-text">Dholl puri, farata with bean curry, gateau piment and alouda are often meat-free. Ask to be sure.</p></li>
        <li class="row"><span class="label row-num">05</span><p class="row-text">Street food is a daytime thing. In the evening, look for family-run restaurants.</p></li>
      </ol>
      <a class="arrow-link" href="/journal/street-food-day-port-louis/">Read: a day of eating in Port Louis <span aria-hidden="true">→</span></a>
    </div>
    ${figure("BvxRDzTXqjc", { sizes: "(min-width: 64em) 45vw, 100vw", ratio: 4 / 5 })}
  </div>
</section>
${enquiryCta("Want a guided food day in Port Louis, or a cooking class in a family home? Tell us what you'd like.")}`;

  return [
    {
      path: "/food/",
      title: "Food and the street-food trail",
      description: "Dholl puri, gateau piment, farata, mine frit and alouda: what they are, where they come from and when to eat them.",
      ogPhoto: "Iiw8FxkZHfI",
      body,
    },
  ];
};
