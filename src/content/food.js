// Food page content and the street-food trail. Every claim is listed in
// FACTS-TO-VERIFY.md.

// Culinary roots, used for the coloured tags on the trail. `color` is a
// palette key from site.config.js and must pass the contrast check with ink
// text (see contrastPairs).
const roots = {
  indian: { label: "Indian roots", color: "ochre" },
  creole: { label: "Creole", color: "coral" },
  chinese: { label: "Chinese roots", color: "lagoonBright" },
  french: { label: "French influence", color: "caneLight" },
};

// The trail runs in the order you'd eat through a day.
const trail = [
  {
    slug: "dholl-puri",
    name: "Dholl puri",
    say: "dol-poo-ree",
    when: "Breakfast to lunch",
    whenDetail:
      "Best mid-morning, fresh off the griddle. Popular stalls can sell out by early afternoon.",
    roots: ["indian", "creole"],
    what: "Two soft, thin flatbreads with a layer of ground yellow split peas cooked inside, folded around bean curry (cari gros pois), rougaille and a spoon of chutney or achard.",
    story:
      "It descends from the dal puri brought by indentured labourers from what is now Bihar and Uttar Pradesh in the 19th century. The fillings it's served with, like rougaille, a tomato sauce with Creole and French roots, make it unmistakably Mauritian.",
    where: "Stalls and vans in Port Louis, Rose-Hill and outside most markets.",
  },
  {
    slug: "farata",
    name: "Farata",
    say: "fa-ra-ta",
    when: "Breakfast or lunch",
    whenDetail: "A filling midday meal, and a weekend family favourite at home.",
    roots: ["indian", "creole"],
    what: "A flaky, layered flatbread, cooked on a flat pan with ghee or oil and torn by hand to scoop up curries, rougaille and pickles.",
    story:
      "The name and the method come from the Indian paratha. On the island it's often eaten with Creole dishes, and you'll find it everywhere from roadside stalls to Sunday lunch tables.",
    where: "The same stalls that sell dholl puri usually sell farata too.",
  },
  {
    slug: "mine-frit",
    name: "Mine frit",
    say: "meen freet",
    when: "Lunch",
    whenDetail:
      "A quick, cheap lunch. Look for the queue of office workers around midday.",
    roots: ["chinese", "creole"],
    what: "Stir-fried egg noodles with vegetables, egg and a choice of chicken, prawn or beef, finished with soy and a dash of chilli sauce.",
    story:
      "It came with Chinese families, many of them Hakka-speaking, who settled from the 19th century and ran the island's village shops. 'Mine' is the Kreol word for noodles; 'frit' is French for fried.",
    where: "Port Louis Chinatown, food courts and snack counters across the island.",
  },
  {
    slug: "gateau-piment",
    name: "Gateau piment",
    say: "ga-toh pee-mahn",
    when: "Afternoon snack",
    whenDetail:
      "Eaten hot, any time, but especially mid-afternoon or with tea. Buy them by the bag.",
    roots: ["indian", "french"],
    what: "Small, crisp chilli fritters made from ground split peas, chopped chilli, spring onion and herbs, fried until golden.",
    story:
      "The fritter is a cousin of Indian vada; the name is French for 'chilli cake'. A classic way to eat it is split inside a buttered baguette or pain maison, the island's bread rolls, which are a French legacy.",
    where: "Street vendors with glass cases on bicycles and stalls outside schools and bus stations.",
  },
  {
    slug: "alouda",
    name: "Alouda",
    say: "a-loo-da",
    when: "Hot afternoons",
    whenDetail: "A cold drink for the hottest part of the day, and a treat after the market.",
    roots: ["indian"],
    what: "A sweet, chilled milk drink with basil seeds (tookmaria) and strips of agar jelly, usually flavoured with vanilla or almond, sometimes topped with ice cream.",
    story:
      "It's the Mauritian version of falooda, the drink brought from the Indian subcontinent, where it in turn has Persian roots.",
    where: "Port Louis Central Market is famous for it; most markets have an alouda stall.",
  },
];

// Short notes on the island's main cooking traditions, for the food page.
const traditions = [
  {
    title: "Indian",
    color: "ochre",
    text: "Most Mauritians have family roots in India. Curries (cari), dal, chutneys, achard pickles and flatbreads are everyday food, alongside festival sweets at Diwali.",
  },
  {
    title: "Creole",
    color: "coral",
    text: "The cooking of Afro-Malagasy and mixed families: rougaille (tomato, garlic, thyme and chilli), octopus curry, salted fish, and cari with whatever's fresh.",
  },
  {
    title: "Chinese",
    color: "lagoonBright",
    text: "Mine frit, boulettes (steamed dumplings in broth), mine bouille (boiled noodles) and the Chinatown bakeries of Port Louis.",
  },
  {
    title: "French",
    color: "caneLight",
    text: "Bread, pastries, daubes and wine-based sauces from the colonial era, plus the habit of a long Sunday lunch.",
  },
];

module.exports = { roots, trail, traditions };
