// ---------------------------------------------------------------------------
// Brand config: the one file to edit to rebrand the site.
//
// Everything brand-specific lives here: name, tagline, contact details,
// palette and the enquiry endpoint. Page copy refers to the brand through
// these values, so swapping "Kreol Coast" for "Le Morne & Co." (or anything
// else) is a change to this file plus `npm run build`.
//
// The build checks every text/background pair listed in `contrastPairs`
// against WCAG AA (4.5:1) and fails if any pair drops below it, so a palette
// swap can't quietly break accessibility.
// ---------------------------------------------------------------------------

module.exports = {
  brand: {
    name: "Kreol Coast",
    // Two letters shown in the round logo mark.
    monogram: "KC",
    tagline: "Mauritius beyond the resort",
    // One sentence used in the footer, meta descriptions and the About page.
    pitch:
      "Food, hikes, culture and quieter coasts in Mauritius and Rodrigues, for couples and families who want more than a sunbed.",
    // Why the brand is called what it is. Shown on the About page.
    nameStory:
      "Kreol Morisien is the language almost everyone on Mauritius shares at home and in the street, whatever their family's roots in India, Africa, Madagascar, China or France. We took our name from it because that mix is the island we want to show you.",
    // Alternative name kept for reference. Not used anywhere on the site.
    // name: "Le Morne & Co.", monogram: "LM",
    // nameStory: "Named after Le Morne Brabant, the UNESCO-listed mountain on the south-west tip of Mauritius and the island's most powerful landmark.",
  },

  // Public URL of the deployed site, used for canonical links, the sitemap and
  // social cards. No trailing slash.
  siteUrl: "https://kreol-coast.vercel.app",

  // PLACEHOLDER contact details. Replace before launch.
  contact: {
    email: "hello@example.com",
    phone: "+230 5000 0000",
    whatsapp: "+230 5000 0000",
    address: "Placeholder address, Port Louis, Mauritius",
    hours: "Monday to Friday, 9:00 to 17:00 Mauritius time (UTC+4)",
  },

  enquiry: {
    // Where the enquiry form posts. Leave empty and the form opens the
    // visitor's email app with the enquiry filled in, addressed to
    // contact.email. Any service that accepts a JSON POST works, for example
    // a Formspree endpoint like "https://formspree.io/f/abcdwxyz".
    endpoint: "",
  },

  // Palette. Names describe where each colour comes from on the island.
  palette: {
    lagoon: "#0B6670", // deep lagoon: links, primary buttons
    lagoonBright: "#5ED1C8", // shallow lagoon: highlights on dark
    lagoonMist: "#DCEDEA", // lagoon tint: soft panels
    cane: "#3B6421", // sugar-cane leaf
    caneLight: "#C3D98E", // young cane
    rust: "#9A3B19", // Chamarel red earth
    violet: "#5B3B7C", // Chamarel violet earth
    ochre: "#E2A93F", // Chamarel ochre earth
    coral: "#F08066", // coral
    sand: "#F3EEE4", // white sand: page background
    sandDeep: "#E8DFCF", // wet sand: alternate panels
    ink: "#11201F", // body text and dark sections (lagoon at night)
    inkSoft: "#47534F", // secondary text
    fog: "#AEB9B4", // secondary text on dark sections
    white: "#FFFFFF",
  },

  // [text, background] pairs the stylesheet actually uses. Checked at build.
  contrastPairs: [
    ["ink", "sand"],
    ["inkSoft", "sand"],
    ["lagoon", "sand"],
    ["rust", "sand"],
    ["violet", "sand"],
    ["cane", "sand"],
    ["ink", "sandDeep"],
    ["inkSoft", "sandDeep"],
    ["rust", "sandDeep"],
    ["lagoon", "sandDeep"],
    ["ink", "lagoonMist"],
    ["lagoon", "lagoonMist"],
    ["inkSoft", "lagoonMist"],
    ["white", "lagoon"],
    ["white", "rust"],
    ["white", "violet"],
    ["white", "cane"],
    ["ink", "coral"],
    ["ink", "ochre"],
    ["ink", "lagoonBright"],
    ["ink", "caneLight"],
    ["ink", "white"],
    ["inkSoft", "white"],
    ["lagoon", "white"],
    ["rust", "white"],
    ["cane", "white"],
    ["violet", "white"],
    ["sand", "ink"],
    ["lagoonBright", "ink"],
    ["ochre", "ink"],
    ["caneLight", "ink"],
    ["coral", "ink"],
    ["fog", "ink"],
  ],
};
