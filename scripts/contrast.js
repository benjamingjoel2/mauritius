// WCAG 2.x contrast ratio helpers. Used by build.js to check the palette in
// site.config.js; run `npm run check:contrast` to print every pair.

function luminance(hex) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function checkContrast(config, min = 4.5) {
  const results = config.contrastPairs.map(([fg, bg]) => {
    if (!config.palette[fg] || !config.palette[bg]) throw new Error(`Unknown palette colour in pair ${fg}/${bg}`);
    return { fg, bg, ratio: ratio(config.palette[fg], config.palette[bg]) };
  });
  return results.filter((r) => r.ratio < min);
}

module.exports = { luminance, ratio, checkContrast };

if (require.main === module) {
  const config = require("../site.config");
  for (const [fg, bg] of config.contrastPairs) {
    const r = ratio(config.palette[fg], config.palette[bg]);
    console.log(`${r >= 4.5 ? "pass" : "FAIL"}  ${r.toFixed(2)}:1  ${fg} on ${bg}`);
  }
}
