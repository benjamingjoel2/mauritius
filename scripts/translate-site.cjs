/**
 * Static-site translation step (no dependencies).
 *
 * The English site is built as usual into dist/. This script then writes a
 * pre-rendered copy of every page for each extra language into dist/<lang>/,
 * using the per-language dictionaries in i18n/<lang>.json:
 *
 *   { "English text or inline HTML": "Translated text or inline HTML", ... }
 *
 * What gets translated:
 *   - every run of text (with its inline tags: a, em, strong, span, br, …)
 *     between block-level tags, e.g. a whole <p> or <li>;
 *   - alt, title, aria-label, placeholder, value and the data-i18n-* attributes;
 *   - <meta> descriptions and social titles;
 *   - string literals in the page's own JS/JSON (inline <script> blocks and the
 *     files listed in `scripts`), so client-side messages are translated too.
 * Internal links are rewritten to the same language (/x/ -> /de/x/), <html lang>,
 * canonical, og:url and hreflang alternates are set, and the sitemap lists every
 * language. Strings with no translation stay in English and are reported, so a
 * build can fail on them.
 *
 * Usage:
 *   node scripts/translate-site.cjs extract           # write i18n/strings.en.json (all strings to translate)
 *   node scripts/translate-site.cjs build             # write dist/<lang>/ for every dictionary
 * Options come from i18n/config.json (see README).
 */
const fs = require('fs');
const path = require('path');

const INLINE = new Set(['a', 'abbr', 'b', 'bdi', 'br', 'cite', 'code', 'data', 'em', 'i', 'kbd', 'mark', 'q', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea']);
const ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'value', 'label', 'data-label', 'data-caption'];
const META = /^(description|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)$/;

const norm = (s) => s.replace(/\s+/g, ' ').trim();
// Dictionary keys drop the attributes of inline tags (<a href="/x/" class="y"> -> <a>), so one
// entry covers every link with the same words; the originals are put back in order.
const keyOf = (s) => norm(s.replace(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*>/g, '<$1$2>'));
function restoreTags(translated, original) {
  const queues = {};
  for (const m of original.matchAll(/<([a-zA-Z][\w-]*)\b[^>]*>/g)) (queues[m[1].toLowerCase()] ||= []).push(m[0]);
  return translated.replace(/<([a-zA-Z][\w-]*)>/g, (m, name) => (queues[name.toLowerCase()] || []).shift() || m);
}
const hasWords = (s) => /\p{L}{2,}/u.test(s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;|&#\d+;/gi, ''));

function walkHtml(dir, skip) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!skip.includes(p)) out.push(...walkHtml(p, skip)); }
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Split HTML into text and tag tokens; raw-text elements keep their content as one token. */
function tokenize(html) {
  const tokens = [];
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?([a-zA-Z][\w:-]*)\b[^>]*>/gi;
  let last = 0, m;
  while ((m = re.exec(html))) {
    if (m.index > last) tokens.push({ type: 'text', v: html.slice(last, m.index) });
    const tag = (m[1] || '').toLowerCase();
    const closing = m[0][1] === '/';
    tokens.push({ type: 'tag', v: m[0], tag, closing });
    last = re.lastIndex;
    if (!closing && RAW.has(tag)) {
      const end = html.toLowerCase().indexOf(`</${tag}`, last);
      const stop = end === -1 ? html.length : end;
      tokens.push({ type: 'raw', v: html.slice(last, stop), tag, open: m[0] });
      last = re.lastIndex = stop;
    }
  }
  if (last < html.length) tokens.push({ type: 'text', v: html.slice(last) });
  return tokens;
}

/** Group tokens into runs of text + inline tags; call fn(runHtml) and replace the run with its result. */
function mapRuns(html, fn) {
  const tokens = tokenize(html);
  let out = '', run = [];
  const flush = () => {
    if (!run.length) return;
    const s = run.join('');
    const lead = s.match(/^\s*/)[0], trail = s.slice(lead.length).match(/\s*$/)[0];
    const core = s.slice(lead.length, s.length - trail.length);
    if (core && hasWords(core) && !/data-lang-link/.test(core)) {
      // Template-built blocks (tags separated only by whitespace, e.g. a card link wrapping
      // several spans) are translated text node by text node; prose is translated whole.
      if (/>\s+</.test(core)) out += lead + core.replace(/>([^<]+)</g, (m, t) => (hasWords(t) ? '>' + t.replace(/^(\s*)([\s\S]*?)(\s*)$/, (x, a, b, c) => a + fn(b) + c) + '<' : m)) + trail;
      else out += lead + fn(core) + trail;
    } else out += s;
    run = [];
  };
  for (const t of tokens) {
    if (t.type === 'text') run.push(t.v);
    else if (t.type === 'tag' && INLINE.has(t.tag)) run.push(t.v);
    else { flush(); out += t.v; }
  }
  flush();
  return out;
}

function mapAttrs(html, fn) {
  return html.replace(/<([a-zA-Z][\w:-]*)\b([^>]*)>/g, (whole, tag, attrs) => {
    let a = attrs.replace(/\s([\w:-]+)="([^"]*)"/g, (m, name, val) => {
      const isMetaContent = name === 'content' && tag === 'meta' && META.test((attrs.match(/(?:name|property)="([^"]+)"/) || [])[1] || '');
      if ((ATTRS.includes(name) || name.startsWith('data-i18n') || isMetaContent) && hasWords(val)) return ` ${name}="${fn(val)}"`;
      return m;
    });
    return `<${tag}${a}>`;
  });
}

/** Translate string literals ("..." or '...') in JS/JSON source. */
function mapLiterals(src, fn) {
  return src.replace(/(["'])((?:\\.|(?!\1)[^\\\n])*)\1/g, (m, q, body) => {
    if (!hasWords(body)) return m;
    let decoded;
    try { decoded = q === '"' ? JSON.parse(`"${body}"`) : JSON.parse(`"${body.replace(/\\'/g, "'").replace(/"/g, '\\"')}"`); } catch { return m; }
    let t = fn(decoded, true);
    if (t === decoded) return m;
    // Keep the literal's own leading/trailing spaces (it is usually concatenated with other text).
    t = decoded.match(/^\s*/)[0] + t.trim() + decoded.match(/\s*$/)[0];
    const enc = JSON.stringify(t).slice(1, -1);
    return q === '"' ? `"${enc}"` : `'${enc.replace(/\\"/g, '"').replace(/'/g, "\\'")}'`;
  });
}

/**
 * Pair up two renderings of the same markup in different languages (same tags, different
 * words) and return { englishKey: translation } for every text run. Used to turn copy that
 * is already written per language (e.g. legal pages) into dictionary entries.
 */
function zipRuns(enHtml, trHtml) {
  const a = [], b = [];
  mapRuns(enHtml, (r) => (a.push(r), r));
  mapRuns(trHtml, (r) => (b.push(r), r));
  const out = {};
  if (a.length !== b.length) throw new Error(`zipRuns: ${a.length} vs ${b.length} runs`);
  a.forEach((r, i) => { out[keyOf(r)] = b[i].replace(/<([a-zA-Z][\w-]*)\b[^>]*>/g, '<$1>'); });
  return out;
}

/** Dictionary for one language: i18n/<lang>.json plus anything i18n/extra.cjs generates. */
function loadDict(root, lang) {
  const file = path.join(root, 'i18n', `${lang}.json`);
  const dict = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const extra = path.join(root, 'i18n', 'extra.cjs');
  return fs.existsSync(extra) ? { ...require(extra)(lang), ...dict } : dict;
}

function loadConfig(root) {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, 'i18n', 'config.json'), 'utf8'));
  return { dist: 'dist', scripts: [], skip: [], ...cfg };
}

function extract(root) {
  const cfg = loadConfig(root);
  const dist = path.join(root, cfg.dist);
  const skip = cfg.locales.map((l) => path.join(dist, l));
  const counts = new Map();
  const add = (s, isRun) => { const k = isRun ? keyOf(s) : norm(s); if (k && hasWords(k)) counts.set(k, (counts.get(k) || 0) + 1); return s; };
  for (const f of walkHtml(dist, skip)) {
    let html = fs.readFileSync(f, 'utf8');
    if (cfg.skip.some((p) => f.endsWith(p))) continue;
    mapRuns(html, (r) => add(r, true));
    mapAttrs(html, (a) => add(a));
    for (const t of tokenize(html)) if (t.type === 'raw' && t.tag === 'script' && !/application\/ld\+json|speculationrules/.test(t.open)) mapLiterals(t.v, (s) => (cfg.jsLiteral && !new RegExp(cfg.jsLiteral).test(s) ? s : add(s)));
  }
  for (const s of cfg.scripts) {
    const src = fs.readFileSync(path.join(dist, s), 'utf8');
    mapLiterals(src, (str) => (cfg.jsLiteral && !new RegExp(cfg.jsLiteral).test(str) ? str : add(str)));
  }
  const known = cfg.locales.length ? Object.keys(loadDict(root, '__none__')) : [];
  const extraFile = path.join(root, 'i18n', 'extra.cjs');
  const generated = fs.existsSync(extraFile) ? new Set(Object.keys(require(extraFile)(cfg.locales[0]))) : new Set(known);
  const list = [...counts.keys()].filter((k) => !generated.has(k)).sort();
  fs.writeFileSync(path.join(root, 'i18n', 'strings.en.json'), JSON.stringify(list, null, 1) + '\n');
  console.log(`Extracted ${list.length} strings to i18n/strings.en.json`);
  return list;
}

function build(root, { strict = false } = {}) {
  const cfg = loadConfig(root);
  const dist = path.join(root, cfg.dist);
  const site = cfg.siteUrl.replace(/\/$/, '');
  const langs = ['en', ...cfg.locales];
  const skip = cfg.locales.map((l) => path.join(dist, l));
  const pages = walkHtml(dist, skip).filter((f) => !cfg.skip.some((p) => f.endsWith(p)));
  const missing = {};
  const isAsset = (href) => /\.[a-z0-9]{2,5}([?#].*)?$/i.test(href.split('#')[0]) || cfg.assetPrefixes.some((p) => href.startsWith(p));

  // Pretty URL of a page file: dist/regions/north/index.html -> /regions/north/
  const urlOf = (f) => '/' + path.relative(dist, f).split(path.sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, cfg.cleanUrls ? '' : '.html');

  for (const lang of cfg.locales) fs.rmSync(path.join(dist, lang), { recursive: true, force: true });

  for (const lang of langs) {
    const dict = lang === 'en' ? null : loadDict(root, lang);
    const tr = (s, quiet) => {
      if (!dict) return s;
      const k = norm(s);
      if (k in dict) return dict[k];
      if (!quiet && hasWords(k)) (missing[lang] ||= new Set()).add(k);
      return s;
    };
    const prefix = (href) => (lang === 'en' ? href : `/${lang}${href}`);
    for (const f of pages) {
      let html = fs.readFileSync(f, 'utf8');
      const url = urlOf(f);
      const isPage = !/404/.test(url);
      if (lang !== 'en') {
        // Text runs, attributes and inline script literals.
        const toks = tokenize(html);
        html = toks.map((t) => {
          if (t.type === 'raw' && t.tag === 'script' && !/application\/ld\+json|speculationrules/.test(t.open)) {
            return mapLiterals(t.v, (s) => (cfg.jsLiteral && !new RegExp(cfg.jsLiteral).test(s) ? s : tr(s, true)));
          }
          if (t.type === 'raw' && t.tag === 'script' && /application\/ld\+json/.test(t.open)) {
            return mapLiterals(t.v, (s) => tr(s, true));
          }
          return t.v;
        }).join('');
        html = mapRuns(html, (s) => {
          const k = keyOf(s);
          if (k in dict) return restoreTags(dict[k], s);
          if (hasWords(k)) (missing[lang] ||= new Set()).add(k);
          return s;
        });
        html = mapAttrs(html, (s) => tr(s));
        // Internal links and form actions -> same language. Language-selector links are left alone.
        html = html.replace(/(<a\b[^>]*?\shref=|<form\b[^>]*?\saction=)"(\/[^"]*)"/g, (m, pre, href) => {
          if (/data-lang-link/.test(m) || href.startsWith('//') || isAsset(href)) return m;
          return `${pre}"${prefix(href)}"`;
        });
        // Page scripts with English strings -> translated copies under /<lang>/.
        for (const s of cfg.scripts) html = html.split(`src="/${s}"`).join(`src="/${lang}/${s}"`);
        html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
        html = html.replace(/("inLanguage":\s*")en(")/g, `$1${lang}$2`);
        html = html.replace(/<meta property="og:locale" content="[^"]*"/, `<meta property="og:locale" content="${cfg.ogLocales[lang]}"`);
      }
      // Canonical, og:url and hreflang alternates for every language.
      if (isPage) {
        html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${site}${prefix(url)}">`);
        html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${site}${prefix(url)}">`);
        html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
        const alts = langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${site}${l === 'en' ? url : `/${l}${url}`}">`).join('\n') +
          `\n<link rel="alternate" hreflang="x-default" href="${site}${url}">`;
        html = html.replace('</head>', `${alts}\n</head>`);
      }
      // Language selector: links carry data-lang-link="<lang>"; point them at this page and mark the current one.
      html = html.replace(/<a\b([^>]*?)data-lang-link="(\w+)"([^>]*)>/g, (m, a, l, b) => {
        let attrs = (a + b).replace(/\shref="[^"]*"/, '').replace(/\saria-current="[^"]*"/, '');
        const target = isPage ? url : '/';
        return `<a href="${l === 'en' ? target : `/${l}${target}`}"${l === lang ? ' aria-current="true"' : ''} data-lang-link="${l}"${attrs.replace(/\s+$/, '')}>`;
      });
      if (lang === 'en') { fs.writeFileSync(f, html); continue; }
      const out = path.join(dist, lang, path.relative(dist, f));
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, html);
    }
    if (lang !== 'en') {
      for (const s of cfg.scripts) {
        const src = fs.readFileSync(path.join(dist, s), 'utf8');
        const out = path.join(dist, lang, s);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, mapLiterals(src, (str) => (cfg.jsLiteral && !new RegExp(cfg.jsLiteral).test(str) ? str : tr(str, true))));
      }
    }
  }

  // Sitemap with every language.
  const smPath = path.join(dist, 'sitemap.xml');
  if (fs.existsSync(smPath)) {
    const sm = fs.readFileSync(smPath, 'utf8');
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, ''));
    const entries = locs.flatMap((u) => langs.map((l) => {
      const alts = langs.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${site}${x === 'en' ? u : `/${x}${u}`}"/>`).join('\n');
      return `  <url>\n    <loc>${site}${l === 'en' ? u : `/${l}${u}`}</loc>\n${alts}\n  </url>`;
    }));
    fs.writeFileSync(smPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
  }

  let total = 0;
  for (const [l, set] of Object.entries(missing)) {
    total += set.size;
    console.warn(`[i18n] ${l}: ${set.size} untranslated string(s)`);
    for (const s of [...set].slice(0, 15)) console.warn(`  - ${s.slice(0, 120)}`);
  }
  console.log(`[i18n] Wrote ${cfg.locales.length} language(s) x ${pages.length} pages`);
  if (strict && total) process.exit(1);
  return missing;
}

module.exports = { extract, build, mapRuns, mapAttrs, mapLiterals, zipRuns, keyOf };

if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  const cmd = process.argv[2];
  if (cmd === 'extract') extract(root);
  else if (cmd === 'build') build(root, { strict: process.argv.includes('--strict') });
  else console.log('usage: translate-site.cjs extract|build [--strict]');
}
