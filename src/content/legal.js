/** @typedef {{ title: string, intro: string, sections: { h: string, html: string }[] }} LegalDoc */

/**
 * Legal page copy: Privacy Policy, Booking Terms and Cookie Policy, written in full in
 * English, French, German and Spanish (src/content/legal.json). Each document is split
 * into { h, html } sections so the page template and the translation dictionary
 * (i18n/extra.cjs) can use it. The JSON holds the brand name, email and address.
 */
const DATA = require("./legal.json");

const split = (html) =>
  [...html.matchAll(/<section><h2>([\s\S]*?)<\/h2>\n([\s\S]*?)\n<\/section>/g)].map((m) => ({ h: m[1], html: m[2] }));

/** @returns {{ privacy: LegalDoc, terms: LegalDoc, cookies: LegalDoc }} */
const pages = (lang) => {
  const d = DATA[lang];
  const doc = (k) => ({ title: d[k].title, intro: `${d[k].updated}.`, sections: split(d[k].html) });
  return { privacy: doc("privacy"), terms: doc("terms"), cookies: doc("cookies") };
};

const LEGAL = { en: () => pages("en"), fr: () => pages("fr"), de: () => pages("de"), es: () => pages("es") };
module.exports = { LEGAL };
