const config = require("../../site.config");
const regions = require("../content/regions");
const stays = require("../content/stays");
const journal = require("../content/journal");
const photos = require("../content/photos");
const { esc, figure, formatDate, credit, img } = require("../templates/helpers");
const { pageHero, sectionHead, enquiryCta, card, pad } = require("../templates/components");
const { telHref } = require("../templates/layout");

const regionName = (slug) => regions.find((r) => r.slug === slug).name;

function contactList(contact, { whatsapp = true } = {}) {
  return `<dl class="contact-list">
    <div><dt class="label">Email</dt><dd><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></dd></div>
    <div><dt class="label">Phone</dt><dd><a href="${telHref(contact.phone)}">${esc(contact.phone)}</a></dd></div>
    ${whatsapp ? `<div><dt class="label">WhatsApp</dt><dd>${esc(contact.whatsapp)}</dd></div>` : ""}
    <div><dt class="label">Address</dt><dd>${esc(contact.address)}</dd></div>
    <div><dt class="label">Hours</dt><dd>${esc(contact.hours)}</dd></div>
  </dl>`;
}

function staysPage() {
  const body = `
${pageHero({
  kicker: "Stays",
  title: "Small places <em>to stay</em>",
  lede: "Guesthouses, villas and lodges with a sense of place, chosen for the coast and the season rather than the size of the pool.",
})}
<section class="sec">
  <div class="container">
    <div class="notice" role="note">
      <p class="label">Please note</p>
      <h2 class="notice-title">These are placeholder listings</h2>
      <p>The names and descriptions below are samples that show the kind of places we'll recommend. They aren't real properties. We'll replace them with partners we've visited before taking bookings.</p>
    </div>
    <ol class="stays" role="list">
      ${stays
        .map(
          (s, i) => `<li class="stay">
        <p class="label stay-top"><span>${pad(i + 1)}</span><span>${esc(regionName(s.region))} · ${esc(s.area)}</span></p>
        <h3 class="display stay-name">${esc(s.name)}</h3>
        <p class="label stay-type">${esc(s.type)} · ${esc(s.sleeps)}</p>
        <p>${esc(s.text)}</p>
        <p class="tags">${s.good.map((g) => `<span class="tag tag-plain">${esc(g)}</span>`).join("")}</p>
        <a class="arrow-link" href="/regions/${s.region}/">${esc(regionName(s.region).replace(/^The /, ""))} <span aria-hidden="true">→</span></a>
      </li>`,
        )
        .join("")}
    </ol>
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
  title: `About <em>${esc(brand.name)}</em>`,
  lede: esc(brand.pitch),
  photo: "IfRThYDUjCE",
})}
<section class="sec">
  <div class="container intro-grid">
    <p class="label"><span class="label-index">(01)</span> The name</p>
    <div>
      <p class="intro-big">${esc(brand.nameStory)}</p>
    </div>
  </div>
</section>
<section class="sec sec-paper">
  <div class="container">
    ${sectionHead({ index: 2, label: "What we do", title: "Trips planned around <em>what you love</em>" })}
    <div class="two-col">
      <p>Most holidays in Mauritius start and end at a resort. Ours start with a question: what do you actually like doing? Then we plan the trip around it: the right coast for the month, a guide for the hike, a table at a family restaurant, and enough free time to do nothing at all.</p>
      <p>We plan trips for couples and families, on the main island and in Rodrigues. We're a new company, so you won't find reviews or awards here yet. When we have them, they'll be real.</p>
    </div>
    <ol class="rows" role="list">
      <li class="row"><span class="label row-num">01</span><h3 class="row-title">Local first</h3><p class="row-text">Smaller, locally owned places to stay where we can.</p></li>
      <li class="row"><span class="label row-num">02</span><h3 class="row-title">By the rules</h3><p class="row-text">Guides and boat operators who follow the rules on marine parks, dolphins and whales.</p></li>
      <li class="row"><span class="label row-num">03</span><h3 class="row-title">Honest weather</h3><p class="row-text">Straight advice on the seasons, including when not to go somewhere.</p></li>
      <li class="row"><span class="label row-num">04</span><h3 class="row-title">Real photos</h3><p class="row-text">Every photo comes from Unsplash, is credited, and is only used where its recorded location matches the place described. <a href="/credits/">See all credits</a>.</p></li>
    </ol>
  </div>
</section>
<section class="sec">
  <div class="container tips-grid">
    <div>
      ${sectionHead({ index: 3, label: "Contact", title: "Say <em>hello</em>" })}
      ${contactList(contact)}
      <a class="pill pill-solid" href="/enquire/">Send an enquiry <span aria-hidden="true">→</span></a>
    </div>
    ${figure("vp1El4RAOmM", { sizes: "(min-width: 64em) 45vw, 100vw", ratio: 4 / 5 })}
  </div>
</section>`;
  return { path: "/about/", title: "About", description: brand.pitch, ogPhoto: "IfRThYDUjCE", body };
}

function renderBlock(block) {
  if (typeof block === "string") return `<p>${block}</p>`;
  if (block.h) return `<h2>${block.h}</h2>`;
  if (block.list) return `<ul>${block.list.map((li) => `<li>${li}</li>`).join("")}</ul>`;
  if (block.photo) return figure(block.photo, { className: "post-photo", sizes: "(min-width: 64em) 56rem, 100vw" });
  throw new Error(`Unknown journal block: ${JSON.stringify(block)}`);
}

function journalPages() {
  const index = {
    path: "/journal/",
    title: "Journal",
    description: "Stories and practical guides to Mauritius and Rodrigues beyond the resort.",
    body: `
${pageHero({ kicker: "Journal", title: "Stories <em>and guides</em>", lede: "Practical, seasonal advice for travelling Mauritius and Rodrigues beyond the resort." })}
<section class="sec sec-tight" aria-labelledby="posts-list">
  <div class="container">
    <h2 id="posts-list" class="visually-hidden">All stories</h2>
    <div class="cards">
      ${journal
        .map((p, i) => card({ href: `/journal/${p.slug}/`, photo: p.photo, title: esc(p.title), kicker: formatDate(p.date), index: i + 1, text: esc(p.summary) }))
        .join("")}
    </div>
  </div>
</section>`,
  };

  const posts = journal.map((p) => {
    const others = journal.filter((o) => o.slug !== p.slug);
    return {
      path: `/journal/${p.slug}/`,
      title: p.title,
      description: p.summary,
      ogPhoto: p.photo,
      body: `
<article class="post">
  ${pageHero({ kicker: "Journal", title: esc(p.title), lede: esc(p.summary), photo: p.photo, meta: [`<time datetime="${p.date}">${formatDate(p.date)}</time>`], size: "hero-post" })}
  <div class="sec">
    <div class="container post-body prose">
      ${p.body.map(renderBlock).join("\n")}
    </div>
  </div>
</article>
<section class="sec sec-paper" aria-labelledby="more-title">
  <div class="container">
    ${sectionHead({ label: "Keep reading", title: "More <em>from the journal</em>", id: "more-title", link: { href: "/journal/", text: "All stories" } })}
    <div class="cards cards-2">
      ${others.map((o) => card({ href: `/journal/${o.slug}/`, photo: o.photo, title: esc(o.title), kicker: formatDate(o.date), text: esc(o.summary), ratio: 3 / 2 })).join("")}
    </div>
  </div>
</section>
${enquiryCta()}`,
    };
  });

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
  const formAttrs = config.enquiry.endpoint
    ? `action="${esc(config.enquiry.endpoint)}" method="post"`
    : `action="mailto:${esc(contact.email)}" method="post" enctype="text/plain"`;

  const body = `
${pageHero({
  kicker: "Enquire",
  title: "Plan <em>a trip</em>",
  lede: "Tell us a little about who's travelling and what you enjoy. We'll reply within two working days with ideas, not a sales pitch.",
})}
<section class="sec sec-tight">
  <div class="container form-layout">
    <form class="enquiry-form" data-enquiry data-endpoint="${esc(config.enquiry.endpoint)}" data-email="${esc(contact.email)}" ${formAttrs}>
      <p class="form-intro label">Fields marked <span aria-hidden="true">*</span><span class="visually-hidden">with an asterisk</span> are required</p>
      <div class="form-error" role="alert" data-errors hidden></div>

      <fieldset>
        <legend><span class="label">01</span> About you</legend>
        <div class="field">
          <label for="name">Your name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" autocomplete="name" required>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="email">Email <span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="phone">Phone or WhatsApp <span class="optional">(optional)</span></label>
            <input id="phone" name="phone" type="tel" autocomplete="tel">
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend><span class="label">02</span> Your trip</legend>
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
        <legend><span class="label">03</span> What would you like to do?</legend>
        <div class="checks">
          ${interests.map((i, n) => `<label class="check-chip"><input type="checkbox" name="interests" value="${esc(i)}" id="interest-${n}"><span>${esc(i)}</span></label>`).join("")}
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
        <span>I agree that ${esc(config.brand.name)} can use these details to reply to my enquiry. <span aria-hidden="true">*</span></span>
      </label>

      <button class="pill pill-solid pill-lg" type="submit">Send enquiry <span aria-hidden="true">→</span></button>
      <p class="hint" data-mailto-hint${config.enquiry.endpoint ? " hidden" : ""}>Sending opens your email app with your enquiry filled in, addressed to ${esc(contact.email)}.</p>
    </form>

    <aside class="form-aside" aria-label="Other ways to reach us">
      <p class="label">Prefer to talk?</p>
      ${contactList(contact)}
    </aside>
  </div>
</section>`;

  const thanks = {
    path: "/enquire/thanks/",
    title: "Thank you",
    description: "Your enquiry has been sent.",
    noindex: true,
    body: `
${pageHero({
  kicker: "Enquiry",
  title: "Thank <em>you</em>",
  lede: "We've got your enquiry and will reply within two working days.",
  actions: `<p class="page-head-links">Meanwhile: <a href="/when-to-go/">which coast suits your month</a> · <a href="/food/#trail">the street-food trail</a> · <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></p>`,
})}`,
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
  title: "Photo <em>credits</em>",
  lede: "All photos come from Unsplash. We only use a photo where the location its photographer recorded on Unsplash matches the place it illustrates.",
})}
<section class="sec sec-tight">
  <div class="container">
    <ol class="credits-grid" role="list">
      ${list
        .map(
          (p, i) => `<li>
        ${img(p.id, { ratio: 4 / 5, sizes: "(min-width: 64em) 22vw, (min-width: 40em) 45vw, 100vw" })}
        <p class="label credit-index">${pad(i + 1)}</p>
        <p class="credit-place">${esc(p.location)}</p>
        <p class="credit">${credit(p.id)} · <a href="${esc(p.page)}">View on Unsplash</a></p>
      </li>`,
        )
        .join("")}
    </ol>
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
${pageHero({
  kicker: "404",
  title: "Drifted out <em>past the reef</em>",
  lede: "That page may have moved, or the link may be wrong.",
  actions: `<p class="page-head-links">Try the <a href="/">home page</a> · <a href="/regions/">regions</a> · <a href="/when-to-go/">coast chooser</a></p>`,
})}`,
  };
}

module.exports = () => [staysPage(), aboutPage(), ...journalPages(), ...enquirePage(), creditsPage(), notFoundPage()];
