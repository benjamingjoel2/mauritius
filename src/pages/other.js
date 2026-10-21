const config = require("../../site.config");
const regions = require("../content/regions");
const stays = require("../content/stays");
const journal = require("../content/journal");
const photos = require("../content/photos");
const { esc, figure, formatDate, credit, img } = require("../templates/helpers");
const { pageHero, enquiryCta, card } = require("../templates/components");
const { telHref } = require("../templates/layout");

const regionName = (slug) => regions.find((r) => r.slug === slug).name;

function staysPage() {
  const body = `
${pageHero({
  kicker: "Stays",
  title: "Small places to stay",
  lede: "Guesthouses, villas and lodges with a sense of place, chosen for the coast and the season rather than the size of the pool.",
})}
<section class="section">
  <div class="wrap">
    <div class="notice" role="note">
      <h2>These are placeholder listings</h2>
      <p>The names and descriptions below are samples that show the kind of places we'll recommend. They aren't real properties. We'll replace them with partners we've visited before taking bookings.</p>
    </div>
    <ul class="stays" role="list">
      ${stays
        .map(
          (s) => `<li class="stay">
        <p class="card-kicker">${esc(regionName(s.region))} · ${esc(s.area)}</p>
        <h3>${esc(s.name)}</h3>
        <p class="stay-type">${esc(s.type)} · ${esc(s.sleeps)}</p>
        <p>${esc(s.text)}</p>
        <p class="tags">${s.good.map((g) => `<span class="tag tag-plain">${esc(g)}</span>`).join("")}</p>
        <a href="/regions/${s.region}/">About the ${esc(regionName(s.region).replace(/^The /, ""))}${s.region === "rodrigues" ? "" : " region"}</a>
      </li>`,
        )
        .join("")}
    </ul>
  </div>
</section>
${enquiryCta("Tell us how many of you are travelling and what you'd like nearby, and we'll suggest places to stay.")}`;
  return {
    path: "/stays/",
    title: "Stays",
    description: "Small guesthouses, villas and lodges around Mauritius and Rodrigues (placeholder listings).",
    body,
  };
}

function aboutPage() {
  const { brand, contact } = config;
  const body = `
${pageHero({
  kicker: "About",
  title: `About ${esc(brand.name)}`,
  lede: esc(brand.pitch),
  photo: "IfRThYDUjCE",
})}
<section class="section">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>The name</h2>
      <p>${esc(brand.nameStory)}</p>
      <h2>What we do</h2>
      <p>Most holidays in Mauritius start and end at a resort. Ours start with a question: what do you actually like doing? Then we plan the trip around it: the right coast for the month, a guide for the hike, a table at a family restaurant, and enough free time to do nothing at all.</p>
      <p>We plan trips for couples and families, on the main island and in Rodrigues. We're a new company, so you won't find reviews or awards here yet. When we have them, they'll be real.</p>
      <h2>How we choose</h2>
      <ul>
        <li>Smaller, locally owned places to stay where we can.</li>
        <li>Guides and boat operators who follow the rules on marine parks, dolphins and whales.</li>
        <li>Honest advice on the weather, including when not to go somewhere.</li>
      </ul>
      <h2>About the photos</h2>
      <p>Every photo on this site comes from Unsplash and is credited to its photographer. We only use a photo where the location recorded on Unsplash matches the place we're describing. <a href="/credits/">See all photo credits</a>.</p>
    </div>
    <aside class="fact-box" aria-label="Contact details">
      <h2>Contact</h2>
      <dl>
        <dt>Email</dt><dd><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></dd>
        <dt>Phone</dt><dd><a href="${telHref(contact.phone)}">${esc(contact.phone)}</a></dd>
        <dt>WhatsApp</dt><dd>${esc(contact.whatsapp)}</dd>
        <dt>Address</dt><dd>${esc(contact.address)}</dd>
        <dt>Hours</dt><dd>${esc(contact.hours)}</dd>
      </dl>
      <a class="button" href="/enquire/">Send an enquiry</a>
    </aside>
  </div>
</section>`;
  return { path: "/about/", title: "About", description: brand.pitch, ogPhoto: "IfRThYDUjCE", body };
}

function renderBlock(block) {
  if (typeof block === "string") return `<p>${block}</p>`;
  if (block.h) return `<h2>${block.h}</h2>`;
  if (block.list) return `<ul>${block.list.map((li) => `<li>${li}</li>`).join("")}</ul>`;
  if (block.photo) return figure(block.photo, { sizes: "(min-width: 48em) 44rem, 100vw" });
  throw new Error(`Unknown journal block: ${JSON.stringify(block)}`);
}

function journalPages() {
  const index = {
    path: "/journal/",
    title: "Journal",
    description: "Stories and practical guides to Mauritius and Rodrigues beyond the resort.",
    body: `
${pageHero({ kicker: "Journal", title: "Stories and guides", lede: "Practical, seasonal advice for travelling Mauritius and Rodrigues beyond the resort." })}
<section class="section" aria-labelledby="posts-list">
  <div class="wrap">
    <h2 id="posts-list" class="visually-hidden">All stories</h2>
    <div class="grid grid-3">
      ${journal
        .map((p) => card({ href: `/journal/${p.slug}/`, photo: p.photo, title: esc(p.title), kicker: formatDate(p.date), text: esc(p.summary) }))
        .join("")}
    </div>
  </div>
</section>`,
  };

  const posts = journal.map((p) => ({
    path: `/journal/${p.slug}/`,
    title: p.title,
    description: p.summary,
    ogPhoto: p.photo,
    body: `
<article class="post">
  ${pageHero({ kicker: `Journal · <time datetime="${p.date}">${formatDate(p.date)}</time>`, title: esc(p.title), lede: esc(p.summary), photo: p.photo })}
  <div class="section">
    <div class="wrap prose post-body">
      ${p.body.map(renderBlock).join("\n")}
      <p class="post-back"><a href="/journal/">Back to the journal</a></p>
    </div>
  </div>
</article>
${enquiryCta()}`,
  }));

  return [index, ...posts];
}

function enquirePage() {
  const { contact } = config;
  const interests = [
    "Street food and cooking",
    "Hiking",
    "Culture and festivals",
    "Quiet beaches",
    "Snorkelling",
    "Diving",
    "Kitesurfing",
    "Tea and rum estates",
    "Rodrigues",
  ];
  const body = `
${pageHero({
  kicker: "Enquire",
  title: "Plan a trip",
  lede: "Tell us a little about who's travelling and what you enjoy. We'll reply within two working days with ideas, not a sales pitch.",
})}
<section class="section">
  <div class="wrap form-layout">
    <form class="enquiry-form" data-enquiry data-endpoint="${esc(config.enquiry.endpoint)}" data-email="${esc(contact.email)}" ${config.enquiry.endpoint ? `action="${esc(config.enquiry.endpoint)}" method="post"` : `action="mailto:${esc(contact.email)}" method="post" enctype="text/plain"`}>
      <p class="form-intro">Fields marked <span aria-hidden="true">*</span><span class="visually-hidden">with an asterisk</span> are required.</p>
      <div class="form-error" role="alert" data-errors hidden></div>

      <fieldset>
        <legend>About you</legend>
        <div class="field">
          <label for="name">Your name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="field">
          <label for="phone">Phone or WhatsApp <span class="optional">(optional)</span></label>
          <input id="phone" name="phone" type="tel" autocomplete="tel">
        </div>
      </fieldset>

      <fieldset>
        <legend>Your trip</legend>
        <div class="field-row">
          <div class="field">
            <label for="month">When would you like to travel? <span aria-hidden="true">*</span></label>
            <input id="month" name="month" type="month" required aria-describedby="month-hint">
            <p class="hint" id="month-hint">Roughly is fine. Not sure? Pick any month and tell us below.</p>
          </div>
          <div class="field">
            <label for="nights">Nights</label>
            <input id="nights" name="nights" type="number" min="1" max="60" inputmode="numeric" value="10">
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="adults">Adults <span aria-hidden="true">*</span></label>
            <input id="adults" name="adults" type="number" min="1" max="20" inputmode="numeric" value="2" required>
          </div>
          <div class="field">
            <label for="children">Children</label>
            <input id="children" name="children" type="number" min="0" max="20" inputmode="numeric" value="0">
          </div>
        </div>
        <div class="field">
          <label for="ages">Children's ages <span class="optional">(optional)</span></label>
          <input id="ages" name="ages" type="text" aria-describedby="ages-hint">
          <p class="hint" id="ages-hint">Helps us suggest the right beaches and walks.</p>
        </div>
        <div class="field">
          <label for="budget">Budget per person, excluding flights</label>
          <select id="budget" name="budget">
            <option value="">Prefer not to say</option>
            <option>Under €1,500</option>
            <option>€1,500 to €3,000</option>
            <option>€3,000 to €5,000</option>
            <option>Over €5,000</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>What would you like to do?</legend>
        <div class="checks">
          ${interests.map((i, n) => `<label class="check"><input type="checkbox" name="interests" value="${esc(i)}" id="interest-${n}"> ${esc(i)}</label>`).join("")}
        </div>
      </fieldset>

      <div class="field">
        <label for="message">Anything else? <span class="optional">(optional)</span></label>
        <textarea id="message" name="message" rows="5"></textarea>
      </div>

      <div class="field field-hp" aria-hidden="true">
        <label for="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
      </div>

      <label class="check check-consent">
        <input type="checkbox" name="consent" id="consent" required>
        I agree that ${esc(config.brand.name)} can use these details to reply to my enquiry. <span aria-hidden="true">*</span>
      </label>

      <button class="button" type="submit">Send enquiry</button>
      <p class="hint" data-mailto-hint${config.enquiry.endpoint ? " hidden" : ""}>Sending opens your email app with your enquiry filled in, addressed to ${esc(contact.email)}.</p>
    </form>

    <aside class="fact-box" aria-label="Other ways to reach us">
      <h2>Prefer to talk?</h2>
      <dl>
        <dt>Email</dt><dd><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></dd>
        <dt>Phone</dt><dd><a href="${telHref(contact.phone)}">${esc(contact.phone)}</a></dd>
        <dt>WhatsApp</dt><dd>${esc(contact.whatsapp)}</dd>
        <dt>Hours</dt><dd>${esc(contact.hours)}</dd>
      </dl>
    </aside>
  </div>
</section>`;

  const thanks = {
    path: "/enquire/thanks/",
    title: "Thank you",
    description: "Your enquiry has been sent.",
    noindex: true,
    body: `
${pageHero({ kicker: "Enquiry", title: "Thank you", lede: "We've got your enquiry and will reply within two working days." })}
<section class="section"><div class="wrap prose">
  <p>In the meantime, have a look at <a href="/when-to-go/">which coast suits your month</a> or <a href="/food/#trail">the street-food trail</a>.</p>
  <p>If you don't hear from us, email <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>.</p>
</div></section>`,
  };

  return [
    {
      path: "/enquire/",
      title: "Plan a trip",
      description: `Send ${config.brand.name} an enquiry about a trip to Mauritius or Rodrigues.`,
      body,
      scripts: ["/enquiry.js"],
    },
    thanks,
  ];
}

function creditsPage() {
  const list = Object.values(photos).sort((a, b) => a.location.localeCompare(b.location));
  const body = `
${pageHero({
  kicker: "Credits",
  title: "Photo credits",
  lede: "All photos come from Unsplash. We only use a photo where the location its photographer recorded on Unsplash matches the place it illustrates.",
})}
<section class="section">
  <div class="wrap">
    <ul class="credits-grid" role="list">
      ${list
        .map(
          (p) => `<li>
        ${img(p.id, { ratio: 3 / 2, sizes: "(min-width: 60em) 22vw, (min-width: 40em) 45vw, 100vw" })}
        <p><strong>${esc(p.location)}</strong></p>
        <p class="credit">${credit(p.id)}</p>
        <p class="credit"><a href="${esc(p.page)}">View on Unsplash</a></p>
      </li>`,
        )
        .join("")}
    </ul>
  </div>
</section>`;
  return { path: "/credits/", title: "Photo credits", description: "Credits for the Unsplash photos used on this site.", body };
}

function notFoundPage() {
  return {
    path: "/404",
    file: "404.html",
    title: "Page not found",
    noindex: true,
    body: `
${pageHero({ kicker: "404", title: "That page has drifted out past the reef", lede: "It may have moved, or the link may be wrong." })}
<section class="section"><div class="wrap prose">
  <p>Try the <a href="/">home page</a>, the <a href="/regions/">regions</a> or the <a href="/when-to-go/">coast chooser</a>.</p>
</div></section>`,
  };
}

module.exports = () => [staysPage(), aboutPage(), ...journalPages(), ...enquirePage(), creditsPage(), notFoundPage()];
