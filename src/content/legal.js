/** @typedef {{ name: string, kind: string, purpose: string, duration: string }} StorageItem */
/** @typedef {{ brand: string, email: string, address: string, updated: string, storage?: StorageItem[], enquiryNote?: string, processors?: string[], thirdParty?: string }} LegalOptions */
/** @typedef {{ title: string, intro: string, sections: { h: string, html: string }[] }} LegalDoc */

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
/**
 * @param {LegalOptions} options
 * @returns {{ privacy: LegalDoc, terms: LegalDoc, cookies: LegalDoc }}
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


/**
 * Version française des pages légales : politique de confidentialité, conditions de réservation,
 * politique cookies. Même signature que legalPages() (legal.js) ; les textes `purpose`/`duration`
 * de `storage` et les phrases passées en option doivent déjà être en français.
 */
/**
 * @param {LegalOptions} options
 * @returns {{ privacy: LegalDoc, terms: LegalDoc, cookies: LegalDoc }}
 */
function legalPagesFr({ brand, email, address, updated, storage = [], enquiryNote = '', processors = [], thirdParty = 'Les polices et les images sont servies depuis le domaine de ce site : aucun service tiers ne dépose de cookie pendant votre visite.' }) {
  const mail = `<a href="mailto:${email}">${email}</a>`;
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

  const privacy = {
    title: 'Politique de confidentialité',
    intro: `Cette politique explique quelles données personnelles ${brand} recueille lorsque vous utilisez ce site ou préparez un voyage avec nous, pourquoi, et quels sont vos choix. Dernière mise à jour : ${updated}.`,
    sections: [
      { h: 'Qui sommes-nous', html: `<p>${brand} conçoit des voyages sur mesure. Au sens de la réglementation sur la protection des données, nous sommes responsables du traitement des données décrites ici. Vous pouvez nous écrire à ${mail} ou par courrier à l’adresse ${address}.</p>` },
      { h: 'Ce que nous recueillons', html: list([
        '<strong>Les informations de votre demande</strong> : nom, adresse e-mail, numéro de téléphone si vous choisissez de le donner, dates de voyage, nombre et âge des voyageurs, centres d’intérêt, budget et toute autre précision.',
        '<strong>Nos échanges</strong> : les e-mails et messages échangés pendant la préparation du voyage.',
        '<strong>Les informations de réservation</strong>, si vous donnez suite : noms, dates de naissance, données de passeport, besoins alimentaires ou médicaux et contacts d’urgence dont les prestataires ont besoin pour assurer votre voyage.',
        '<strong>Des données techniques</strong> : notre hébergeur conserve des journaux serveur standard (adresse IP, type de navigateur, pages demandées, heure) pour assurer la sécurité et le bon fonctionnement du site.',
      ]) },
      { h: 'À quoi elles servent', html: list([
        'Répondre à votre demande et préparer une proposition (mesures précontractuelles prises à votre demande).',
        'Réserver et organiser votre voyage auprès des hébergements, guides, chauffeurs, compagnies aériennes et autres prestataires (exécution du contrat).',
        'Respecter nos obligations légales, fiscales et comptables (obligation légale).',
        'Sécuriser le site et corriger les problèmes (notre intérêt légitime).',
      ]) + '<p>Nous ne vendons pas vos données, nous ne les utilisons pas pour de la publicité ciblée et nous ne vous envoyons de nouvelles par e-mail que si vous l’avez demandé.</p>' },
      { h: 'Données de santé et autres données sensibles', html: '<p>Si vous nous signalez un problème de santé, un besoin lié à la mobilité ou un régime alimentaire, nous n’utilisons ces informations que pour adapter le voyage et ne les transmettons qu’aux prestataires concernés. Nous recueillons votre consentement à ce moment-là, et vous pouvez le retirer à tout moment.</p>' },
      { h: 'Avec qui nous les partageons', html: '<p>Nous ne partageons vos données que lorsque c’est nécessaire :</p>' + list([
        'avec les prestataires qui assurent votre voyage (hébergement, transport, guides, activités), dont certains se trouvent hors de votre pays ;',
        ...processors,
        'avec nos conseils, nos assureurs ou les autorités lorsque la loi l’exige.',
      ]) + '<p>Lorsque des données sont transférées vers un autre pays, nous nous appuyons sur les garanties prévues par la loi applicable, ou le transfert est nécessaire à l’exécution du voyage que vous avez demandé.</p>' },
      { h: 'Durée de conservation', html: '<p>Les demandes qui n’aboutissent pas à une réservation sont supprimées dans les deux ans suivant notre dernier échange. Les dossiers de réservation sont conservés le temps exigé par le droit fiscal et le droit de la consommation (en général jusqu’à sept ans après le voyage), puis supprimés.</p>' },
      { h: 'Vos droits', html: `<p>Selon votre lieu de résidence, vous pouvez nous demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement ou vous y opposer, demander leur portabilité, et retirer votre consentement à tout moment. Écrivez à ${mail} : nous répondons sous un mois. Vous pouvez aussi saisir l’autorité de protection des données de votre pays.</p>` },
      { h: 'Sécurité', html: '<p>Le site est servi en HTTPS. Seules les personnes qui préparent votre voyage ont accès aux informations de demande et de réservation.</p>' },
      { h: 'Cookies', html: '<p>Voir notre <a href="COOKIES_URL">politique cookies</a> pour le peu de stockage utilisé par ce site dans votre navigateur.</p>' },
      { h: 'Modifications', html: '<p>Si nous modifions cette politique, nous mettrons à jour la date indiquée en haut de cette page.</p>' },
    ],
  };

  const terms = {
    title: 'Conditions de réservation',
    intro: `Ces conditions s’appliquent lorsque vous préparez et réservez un voyage sur mesure avec ${brand}. Merci de les lire avant de confirmer une réservation. Dernière mise à jour : ${updated}.`,
    sections: [
      { h: 'Notre façon de travailler', html: `<p>${brand} conçoit chaque voyage autour de ses voyageurs. Tout commence par une demande : vous nous dites ce que vous cherchez et nous préparons une proposition. Rien sur ce site n’est une offre de vente d’un produit figé, et aucune réservation n’existe tant que nous ne l’avons pas confirmée tous les deux par écrit.</p>` },
      { h: 'Demandes et propositions', html: '<p>Une demande est gratuite et ne vous engage à rien. Nos propositions décrivent l’itinéraire, ce qui est inclus et le prix pour vos dates et votre groupe. Les prix dépendent des disponibilités et des tarifs des prestataires : une proposition est donc valable pendant la durée qui y est indiquée. Tant que la réservation n’est pas confirmée, prix et disponibilités peuvent changer.</p>' },
      { h: 'Confirmer une réservation', html: '<p>Pour réserver, vous acceptez la proposition par écrit et versez l’acompte qui y figure. La réservation est confirmée lorsque nous vous envoyons une confirmation écrite. La personne qui réserve accepte ces conditions pour l’ensemble des voyageurs et doit être majeure.</p>' },
      { h: 'Acompte et solde', html: '<p>Le montant de l’acompte et la date d’échéance du solde figurent sur votre proposition et votre confirmation, car ils dépendent des prestataires concernés. Certains éléments (vols, certains lodges ou permis) doivent parfois être payés en totalité dès la réservation ; nous vous le dirons avant tout engagement. Si le solde n’est pas réglé à l’échéance, nous pouvons considérer que vous avez annulé, et les frais d’annulation ci-dessous s’appliquent.</p>' },
      { h: 'Modifications à votre demande', html: '<p>Nous ferons notre possible pour apporter les modifications demandées après confirmation, mais ce n’est pas toujours possible. Les frais supplémentaires facturés par les prestataires, ainsi que des frais de dossier raisonnables annoncés à l’avance, sont à votre charge. Un changement de dates peut être traité comme une annulation suivie d’une nouvelle réservation.</p>' },
      { h: 'Si vous annulez', html: '<p>Vous pouvez annuler à tout moment, par écrit. Comme nous réglons les prestataires pour votre compte, des frais d’annulation s’appliquent. Ils figurent sur votre confirmation et augmentent à l’approche du départ ; ils ne dépassent jamais le prix total du voyage. Votre assurance voyage peut les couvrir dans certains cas.</p>' },
      { h: 'Si nous modifions ou annulons', html: '<p>Nous devons rarement modifier un voyage confirmé, mais il arrive qu’un prestataire le fasse. Si un élément important de votre voyage doit changer, nous vous prévenons dès que possible et vous proposons une solution équivalente ou le remboursement intégral des sommes versées pour les prestations concernées. Nous n’annulons pas un voyage confirmé, sauf s’il ne peut pas avoir lieu en sécurité ou légalement (consignes officielles aux voyageurs, catastrophe naturelle ou événement comparable indépendant de notre volonté) ou en cas de non-paiement. Dans ces cas, nous remboursons les sommes versées pour les prestations qui n’ont pas lieu.</p>' },
      { h: 'Assurance voyage', html: '<p>Une assurance voyage complète est une condition de réservation. Elle doit couvrir l’annulation, les frais médicaux, le rapatriement et les activités prévues au programme. Merci de nous transmettre les références de votre contrat avant le départ.</p>' },
      { h: 'Passeports, visas et santé', html: '<p>Il vous appartient de disposer d’un passeport valide, des visas et autorisations d’entrée nécessaires, et de respecter les exigences sanitaires et vaccinales de chaque pays du voyage. Nous pouvons vous orienter vers les sources officielles, mais les règles changent et la responsabilité finale vous revient. Consultez un médecin bien avant le départ.</p>' },
      { h: 'Pendant le voyage', html: '<p>Merci de suivre les consignes raisonnables des guides et des prestataires, de respecter les lois et usages locaux, et de nous prévenir immédiatement si quelque chose ne va pas, pour que nous puissions y remédier sur place.</p>' },
      { h: 'Notre responsabilité', html: '<p>Nous choisissons nos prestataires et préparons votre voyage avec soin, et nous sommes responsables des prestations que nous nous engageons à fournir. Nous ne sommes pas responsables des pertes, dommages ou blessures causés par vous-même, par un tiers étranger au voyage, ou par des événements indépendants de notre volonté qui ne pouvaient être ni prévus ni évités. Lorsque des conventions internationales limitent l’indemnisation due par les transporteurs aériens, ferroviaires ou maritimes ou par les hôtels, notre responsabilité est limitée de la même façon. Rien dans ces conditions ne limite une responsabilité que la loi interdit de limiter, notamment en cas de décès ou de dommage corporel causé par notre négligence.</p>' },
      { h: 'Réclamations', html: `<p>En cas de problème pendant le voyage, prévenez votre guide ou le prestataire et contactez-nous aussitôt pour que nous puissions agir sur place. Si vous n’êtes toujours pas satisfait, écrivez-nous à ${mail} dans les 28 jours suivant votre retour : nous vous répondrons dans les meilleurs délais.</p>` },
      { h: 'Droit applicable', html: '<p>Ces conditions sont régies par la loi applicable au contrat conclu entre vous et nous. Elles ne portent pas atteinte à vos droits de consommateur, y compris le droit de saisir les tribunaux de votre lieu de résidence.</p>' },
      { h: 'Contact', html: `<p>${brand}, ${address}. E-mail : ${mail}.</p>` },
    ],
  };

  const table = storage.length
    ? `<div class="legal-table"><table><thead><tr><th scope="col">Nom</th><th scope="col">Type</th><th scope="col">Finalité</th><th scope="col">Durée</th></tr></thead><tbody>${storage
        .map((s) => `<tr><td><code>${s.name}</code></td><td>${s.kind}</td><td>${s.purpose}</td><td>${s.duration}</td></tr>`)
        .join('')}</tbody></table></div>`
    : '';
  const cookies = {
    title: 'Politique cookies',
    intro: `Cette page liste tous les cookies et tout le stockage navigateur utilisés par ce site. Dernière mise à jour : ${updated}.`,
    sections: [
      { h: 'Ce que nous utilisons', html: storage.length
        ? `<p>Ce site ne dépose aucun cookie publicitaire ou de suivi et n’utilise aucun outil de mesure d’audience. Il n’utilise que les éléments suivants, tous strictement nécessaires aux fonctions que vous utilisez :</p>${table}`
        : '<p>Ce site ne dépose aucun cookie et n’utilise aucun stockage navigateur. Il n’utilise aucun outil de mesure d’audience, de publicité ou de suivi.</p>' },
      { h: 'Services tiers', html: `<p>${enquiryNote ? enquiryNote + ' ' : ''}${thirdParty}</p>` },
      { h: 'Consentement', html: storage.length
        ? '<p>Les éléments ci-dessus étant strictement nécessaires à une fonction que vous choisissez d’utiliser, la loi ne nous impose pas de recueillir votre consentement au préalable : il n’y a donc pas de bandeau cookies. Si nous ajoutons un jour un outil de mesure d’audience ou tout autre élément non strictement nécessaire, nous vous demanderons votre accord avant son activation et mettrons cette page à jour.</p>'
        : '<p>Rien n’étant stocké sur votre appareil, il n’y a rien à accepter et pas de bandeau cookies. Si nous ajoutons un jour un outil de mesure d’audience ou tout autre élément non strictement nécessaire, nous vous demanderons votre accord avant son activation et mettrons cette page à jour.</p>' },
      { h: 'Supprimer ou bloquer', html: '<p>Vous pouvez à tout moment supprimer les cookies et les données de site dans les réglages de votre navigateur (rubrique Confidentialité ou Paramètres des sites), et les bloquer pour ce site. Le site continuera de fonctionner ; les fonctions qui utilisent le stockage local oublieront simplement votre progression.</p>' },
      { h: 'Contact', html: `<p>Pour toute question sur cette politique : ${mail}.</p>` },
    ],
  };
  return { privacy, terms, cookies };
}


/**
 * Deutsche Fassung der Rechtstexte: Datenschutzerklärung, Buchungsbedingungen, Cookie-Richtlinie.
 * Gleiche Signatur wie legalPages(); Texte in `storage` und die Optionen müssen bereits auf Deutsch sein.
 */
/**
 * @param {LegalOptions} options
 * @returns {{ privacy: LegalDoc, terms: LegalDoc, cookies: LegalDoc }}
 */
function legalPagesDe({ brand, email, address, updated, storage = [], enquiryNote = '', processors = [], thirdParty = 'Schriften und Bilder werden von der eigenen Domain dieser Website geladen; kein Drittanbieter setzt beim Besuch Cookies.' }) {
  const mail = `<a href="mailto:${email}">${email}</a>`;
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

  const privacy = {
    title: 'Datenschutzerklärung',
    intro: `Diese Erklärung beschreibt, welche personenbezogenen Daten ${brand} erhebt, wenn Sie diese Website nutzen oder eine Reise mit uns planen, warum wir sie erheben und welche Wahlmöglichkeiten Sie haben. Stand: ${updated}.`,
    sections: [
      { h: 'Wer wir sind', html: `<p>${brand} plant maßgeschneiderte Reisen. Im Sinne des Datenschutzrechts sind wir Verantwortliche für die hier beschriebenen Daten. Sie erreichen uns unter ${mail} oder per Post unter ${address}.</p>` },
      { h: 'Welche Daten wir erheben', html: list([
        '<strong>Angaben aus Ihrer Anfrage</strong>: Name, E-Mail-Adresse, Telefonnummer (falls Sie sie angeben), Reisedaten, Zahl und Alter der Reisenden, Interessen, Budgetrahmen und weitere Hinweise.',
        '<strong>Korrespondenz</strong>: die E-Mails und Nachrichten, die wir bei der Planung Ihrer Reise austauschen.',
        '<strong>Buchungsdaten</strong>, wenn Sie buchen: Namen, Geburtsdaten, Passdaten, Ernährungs- oder medizinische Bedürfnisse und Notfallkontakte, die Leistungsträger für die Durchführung Ihrer Reise benötigen.',
        '<strong>Technische Daten</strong>: Unser Hosting-Anbieter speichert übliche Server-Logs (IP-Adresse, Browsertyp, aufgerufene Seiten, Uhrzeit), um die Website sicher und funktionsfähig zu halten.',
      ]) },
      { h: 'Wofür wir sie nutzen', html: list([
        'Um Ihre Anfrage zu beantworten und ein Angebot zu erstellen (vorvertragliche Maßnahmen auf Ihre Anfrage).',
        'Um Ihre Reise bei Unterkünften, Guides, Fahrern, Fluggesellschaften und anderen Leistungsträgern zu buchen und durchzuführen (Vertragserfüllung).',
        'Um gesetzliche, steuerliche und buchhalterische Pflichten zu erfüllen (rechtliche Verpflichtung).',
        'Um die Website zu schützen und Fehler zu beheben (berechtigtes Interesse).',
      ]) + '<p>Wir verkaufen Ihre Daten nicht, erstellen keine Werbeprofile und senden Ihnen Neuigkeiten per E-Mail nur, wenn Sie das ausdrücklich wünschen.</p>' },
      { h: 'Gesundheitsdaten und andere sensible Daten', html: '<p>Wenn Sie uns eine Erkrankung, einen Mobilitätsbedarf oder eine Ernährungsform mitteilen, nutzen wir diese Angaben nur, um die Reise für Sie passend zu machen, und geben sie nur an die Leistungsträger weiter, die sie benötigen. Wir holen dafür Ihre Einwilligung ein, die Sie jederzeit widerrufen können.</p>' },
      { h: 'An wen wir Daten weitergeben', html: '<p>Wir geben personenbezogene Daten nur weiter, wenn es nötig ist:</p>' + list([
        'an die Leistungsträger, die Ihre Reise durchführen (Unterkünfte, Transport, Guides, Aktivitäten), von denen sich einige außerhalb Ihres Landes befinden;',
        ...processors,
        'an Berater, Versicherer oder Behörden, wenn das Gesetz es verlangt.',
      ]) + '<p>Werden Daten in ein anderes Land übermittelt, stützen wir uns auf die nach geltendem Recht vorgesehenen Garantien, oder die Übermittlung ist zur Durchführung der von Ihnen gewünschten Reise erforderlich.</p>' },
      { h: 'Wie lange wir Daten speichern', html: '<p>Anfragen, aus denen keine Buchung wird, löschen wir spätestens zwei Jahre nach dem letzten Kontakt. Buchungsunterlagen bewahren wir so lange auf, wie Steuer- und Verbraucherrecht es verlangen (in der Regel bis zu sieben Jahre nach der Reise), und löschen sie danach.</p>' },
      { h: 'Ihre Rechte', html: `<p>Je nach Wohnort können Sie Auskunft über Ihre Daten verlangen, sie berichtigen oder löschen lassen, die Verarbeitung einschränken oder ihr widersprechen, Ihre Daten übertragen lassen und erteilte Einwilligungen jederzeit widerrufen. Schreiben Sie an ${mail}; wir antworten innerhalb eines Monats. Sie haben außerdem das Recht, sich bei der Datenschutzaufsichtsbehörde Ihres Landes zu beschweren.</p>` },
      { h: 'Sicherheit', html: '<p>Die Website wird über HTTPS ausgeliefert. Zugriff auf Anfrage- und Buchungsdaten haben nur die Personen, die Ihre Reise planen.</p>' },
      { h: 'Cookies', html: '<p>In unserer <a href="COOKIES_URL">Cookie-Richtlinie</a> lesen Sie, welchen geringen Browserspeicher diese Website nutzt.</p>' },
      { h: 'Änderungen', html: '<p>Wenn wir diese Erklärung ändern, aktualisieren wir das Datum oben auf dieser Seite.</p>' },
    ],
  };

  const terms = {
    title: 'Buchungsbedingungen',
    intro: `Diese Bedingungen gelten, wenn Sie mit ${brand} eine maßgeschneiderte Reise planen und buchen. Bitte lesen Sie sie, bevor Sie eine Buchung bestätigen. Stand: ${updated}.`,
    sections: [
      { h: 'So arbeiten wir', html: `<p>${brand} gestaltet jede Reise rund um die Reisenden. Alles beginnt mit einer Anfrage: Sie sagen uns, was Sie suchen, und wir erstellen ein Angebot. Nichts auf dieser Website ist ein Angebot zum Verkauf eines festen Produkts, und eine Buchung kommt erst zustande, wenn wir sie beide schriftlich bestätigt haben.</p>` },
      { h: 'Anfragen und Angebote', html: '<p>Eine Anfrage ist kostenlos und unverbindlich. Unsere Angebote beschreiben die Route, die enthaltenen Leistungen und den Preis für Ihre Daten und Ihre Gruppe. Preise hängen von Verfügbarkeit und Tarifen der Leistungsträger ab; ein Angebot gilt daher für den darin genannten Zeitraum. Bis zur Bestätigung der Buchung können sich Preise und Verfügbarkeit ändern.</p>' },
      { h: 'Bestätigung der Buchung', html: '<p>Um zu buchen, nehmen Sie das Angebot schriftlich an und leisten die darin genannte Anzahlung. Die Buchung ist bestätigt, sobald wir Ihnen eine schriftliche Bestätigung senden. Wer bucht, akzeptiert diese Bedingungen für alle Reisenden und muss mindestens 18 Jahre alt sein.</p>' },
      { h: 'Anzahlung und Restzahlung', html: '<p>Höhe der Anzahlung und Fälligkeit der Restzahlung stehen in Ihrem Angebot und Ihrer Bestätigung, da sie von den beteiligten Leistungsträgern abhängen. Manche Leistungen (etwa Flüge, bestimmte Lodges oder Genehmigungen) müssen bei Buchung vollständig bezahlt werden; das sagen wir Ihnen, bevor Sie sich festlegen. Wird die Restzahlung nicht fristgerecht geleistet, können wir die Buchung als von Ihnen storniert behandeln; dann gelten die unten genannten Stornokosten.</p>' },
      { h: 'Änderungen auf Ihren Wunsch', html: '<p>Wir bemühen uns, gewünschte Änderungen nach der Bestätigung umzusetzen, doch das ist nicht immer möglich. Zusätzliche Kosten der Leistungsträger sowie eine angemessene Bearbeitungsgebühr, die wir vorher nennen, tragen Sie. Eine Änderung der Reisedaten kann als Stornierung mit anschließender Neubuchung behandelt werden.</p>' },
      { h: 'Wenn Sie stornieren', html: '<p>Sie können jederzeit schriftlich stornieren. Da wir Leistungsträger in Ihrem Auftrag bezahlen, fallen Stornokosten an. Sie stehen in Ihrer Bestätigung und steigen, je näher der Reisebeginn rückt; sie übersteigen nie den Gesamtpreis der Reise. Ihre Reiseversicherung kann diese Kosten unter Umständen übernehmen.</p>' },
      { h: 'Wenn wir ändern oder absagen', html: '<p>Wir müssen eine bestätigte Reise nur selten ändern, Leistungsträger tun es jedoch gelegentlich. Muss ein wesentlicher Teil Ihrer Reise geändert werden, informieren wir Sie so schnell wie möglich und bieten Ihnen eine gleichwertige Alternative oder die volle Erstattung der für die betroffenen Leistungen gezahlten Beträge an. Eine bestätigte Reise sagen wir nur ab, wenn sie nicht sicher oder rechtmäßig stattfinden kann (etwa wegen offizieller Reisewarnungen, Naturkatastrophen oder ähnlicher Ereignisse außerhalb unserer Kontrolle) oder wenn nicht gezahlt wurde. In diesen Fällen erstatten wir, was Sie für die ausfallenden Leistungen gezahlt haben.</p>' },
      { h: 'Reiseversicherung', html: '<p>Eine umfassende Reiseversicherung ist Voraussetzung für die Buchung. Sie sollte Reiserücktritt, medizinische Behandlung, Rücktransport und alle Aktivitäten Ihrer Route abdecken. Bitte senden Sie uns die Policendaten vor der Abreise.</p>' },
      { h: 'Pass, Visum und Gesundheit', html: '<p>Für einen gültigen Reisepass, Visa und Einreisegenehmigungen sowie die Einhaltung der Gesundheits- und Impfvorschriften aller Länder Ihrer Reise sind Sie selbst verantwortlich. Gern verweisen wir Sie auf offizielle Quellen, doch die Regeln ändern sich, und die Verantwortung liegt letztlich bei Ihnen. Holen Sie rechtzeitig vor der Reise ärztlichen Rat ein.</p>' },
      { h: 'Während der Reise', html: '<p>Bitte folgen Sie den angemessenen Anweisungen von Guides und Leistungsträgern, respektieren Sie die örtlichen Gesetze und Gebräuche und sagen Sie uns sofort Bescheid, wenn etwas nicht stimmt, damit wir es vor Ort beheben können.</p>' },
      { h: 'Unsere Haftung', html: '<p>Wir wählen Leistungsträger sorgfältig aus, planen Ihre Reise mit Sorgfalt und haften für die Leistungen, die wir zu erbringen zusagen. Wir haften nicht für Verluste, Verletzungen oder Schäden, die Sie selbst, ein nicht an der Reise beteiligter Dritter oder unvorhersehbare und unvermeidbare Ereignisse außerhalb unserer Kontrolle verursachen. Wo internationale Übereinkommen die Haftung von Luft-, Bahn- oder Schiffsbeförderern oder Hotels begrenzen, ist unsere Haftung in gleicher Weise begrenzt. Nichts in diesen Bedingungen beschränkt eine Haftung, die gesetzlich nicht beschränkt werden kann, insbesondere für Tod oder Körperverletzung durch unsere Fahrlässigkeit.</p>' },
      { h: 'Beschwerden', html: `<p>Wenn während der Reise etwas schiefgeht, sagen Sie es Ihrem Guide oder dem Leistungsträger und kontaktieren Sie uns sofort, damit wir noch vor Ort helfen können. Sind Sie danach noch unzufrieden, schreiben Sie uns innerhalb von 28 Tagen nach Ihrer Rückkehr an ${mail}; wir antworten so schnell wie möglich.</p>` },
      { h: 'Anwendbares Recht', html: '<p>Diese Bedingungen unterliegen dem Recht, das auf den Vertrag zwischen Ihnen und uns anwendbar ist. Ihre gesetzlichen Verbraucherrechte, einschließlich des Rechts, vor den Gerichten Ihres Wohnorts zu klagen, bleiben unberührt.</p>' },
      { h: 'Kontakt', html: `<p>${brand}, ${address}. E-Mail: ${mail}.</p>` },
    ],
  };

  const table = storage.length
    ? `<div class="legal-table"><table><thead><tr><th scope="col">Name</th><th scope="col">Art</th><th scope="col">Zweck</th><th scope="col">Dauer</th></tr></thead><tbody>${storage
        .map((s) => `<tr><td><code>${s.name}</code></td><td>${s.kind}</td><td>${s.purpose}</td><td>${s.duration}</td></tr>`)
        .join('')}</tbody></table></div>`
    : '';
  const cookies = {
    title: 'Cookie-Richtlinie',
    intro: `Diese Seite listet alle Cookies und jeden Browserspeicher auf, den diese Website verwendet. Stand: ${updated}.`,
    sections: [
      { h: 'Was wir verwenden', html: storage.length
        ? `<p>Diese Website setzt keine Werbe- oder Tracking-Cookies und nutzt keine Webanalyse. Sie verwendet ausschließlich Folgendes, jeweils unbedingt erforderlich für Funktionen, die Sie nutzen:</p>${table}`
        : '<p>Diese Website setzt keine Cookies und nutzt keinen Browserspeicher. Sie verwendet keine Analyse-, Werbe- oder Tracking-Skripte.</p>' },
      { h: 'Drittanbieter', html: `<p>${enquiryNote ? enquiryNote + ' ' : ''}${thirdParty}</p>` },
      { h: 'Einwilligung', html: storage.length
        ? '<p>Da alles oben Genannte für eine von Ihnen gewählte Funktion unbedingt erforderlich ist, müssen wir dafür keine vorherige Einwilligung einholen; deshalb gibt es kein Cookie-Banner. Sollten wir künftig Webanalyse oder andere nicht unbedingt erforderliche Dienste einsetzen, bitten wir vorher um Ihre Einwilligung und aktualisieren diese Seite.</p>'
        : '<p>Da nichts auf Ihrem Gerät gespeichert wird, gibt es nichts einzuwilligen und kein Cookie-Banner. Sollten wir künftig Webanalyse oder andere nicht unbedingt erforderliche Dienste einsetzen, bitten wir vorher um Ihre Einwilligung und aktualisieren diese Seite.</p>' },
      { h: 'Löschen oder blockieren', html: '<p>Sie können Cookies und Websitedaten jederzeit in den Einstellungen Ihres Browsers löschen (meist unter Datenschutz oder Website-Einstellungen) und für diese Website blockieren. Die Website funktioniert weiterhin; Funktionen, die den lokalen Speicher nutzen, vergessen lediglich Ihren Fortschritt.</p>' },
      { h: 'Kontakt', html: `<p>Fragen zu dieser Richtlinie: ${mail}.</p>` },
    ],
  };
  return { privacy, terms, cookies };
}


/**
 * Versión en español de las páginas legales: política de privacidad, condiciones de reserva y política de cookies.
 * Misma firma que legalPages(); los textos de `storage` y las opciones deben estar ya en español.
 */
/**
 * @param {LegalOptions} options
 * @returns {{ privacy: LegalDoc, terms: LegalDoc, cookies: LegalDoc }}
 */
function legalPagesEs({ brand, email, address, updated, storage = [], enquiryNote = '', processors = [], thirdParty = 'Las fuentes y las imágenes se sirven desde el propio dominio de este sitio, así que ningún servicio externo instala cookies durante su visita.' }) {
  const mail = `<a href="mailto:${email}">${email}</a>`;
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

  const privacy = {
    title: 'Política de privacidad',
    intro: `Esta política explica qué datos personales recoge ${brand} cuando usted utiliza este sitio web o planea un viaje con nosotros, por qué los recogemos y qué opciones tiene. Última actualización: ${updated}.`,
    sections: [
      { h: 'Quiénes somos', html: `<p>${brand} diseña viajes a medida. A efectos de la normativa de protección de datos, somos responsables del tratamiento de los datos descritos aquí. Puede escribirnos a ${mail} o por correo postal a ${address}.</p>` },
      { h: 'Qué datos recogemos', html: list([
        '<strong>Los datos de su solicitud</strong>: nombre, correo electrónico, teléfono si decide indicarlo, fechas de viaje, número y edad de los viajeros, intereses, presupuesto y cualquier otra indicación.',
        '<strong>Nuestra correspondencia</strong>: los correos y mensajes que intercambiamos mientras preparamos su viaje.',
        '<strong>Los datos de la reserva</strong>, si sigue adelante: nombres, fechas de nacimiento, datos del pasaporte, necesidades alimentarias o médicas y contactos de emergencia que los proveedores necesitan para prestar los servicios.',
        '<strong>Datos técnicos</strong>: nuestro proveedor de alojamiento web conserva registros estándar del servidor (dirección IP, tipo de navegador, páginas solicitadas, hora) para mantener el sitio seguro y en funcionamiento.',
      ]) },
      { h: 'Para qué los usamos', html: list([
        'Para responder a su solicitud y preparar una propuesta (medidas precontractuales a petición suya).',
        'Para reservar y organizar su viaje con alojamientos, guías, conductores, aerolíneas y otros proveedores (ejecución del contrato).',
        'Para cumplir nuestras obligaciones legales, fiscales y contables (obligación legal).',
        'Para mantener el sitio seguro y corregir problemas (nuestro interés legítimo).',
      ]) + '<p>No vendemos sus datos, no los usamos para crear perfiles publicitarios y solo le enviamos novedades por correo si nos lo ha pedido.</p>' },
      { h: 'Datos de salud y otros datos sensibles', html: '<p>Si nos informa de una afección médica, una necesidad de movilidad o una dieta especial, usamos esa información solo para adaptar el viaje y la compartimos únicamente con los proveedores que la necesitan. Le pedimos su consentimiento al recogerla, y puede retirarlo en cualquier momento.</p>' },
      { h: 'Con quién los compartimos', html: '<p>Solo compartimos datos personales cuando es necesario:</p>' + list([
        'con los proveedores que prestan los servicios de su viaje (alojamiento, transporte, guías, actividades), algunos de ellos fuera de su país;',
        ...processors,
        'con asesores profesionales, aseguradoras o autoridades cuando la ley lo exige.',
      ]) + '<p>Cuando los datos se transfieren a otro país, nos basamos en las garantías previstas por la legislación aplicable, o la transferencia es necesaria para prestar el viaje que usted ha solicitado.</p>' },
      { h: 'Cuánto tiempo los conservamos', html: '<p>Las solicitudes que no terminan en reserva se eliminan en un plazo de dos años desde nuestro último contacto. Los expedientes de reserva se conservan el tiempo que exige la normativa fiscal y de consumo (normalmente hasta siete años después del viaje) y después se eliminan.</p>' },
      { h: 'Sus derechos', html: `<p>Según dónde resida, puede pedirnos acceso a sus datos, su rectificación o supresión, la limitación del tratamiento u oponerse a él, la portabilidad de sus datos, y retirar su consentimiento en cualquier momento. Escriba a ${mail} y le responderemos en el plazo de un mes. También tiene derecho a reclamar ante la autoridad de protección de datos de su país.</p>` },
      { h: 'Seguridad', html: '<p>El sitio se sirve mediante HTTPS. Solo las personas que preparan su viaje tienen acceso a los datos de solicitudes y reservas.</p>' },
      { h: 'Cookies', html: '<p>Consulte nuestra <a href="COOKIES_URL">política de cookies</a> para conocer el poco almacenamiento del navegador que utiliza este sitio.</p>' },
      { h: 'Cambios', html: '<p>Si modificamos esta política, actualizaremos la fecha que figura al principio de esta página.</p>' },
    ],
  };

  const terms = {
    title: 'Condiciones de reserva',
    intro: `Estas condiciones se aplican cuando planea y reserva un viaje a medida con ${brand}. Léalas antes de confirmar una reserva. Última actualización: ${updated}.`,
    sections: [
      { h: 'Cómo trabajamos', html: `<p>${brand} diseña cada viaje en torno a sus viajeros. Todo empieza con una solicitud: usted nos cuenta lo que busca y preparamos una propuesta. Nada de lo que aparece en este sitio es una oferta de venta de un producto cerrado, y no existe ninguna reserva hasta que ambas partes la hayamos confirmado por escrito.</p>` },
      { h: 'Solicitudes y propuestas', html: '<p>Una solicitud es gratuita y no le compromete a nada. Nuestras propuestas describen el itinerario, lo que incluye y el precio para sus fechas y su grupo. Los precios dependen de la disponibilidad y de las tarifas de los proveedores, por lo que cada propuesta es válida durante el plazo que en ella se indica. Hasta que la reserva esté confirmada, precios y disponibilidad pueden cambiar.</p>' },
      { h: 'Confirmar una reserva', html: '<p>Para reservar, acepte la propuesta por escrito y abone el depósito indicado en ella. La reserva queda confirmada cuando le enviamos una confirmación por escrito. Quien realiza la reserva acepta estas condiciones en nombre de todos los viajeros y debe ser mayor de edad.</p>' },
      { h: 'Depósito y pago final', html: '<p>El importe del depósito y la fecha de pago del resto figuran en su propuesta y en su confirmación, ya que dependen de los proveedores implicados. Algunos servicios (vuelos, ciertos lodges o permisos) pueden requerir el pago completo al reservar; se lo diremos antes de que se comprometa. Si el pago final no se realiza en plazo, podremos considerar la reserva cancelada por usted y se aplicarán los gastos de cancelación indicados más abajo.</p>' },
      { h: 'Cambios a petición suya', html: '<p>Intentaremos atender cualquier cambio que nos pida tras la confirmación, aunque no siempre es posible. Los costes adicionales que cobren los proveedores, más unos gastos de gestión razonables que le comunicaremos antes, corren de su cuenta. Un cambio de fechas puede tratarse como una cancelación seguida de una nueva reserva.</p>' },
      { h: 'Si usted cancela', html: '<p>Puede cancelar en cualquier momento por escrito. Como pagamos a los proveedores en su nombre, se aplican gastos de cancelación. Figuran en su confirmación y aumentan a medida que se acerca la salida; nunca superarán el precio total del viaje. Su seguro de viaje puede cubrirlos en algunos casos.</p>' },
      { h: 'Si nosotros modificamos o cancelamos', html: '<p>Rara vez necesitamos modificar un viaje confirmado, pero a veces lo hacen los proveedores. Si una parte importante de su viaje debe cambiar, se lo comunicaremos cuanto antes y le ofreceremos una alternativa adecuada o el reembolso íntegro de lo pagado por los servicios afectados. No cancelaremos un viaje confirmado salvo que no pueda realizarse de forma segura o legal (por ejemplo, por recomendaciones oficiales de viaje, catástrofes naturales u otros hechos ajenos a nuestro control) o por falta de pago. En esos casos, le reembolsaremos lo pagado por los servicios que no se presten.</p>' },
      { h: 'Seguro de viaje', html: '<p>Contratar un seguro de viaje completo es condición para reservar. Debe cubrir cancelación, asistencia médica, repatriación y las actividades previstas en su itinerario. Envíenos los datos de la póliza antes de viajar.</p>' },
      { h: 'Pasaportes, visados y salud', html: '<p>Usted es responsable de tener un pasaporte válido, los visados y permisos de entrada necesarios, y de cumplir los requisitos sanitarios y de vacunación de cada país del itinerario. Con gusto le indicaremos las fuentes oficiales, pero las normas cambian y la responsabilidad final es suya. Consulte a su médico con tiempo antes de viajar.</p>' },
      { h: 'Durante el viaje', html: '<p>Siga las indicaciones razonables de guías y proveedores, respete las leyes y costumbres locales y avísenos de inmediato si algo no va bien, para que podamos intentar solucionarlo sobre la marcha.</p>' },
      { h: 'Nuestra responsabilidad', html: '<p>Elegimos a nuestros proveedores y preparamos su viaje con diligencia, y respondemos de los servicios que nos comprometemos a prestar. No respondemos de pérdidas, lesiones o daños causados por usted, por terceros ajenos al viaje o por hechos fuera de nuestro control que no pudieran preverse ni evitarse. Cuando los convenios internacionales limitan lo que deben pagar las compañías aéreas, ferroviarias o marítimas o los hoteles, nuestra responsabilidad se limita del mismo modo. Nada en estas condiciones limita la responsabilidad que la ley no permite limitar, incluida la derivada de muerte o lesiones personales causadas por nuestra negligencia.</p>' },
      { h: 'Reclamaciones', html: `<p>Si surge un problema durante el viaje, comuníquelo a su guía o al proveedor y contacte con nosotros enseguida para que podamos actuar sobre el terreno. Si sigue sin estar satisfecho, escríbanos a ${mail} en los 28 días siguientes a su regreso y le responderemos lo antes posible.</p>` },
      { h: 'Legislación aplicable', html: '<p>Estas condiciones se rigen por la ley aplicable al contrato entre usted y nosotros. Nada en ellas afecta a sus derechos como consumidor, incluido el derecho a acudir a los tribunales de su lugar de residencia.</p>' },
      { h: 'Contacto', html: `<p>${brand}, ${address}. Correo electrónico: ${mail}.</p>` },
    ],
  };

  const table = storage.length
    ? `<div class="legal-table"><table><thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Finalidad</th><th scope="col">Duración</th></tr></thead><tbody>${storage
        .map((s) => `<tr><td><code>${s.name}</code></td><td>${s.kind}</td><td>${s.purpose}</td><td>${s.duration}</td></tr>`)
        .join('')}</tbody></table></div>`
    : '';
  const cookies = {
    title: 'Política de cookies',
    intro: `Esta página enumera todas las cookies y todo el almacenamiento del navegador que utiliza este sitio. Última actualización: ${updated}.`,
    sections: [
      { h: 'Qué utilizamos', html: storage.length
        ? `<p>Este sitio no instala cookies publicitarias ni de seguimiento y no utiliza analítica. Solo usa lo siguiente, todo ello estrictamente necesario para funciones que usted utiliza:</p>${table}`
        : '<p>Este sitio no instala cookies ni usa almacenamiento del navegador. No utiliza scripts de analítica, publicidad ni seguimiento.</p>' },
      { h: 'Servicios de terceros', html: `<p>${enquiryNote ? enquiryNote + ' ' : ''}${thirdParty}</p>` },
      { h: 'Consentimiento', html: storage.length
        ? '<p>Como todo lo anterior es estrictamente necesario para una función que usted elige usar, la ley no nos obliga a pedir su consentimiento previo, y por eso no hay banner de cookies. Si algún día añadimos analítica u otro elemento que no sea estrictamente necesario, le pediremos su consentimiento antes de activarlo y actualizaremos esta página.</p>'
        : '<p>Como no se guarda nada en su dispositivo, no hay nada que aceptar ni banner de cookies. Si algún día añadimos analítica u otro elemento que no sea estrictamente necesario, le pediremos su consentimiento antes de activarlo y actualizaremos esta página.</p>' },
      { h: 'Cómo borrarlo o bloquearlo', html: '<p>Puede borrar las cookies y los datos del sitio en cualquier momento desde la configuración de su navegador (normalmente en Privacidad o Configuración de sitios) y bloquearlos para este sitio. El sitio seguirá funcionando; las funciones que usan el almacenamiento local simplemente olvidarán su progreso.</p>' },
      { h: 'Contacto', html: `<p>Preguntas sobre esta política: ${mail}.</p>` },
    ],
  };
  return { privacy, terms, cookies };
}


const LEGAL = { en: legalPages, fr: legalPagesFr, de: legalPagesDe, es: legalPagesEs };
module.exports = { legalPages, legalPagesFr, legalPagesDe, legalPagesEs, LEGAL };
