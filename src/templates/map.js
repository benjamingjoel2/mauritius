// Schematic map of Mauritius for the coast chooser. The outline is a rough
// trace through real coastal towns (lat/lon), not a survey-grade map; it's
// labelled as schematic on the page.

const { esc } = require("./helpers");

// Clockwise from the northern tip. `coast` says which coast the segment
// starting at this point belongs to.
const COAST = [
  [-19.985, 57.613, "north"], // Cap Malheureux
  [-20.005, 57.665, "north"], // Grand Gaube
  [-20.06, 57.7, "east"], // Poudre d'Or
  [-20.11, 57.72, "east"], // Roches Noires
  [-20.135, 57.755, "east"], // Poste Lafayette
  [-20.19, 57.775, "east"], // Belle Mare
  [-20.24, 57.79, "east"], // Trou d'Eau Douce
  [-20.29, 57.78, "east"], // Grand River South East
  [-20.37, 57.725, "east"], // Vieux Grand Port
  [-20.405, 57.705, "south"], // Mahébourg
  [-20.445, 57.715, "south"], // Blue Bay
  [-20.47, 57.66, "south"], // Plaine Magnien coast
  [-20.5, 57.58, "south"], // Gris Gris
  [-20.52, 57.52, "south"], // Souillac
  [-20.505, 57.4, "south"], // Bel Ombre
  [-20.49, 57.37, "south"], // Baie du Cap
  [-20.47, 57.31, "west"], // Le Morne
  [-20.43, 57.355, "west"], // La Gaulette
  [-20.36, 57.37, "west"], // Black River
  [-20.325, 57.37, "west"], // Tamarin
  [-20.28, 57.365, "west"], // Flic en Flac
  [-20.21, 57.4, "west"], // Albion
  [-20.16, 57.495, "north"], // Port Louis
  [-20.06, 57.515, "north"], // Pointe aux Piments
  [-20.035, 57.545, "north"], // Trou aux Biches
  [-20.01, 57.58, "north"], // Grand Baie
];

const K = 420;
const LON0 = 57.25;
const LAT0 = -19.93;
const COS = Math.cos((20.2 * Math.PI) / 180);

const project = ([lat, lon]) => [
  +((lon - LON0) * K * COS).toFixed(1),
  +((LAT0 - lat) * K).toFixed(1),
];

const SPOTS = [
  { name: "Le Morne", lat: -20.45, lon: 57.315, kite: true },
  { name: "Belle Mare", lat: -20.19, lon: 57.775, kite: true },
  { name: "Anse la Raie", lat: -19.995, lon: 57.645, kite: true },
  { name: "Port Louis", lat: -20.16, lon: 57.5, kite: false },
];

const LABELS = {
  north: [-19.94, 57.56],
  east: [-20.2, 57.86],
  south: [-20.58, 57.55],
  west: [-20.3, 57.26],
};

function coastMap(ratings = {}) {
  const points = COAST.map(project);
  const outline = points.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ") + " Z";

  // Group consecutive points into one polyline per coast.
  const segments = {};
  COAST.forEach((pt, i) => {
    const coast = pt[2];
    const next = points[(i + 1) % points.length];
    (segments[coast] ||= []).push([points[i], next]);
  });
  const paths = Object.entries(segments)
    .map(
      ([coast, segs]) =>
        `<path class="coast coast-${coast} rating-${ratings[coast] ?? 1}" data-coast="${coast}" d="${segs
          .map(([a, b]) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`)
          .join(" ")}"/>`,
    )
    .join("");

  const labels = Object.entries(LABELS)
    .map(([coast, ll]) => {
      const [x, y] = project(ll);
      return `<text class="map-label" x="${x}" y="${y}" text-anchor="middle">${coast[0].toUpperCase() + coast.slice(1)}</text>`;
    })
    .join("");

  const spots = SPOTS.map((s) => {
    const [x, y] = project([s.lat, s.lon]);
    return `<g class="map-spot${s.kite ? " map-spot-kite" : ""}"><circle cx="${x}" cy="${y}" r="${s.kite ? 4 : 3}"/><text x="${x + (s.lon > 57.6 ? -7 : 7)}" y="${y + 4}" text-anchor="${s.lon > 57.6 ? "end" : "start"}">${esc(s.name)}</text></g>`;
  }).join("");

  // Arrow showing the south-east trade winds.
  return `<svg class="coast-map" viewBox="-20 -10 290 325" role="img" aria-labelledby="map-title map-desc">
  <title id="map-title">Schematic map of Mauritius</title>
  <desc id="map-desc">Each coast is coloured by how calm its water is in the selected month. Kitesurf spots are marked with dots. The arrow shows the south-east trade winds.</desc>
  <path class="island" d="${outline}"/>
  ${paths}
  ${labels}
  ${spots}
  <g class="wind-arrow" aria-hidden="true">
    <line x1="255" y1="290" x2="215" y2="250"/>
    <path d="M215 250 l12 2 l-10 10 z"/>
    <text x="250" y="304" text-anchor="end">SE trade winds</text>
  </g>
</svg>`;
}

module.exports = { coastMap };
