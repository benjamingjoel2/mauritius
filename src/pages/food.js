const { trail, roots, traditions } = require("../content/food");
const { figure } = require("../templates/helpers");
const { pageHero, enquiryCta } = require("../templates/components");

const tag = (r) => `<span class="tag" style="--tag: var(--${roots[r].color})">${roots[r].label}</span>`;

module.exports = () => {
  const body = `
${pageHero({
  kicker: "Food",
  title: "An island you can taste",
  lede: "Indian, Creole, Chinese and French cooking have been borrowing from each other in Mauritius for nearly two centuries. The best of it is cheap, quick and eaten standing up.",
  photo: "Iiw8FxkZHfI",
})}

<section class="section">
  <div class="wrap">
    <h2 class="section-title">Four kitchens, one island</h2>
    <ul class="traditions" role="list">
      ${traditions
        .map((t) => `<li style="--accent: var(--${t.color})"><h3>${t.title}</h3><p>${t.text}</p></li>`)
        .join("")}
    </ul>
  </div>
</section>

<section class="section section-sand" id="trail" aria-labelledby="trail-title">
  <div class="wrap">
    <p class="kicker">Signature trail</p>
    <h2 id="trail-title">The street-food trail</h2>
    <p class="section-lede">Five dishes in the order you'd eat them through a day. Each one tells part of the island's story: who arrived, when, and what they cooked.</p>
    <p class="legend" aria-label="Key to roots">${Object.keys(roots).map(tag).join("")}</p>
    <ol class="trail" role="list">
      ${trail
        .map(
          (d, i) => `<li class="trail-stop" id="${d.slug}">
        <div class="trail-marker" aria-hidden="true"><span>${i + 1}</span></div>
        <article class="trail-card">
          <header>
            <p class="trail-time">${d.when}</p>
            <h3>${d.name} <span class="say">(say <i>${d.say}</i>)</span></h3>
            <p class="tags">${d.roots.map(tag).join("")}</p>
          </header>
          <dl class="trail-facts">
            <dt>What it is</dt><dd>${d.what}</dd>
            <dt>Where it comes from</dt><dd>${d.story}</dd>
            <dt>When to eat it</dt><dd>${d.whenDetail}</dd>
            <dt>Where to find it</dt><dd>${d.where}</dd>
          </dl>
        </article>
      </li>`,
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      <h2>Eating well, eating safely</h2>
      <ul class="checklist">
        <li>Busy stalls turn food over fast. Follow the queue.</li>
        <li>Chilli is served on the side more often than not: ask for <i>enn ti pe</i> (a little) if you're unsure.</li>
        <li>Carry small notes in Mauritian rupees.</li>
        <li>Many vegetarian options: dholl puri, farata with bean curry, gateau piment and alouda are often meat-free. Ask to be sure.</li>
        <li>Street food is a daytime thing. In the evening, look for family-run restaurants instead.</li>
      </ul>
      <p><a href="/journal/street-food-day-port-louis/">Read: how to eat your way through a day in Port Louis</a></p>
    </div>
    ${figure("BvxRDzTXqjc", { sizes: "(min-width: 60em) 45vw, 100vw", ratio: 3 / 2 })}
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
