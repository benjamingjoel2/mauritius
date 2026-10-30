/**
 * Legal page copy: Privacy Policy, Booking Terms and Cookie Policy.
 * Written for a tailor-made, enquiry-led travel service. Everything brand-specific
 * comes from the options, so the text stays correct when the config changes.
 *
 * legalPages({ brand, email, address, updated, storage, enquiryNote, processors })
 *   storage:    [{ name, kind, purpose, duration }]  every cookie / browser-storage item the site really uses
 *   enquiryNote: one sentence on how the enquiry form is delivered
 *   processors: list of service providers that handle personal data (hosting, email…)
 *   thirdParty: sentence on third-party requests (fonts, images) and whether they set cookies
 * Returns { privacy, terms, cookies }, each { title, intro, sections: [{ h, html }] }.
 */
function legalPages({ brand, email, address, updated, storage = [], enquiryNote = '', processors = [], thirdParty = "Fonts and images are served from this website's own domain, so no third-party service sets cookies when you browse it." }) {
  const mail = `<a href="mailto:${email}">${email}</a>`;
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

  const privacy = {
    title: 'Privacy Policy',
    intro: `This policy explains what personal information ${brand} collects when you use this website or plan a trip with us, why we collect it, and the choices you have. Last updated ${updated}.`,
    sections: [
      { h: 'Who we are', html: `<p>${brand} plans tailor-made trips. For the purposes of data protection law we are the controller of the personal information described here. You can reach us at ${mail} or by post at ${address}.</p>` },
      { h: 'What we collect', html: list([
        '<strong>Enquiry details</strong> you send us: your name, email address, phone number if you choose to give it, travel dates, the number and ages of travellers, your interests, budget range and any other notes.',
        '<strong>Correspondence</strong>: the emails and messages we exchange while planning your trip.',
        '<strong>Booking details</strong>, if you go ahead: the names, dates of birth, passport details, dietary or medical needs and emergency contacts that suppliers need to deliver your trip.',
        '<strong>Technical information</strong>: our hosting provider records standard server logs (IP address, browser type, pages requested, time) to keep the site secure and working.',
      ]) },
      { h: 'How we use it', html: list([
        'To answer your enquiry and prepare a proposal (steps taken at your request before a contract).',
        'To book and run your trip with hotels, guides, drivers, airlines and other suppliers (performance of our contract with you).',
        'To meet legal, tax and accounting obligations (legal obligation).',
        'To keep the website secure and fix problems (our legitimate interests).',
      ]) + '<p>We do not sell your information, we do not use it for advertising profiles, and we only send you news by email if you have asked us to.</p>' },
      { h: 'Health and other sensitive information', html: '<p>If you tell us about a medical condition, mobility need or dietary requirement, we use it only to make the trip work for you and share it only with the suppliers who need it. We ask for your consent when we collect it, and you can withdraw that consent at any time.</p>' },
      { h: 'Who we share it with', html: `<p>We share personal information only where needed:</p>` + list([
        'with the suppliers who deliver your trip (accommodation, transport, guides, activity providers), some of whom are outside your country;',
        ...processors.map((p) => p),
        'with professional advisers, insurers or authorities where the law requires it.',
      ]) + '<p>Where information goes to another country, we rely on the safeguards available under applicable law, or it is necessary to deliver the trip you have asked for.</p>' },
      { h: 'How long we keep it', html: '<p>Enquiries that do not turn into a booking are deleted within two years of our last contact. Booking records are kept for as long as tax and consumer law require (usually up to seven years after you travel), then deleted.</p>' },
      { h: 'Your rights', html: `<p>Depending on where you live, you can ask us to give you a copy of your information, correct it, delete it, restrict or object to how we use it, or transfer it to someone else, and you can withdraw consent at any time. Email ${mail} and we will reply within one month. You also have the right to complain to your local data protection authority.</p>` },
      { h: 'Security', html: '<p>The site is served over HTTPS. Access to enquiry and booking information is limited to the people who plan your trip.</p>' },
      { h: 'Cookies', html: '<p>See our <a href="COOKIES_URL">Cookie Policy</a> for the small amount of browser storage this site uses.</p>' },
      { h: 'Changes', html: '<p>If we change this policy we will update the date at the top of this page.</p>' },
    ],
  };

  const terms = {
    title: 'Booking Terms',
    intro: `These terms apply when you plan and book a tailor-made trip with ${brand}. Please read them before you confirm a booking. Last updated ${updated}.`,
    sections: [
      { h: 'How we work', html: `<p>${brand} designs trips around each traveller. Everything starts with an enquiry: you tell us what you are looking for and we prepare a proposal. Nothing on this website is an offer to sell a fixed product, and no booking exists until we have both confirmed it in writing.</p>` },
      { h: 'Enquiries and proposals', html: '<p>An enquiry is free and does not commit you to anything. Our proposals describe the itinerary, what is included and the price for your dates and group. Prices depend on availability and on supplier rates, so a proposal is valid for the period stated on it. Until the booking is confirmed, prices and availability can change.</p>' },
      { h: 'Confirming a booking', html: '<p>To book, you accept the proposal in writing and pay the deposit shown on it. Your booking is confirmed when we send you a written confirmation. The person who makes the booking accepts these terms for everyone travelling and must be at least 18.</p>' },
      { h: 'Deposits and balance', html: '<p>The deposit amount and the date the balance is due are set out in your proposal and confirmation, because they depend on the suppliers involved. Some elements, such as flights, certain lodges or permits, may need full payment when booked; we will tell you before you commit. If the balance is not paid by the due date we may treat the booking as cancelled by you, and the cancellation charges below apply.</p>' },
      { h: 'Changes you ask for', html: '<p>We will try to make any change you ask for after confirmation, but it is not always possible. Any extra costs charged by suppliers, plus a reasonable administration cost we will tell you in advance, are payable by you. A change of travel dates may be treated as a cancellation and a new booking.</p>' },
      { h: 'If you cancel', html: '<p>You can cancel at any time by writing to us. Because we pay suppliers on your behalf, cancellation charges apply. They are set out in your confirmation and increase as the departure date gets closer; they will never be more than the total price of the trip. Your travel insurance may cover these charges in some circumstances.</p>' },
      { h: 'If we change or cancel', html: '<p>We rarely need to change a confirmed trip, but suppliers sometimes do. If a significant part of your trip has to change, we will tell you as soon as we can and offer a suitable alternative, or a full refund of the money you have paid for the affected arrangements. We will not cancel your trip after confirmation except where the trip cannot safely or lawfully go ahead (for example because of official travel advice, natural disasters or similar events outside our control), or if you have not paid. In those cases we will refund what you have paid for the arrangements that do not go ahead.</p>' },
      { h: 'Travel insurance', html: '<p>Comprehensive travel insurance is a condition of booking. It should cover cancellation, medical treatment, repatriation and any activities in your itinerary. Please send us your policy details before you travel.</p>' },
      { h: 'Passports, visas and health', html: '<p>You are responsible for having a valid passport, any visas and entry permits, and meeting the health and vaccination requirements of every country on your itinerary. We are happy to point you to official sources, but rules change and the final responsibility is yours. Please take medical advice well before you travel.</p>' },
      { h: 'Your responsibilities during the trip', html: '<p>Please follow the reasonable instructions of guides and suppliers, respect local laws and customs, and let us know straight away if something is wrong so we can try to put it right on the spot.</p>' },
      { h: 'Our responsibility', html: '<p>We take reasonable care in choosing suppliers and planning your trip, and we are responsible for the arrangements we agree to provide. We are not responsible for loss, injury or damage caused by you, by a third party not connected with your trip, or by events outside our control that could not have been foreseen or avoided. Where international conventions limit what airlines, rail or sea carriers or hotels must pay, our liability is limited in the same way. Nothing in these terms limits liability that cannot be limited by law, including for death or personal injury caused by our negligence.</p>' },
      { h: 'Complaints', html: `<p>If something goes wrong during your trip, tell your guide or the supplier and contact us straight away so we can try to fix it while you are there. If you are still unhappy, write to us at ${mail} within 28 days of your return and we will reply as quickly as we can.</p>` },
      { h: 'Governing law', html: '<p>These terms are governed by the law that applies to the contract between you and us. Nothing in them affects your statutory rights as a consumer, including any right to bring a claim in the courts where you live.</p>' },
      { h: 'Contact', html: `<p>${brand}, ${address}. Email ${mail}.</p>` },
    ],
  };

  const table = storage.length
    ? `<div class="legal-table"><table><thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Purpose</th><th scope="col">How long</th></tr></thead><tbody>${storage
        .map((s) => `<tr><td><code>${s.name}</code></td><td>${s.kind}</td><td>${s.purpose}</td><td>${s.duration}</td></tr>`)
        .join('')}</tbody></table></div>`
    : '';
  const cookies = {
    title: 'Cookie Policy',
    intro: `This page lists every cookie and every piece of browser storage this website uses. Last updated ${updated}.`,
    sections: [
      { h: 'What we use', html: storage.length
        ? `<p>This site sets no advertising or tracking cookies and runs no analytics. It uses only the following, all strictly necessary for features you use:</p>${table}`
        : '<p>This site sets no cookies and uses no browser storage. It runs no analytics, advertising or tracking scripts.</p>' },
      { h: 'Third parties', html: `<p>${enquiryNote ? enquiryNote + ' ' : ''}${thirdParty}</p>` },
      { h: 'Consent', html: storage.length
        ? '<p>Because everything listed above is strictly necessary for a feature you choose to use, the law does not require us to ask for consent first, so there is no cookie banner. If we ever add analytics or anything else that is not strictly necessary, we will ask for your consent before it runs and update this page.</p>'
        : '<p>Because nothing is stored on your device, there is nothing to consent to and no cookie banner. If we ever add analytics or anything else that is not strictly necessary, we will ask for your consent before it runs and update this page.</p>' },
      { h: 'How to remove or block it', html: '<p>You can delete cookies and site data at any time in your browser settings (usually under Privacy or Site settings), and you can block them for this site. The site will still work; features that rely on local storage will simply forget your progress.</p>' },
      { h: 'Contact', html: `<p>Questions about this policy: ${mail}.</p>` },
    ],
  };
  return { privacy, terms, cookies };
}

module.exports = { legalPages };
