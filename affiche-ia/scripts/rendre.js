#!/usr/bin/env node
/* AFFICHE IA — rendu d'une affiche HTML en image, avec contrôles automatiques.

   node rendre.js affiche.html [autre.html …] [options]

   Options
     --echelle 2        facteur de netteté (2 = 2160 px de large pour une toile de 1080 ; 3 pour l'impression)
     --sortie f.png     nom du fichier image (par défaut : même nom que le HTML, en .png)
     --jpg              exporte aussi un JPEG léger (pratique pour WhatsApp)
     --sans-controle    saute les contrôles automatiques
     --guides           ajoute marges et tiers sur l'aperçu, pour vérifier les alignements
     --garder-html      garde le HTML résolu (icônes et chemins en dur) à côté de la source

   Produit   <nom>.png          l'affiche finale
             <nom>.apercu.jpg   la même à l'échelle 1 : c'est elle qu'il faut regarder pour le contrôle visuel
   Code de sortie : 0 si aucun défaut bloquant, 1 sinon (les fichiers sont quand même écrits).

   Dans le HTML, {{KIT}} désigne le dossier assets/ du skill :
     <link rel="stylesheet" href="{{KIT}}/kit/affiche.css">   <script src="{{KIT}}/kit/kit.js"></script>
     <img src="{{KIT}}/3d/etoile.png">                         <i class="ic" data-ic="phone"></i>            */
const fs = require('fs'), path = require('path'), cp = require('child_process'), url = require('url');

const SKILL = path.resolve(__dirname, '..');
const KIT = path.join(SKILL, 'assets');

/* ---------- arguments ---------- */
const args = process.argv.slice(2);
const opt = { echelle: 2, jpg: false, controle: true, guides: false, garder: false, sortie: null, fichiers: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--echelle') opt.echelle = parseFloat(args[++i]) || 2;
  else if (a === '--sortie') opt.sortie = args[++i];
  else if (a === '--jpg') opt.jpg = true;
  else if (a === '--sans-controle') opt.controle = false;
  else if (a === '--guides') opt.guides = true;
  else if (a === '--garder-html') opt.garder = true;
  else if (a.startsWith('--')) { console.error('Option inconnue : ' + a); process.exit(2); }
  else opt.fichiers.push(a);
}
if (!opt.fichiers.length) { console.error('Usage : node rendre.js affiche.html [--echelle 2] [--jpg] [--guides]'); process.exit(2); }

/* ---------- Playwright ---------- */
function chargerPlaywright() {
  const noms = ['playwright', 'playwright-core'];
  for (const n of noms) { try { return require(n); } catch (e) {} }
  try {
    const racine = cp.execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    for (const n of noms) { try { return require(path.join(racine, n)); } catch (e) {} }
  } catch (e) {}
  console.error('Playwright est introuvable. Dans une session cloud il est préinstallé (essayer : NODE_PATH=$(npm root -g) node rendre.js …).\n' +
    'Ailleurs : npm i -g playwright && npx playwright install chromium');
  process.exit(2);
}
async function lancer(chromium) {
  const essais = [{}];
  for (const p of [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium']) if (p && fs.existsSync(p)) essais.push({ executablePath: p });
  let err;
  for (const o of essais) { try { return await chromium.launch({ ...o, args: ['--no-sandbox', '--font-render-hinting=none'] }); } catch (e) { err = e; } }
  console.error('Chromium ne démarre pas : ' + (err && err.message.split('\n')[0])); process.exit(2);
}

/* ---------- icônes ---------- */
const cache = {};
const charge = f => cache[f] || (cache[f] = JSON.parse(fs.readFileSync(path.join(KIT, 'icones', f), 'utf8')));
function proches(nom, liste) {
  const mots = nom.split(/[-:\s]+/).filter(m => m.length > 2);
  return liste.filter(n => mots.some(m => n.includes(m))).sort((a, b) => a.length - b.length).slice(0, 8);
}
function resoudreIcones(noms) {
  const carte = {}, inconnues = [];
  for (const brut of noms) {
    const p = brut.split(':');
    if (p[0] === 'm') {                                        // marque : m:whatsapp  ou  m:whatsapp:couleur
      const M = charge('marques.json'), m = M[p[1]];
      if (!m) { inconnues.push([brut, proches(p[1] || '', Object.keys(M))]); continue; }
      const coul = p[2] === 'couleur';
      let corps = `<path d="${m.d}" fill="${coul ? m.hex : 'currentColor'}"/>`;
      if (coul && p[1] === 'tiktok') corps = `<path d="${m.d}" fill="#25F4EE" transform="translate(-.55,-.45)"/><path d="${m.d}" fill="#FE2C55" transform="translate(.55,.45)"/><path d="${m.d}" fill="#000"/>`;
      if (coul && p[1] === 'instagram') corps = `<defs><radialGradient id="igk" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#FDF497"/><stop offset=".05" stop-color="#FDF497"/><stop offset=".45" stop-color="#FD5949"/><stop offset=".6" stop-color="#D6249F"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><path d="${m.d}" fill="url(#igk)"/>`;
      carte[brut] = `<svg class="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${corps}</svg>`;
    } else {                                                   // Phosphor : phone | phone:bold | phone:regular
      const poids = ['fill', 'bold', 'regular'].includes(p[1]) ? p[1] : 'fill';
      const P = charge(`phosphor-${poids}.json`), corps = P[p[0]];
      if (!corps) { inconnues.push([brut, proches(p[0], Object.keys(P))]); continue; }
      carte[brut] = `<svg class="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">${corps}</svg>`;
    }
  }
  return { carte, inconnues };
}

/* ---------- contrôles exécutés dans la page ---------- */
function relever() {
  const A = document.querySelector('.affiche');
  if (!A) return { fatal: 'Aucun élément .affiche dans la page.' };
  const ar = A.getBoundingClientRect(), W = ar.width, H = ar.height;
  const MARGE = 34, erreurs = [], alertes = [];
  const court = t => { t = t.replace(/\s+/g, ' ').trim(); return '« ' + (t.length > 46 ? t.slice(0, 44) + '…' : t) + ' »'; };
  const alpha = c => { if (!c || c === 'transparent') return 0; const m = c.match(/\/\s*([\d.]+%?)\s*\)/) || c.match(/rgba\([^)]*,\s*([\d.]+)\s*\)/); if (!m) return 1; return m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]); };
  const encadre = el => { const s = getComputedStyle(el); if (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') return false;
    return alpha(s.backgroundColor) > 0.03 || s.backgroundImage !== 'none' || (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') || (s.backdropFilter && s.backdropFilter !== 'none'); };
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = c => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); return [...cx.getImageData(0, 0, 1, 1).data]; };

  /* blocs de texte : on regroupe les nœuds texte par ancêtre non « inline » */
  const blocs = new Map();
  const tw = document.createTreeWalker(A, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    if (!n.nodeValue.trim()) continue;
    const p = n.parentElement;
    if (!p || p.closest('[data-libre],.ecran,svg,script,style')) continue;
    const s = getComputedStyle(p);
    if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) continue;
    let b = p; while (b !== A && getComputedStyle(b).display.startsWith('inline') && getComputedStyle(b).display !== 'inline-block' && getComputedStyle(b).display !== 'inline-flex' && getComputedStyle(b).display !== 'inline-grid') b = b.parentElement;
    const r = document.createRange(); r.selectNodeContents(n);
    const rects = [...r.getClientRects()].filter(q => q.width > 0.5 && q.height > 0.5);
    if (!rects.length) continue;
    if (!blocs.has(b)) blocs.set(b, { el: b, rects: [], texte: '', tailles: [], feuilles: [] });
    const o = blocs.get(b); o.rects.push(...rects); o.texte += (o.texte && !/\s$/.test(o.texte) && !/^\s/.test(n.nodeValue) && n.previousSibling && n.previousSibling.nodeName === 'BR' ? ' ' : '') + n.nodeValue; o.tailles.push(parseFloat(s.fontSize)); o.feuilles.push(p);
  }
  const liste = [];
  for (const o of blocs.values()) {
    const x0 = Math.min(...o.rects.map(r => r.left)), y0 = Math.min(...o.rects.map(r => r.top));
    const x1 = Math.max(...o.rects.map(r => r.right)), y1 = Math.max(...o.rects.map(r => r.bottom));
    const f = o.feuilles[0], s = getComputedStyle(f);
    const libre = !!o.el.closest('[data-bord],.vertical,.credit-v');
    const petitOk = !!o.el.closest('[data-petit],.couverture,.mk-navigateur,.credit-v,.store,.etiquette-v,.logo-texte,.logo-pastille,.logo-rond');
    const degrade = !!f.closest('.degrade-texte,.metal-argent,.metal-or,.texte-3d,.contour-texte');
    liste.push({
      el: o.el, texte: o.texte, x0: x0 - ar.left, y0: y0 - ar.top, x1: x1 - ar.left, y1: y1 - ar.top,
      rects: o.rects.map(r => [r.left - ar.left, r.top - ar.top, r.width, r.height]),
      taille: Math.min(...o.tailles), tailleMax: Math.max(...o.tailles), gras: +s.fontWeight >= 700,
      couleur: rgba(s.webkitTextFillColor && s.webkitTextFillColor !== 'currentcolor' ? s.webkitTextFillColor : s.color),
      famille: s.fontFamily.split(',')[0].replace(/["']/g, '').trim(), libre, petitOk, degrade,
      superpose: !!o.el.closest('[data-superpose],.script'),
    });
  }

  /* 1. hors de l'affiche / trop près du bord */
  for (const b of liste) {
    if (b.libre) continue;
    const d = { gauche: b.x0, haut: b.y0, droite: W - b.x1, bas: H - b.y1 };
    const hors = Object.entries(d).filter(([, v]) => v < -1.5);
    if (hors.length) erreurs.push(`texte hors de l'affiche (${hors.map(([k, v]) => `${Math.round(-v)} px à ${k === 'haut' || k === 'bas' ? 'en ' + k : k}`).join(', ')}) : ${court(b.texte)}`);
    else { const pres = Object.entries(d).filter(([, v]) => v < MARGE); if (pres.length) alertes.push(`texte trop près du bord (${pres.map(([k, v]) => `${Math.round(v)} px ${k}`).join(', ')}, viser ${MARGE} px au moins) : ${court(b.texte)}`); }
  }
  /* 2. texte qui dépasse de son cadre (pilule, panneau, carte…) */
  for (const b of liste) {
    let c = b.el, saut = false;
    while (c && c !== A && !encadre(c)) { if (getComputedStyle(c).position === 'absolute') { saut = true; break; } c = c.parentElement; }
    if (saut || !c || c === A || c.matches('.fond,.calque,.voile') ) continue;
    const cr = c.getBoundingClientRect(), tol = 3, jeu = b.tailleMax * 0.2;
    const dep = { gauche: (cr.left - ar.left) - b.x0, haut: (cr.top - ar.top) - (b.y0 + jeu), droite: b.x1 - (cr.right - ar.left), bas: (b.y1 - jeu) - (cr.bottom - ar.top) };
    const k = Object.entries(dep).filter(([, v]) => v > tol);
    if (k.length) erreurs.push(`texte qui dépasse de son cadre .${(c.className || c.tagName).toString().split(' ').slice(0, 2).join('.')} (${k.map(([n, v]) => `${Math.round(v)} px ${n}`).join(', ')}) : ${court(b.texte)}`);
  }
  /* 3. textes superposés */
  for (let i = 0; i < liste.length; i++) for (let j = i + 1; j < liste.length; j++) {
    const a = liste[i], b = liste[j];
    if (a.superpose || b.superpose || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    let aire = 0;
    const coeur = r => [r[0], r[1] + r[3] * 0.22, r[2], r[3] * 0.56];
    for (const qa of a.rects) for (const qb of b.rects) {
      const ra = coeur(qa), rb = coeur(qb);
      const w = Math.min(ra[0] + ra[2], rb[0] + rb[2]) - Math.max(ra[0], rb[0]), h = Math.min(ra[1] + ra[3], rb[1] + rb[3]) - Math.max(ra[1], rb[1]);
      if (w > 0 && h > 0) aire += w * h;
    }
    const mini = 0.56 * Math.min(a.rects.reduce((s, r) => s + r[2] * r[3], 0), b.rects.reduce((s, r) => s + r[2] * r[3], 0));
    if (aire > 0.10 * mini && aire > 150) alertes.push(`deux textes se chevauchent : ${court(a.texte)} et ${court(b.texte)} (ajouter data-superpose si c'est voulu)`);
  }
  /* 4. taille minimale, texte de remplissage */
  const ech = W / 1080;
  for (const b of liste) {
    if (/lorem ipsum|à compléter|a completer|\bTODO\b|\{\{|0000 0000|xxxx/i.test(b.texte)) erreurs.push(`texte de remplissage à remplacer : ${court(b.texte)}`);
    if (b.petitOk || b.libre) continue;
    const t = b.taille / ech;
    if (t < 17) erreurs.push(`texte illisible sur téléphone (${Math.round(t)} px, minimum 20) : ${court(b.texte)}`);
    else if (t < 20) alertes.push(`texte petit (${Math.round(t)} px, viser 22 px et plus) : ${court(b.texte)}`);
  }
  /* 5. polices */
  const declarees = new Set([...document.fonts].map(f => f.family.replace(/["']/g, '')));
  const utilisees = new Set(liste.map(b => b.famille));
  for (const f of utilisees) if (!declarees.has(f) && !/^(serif|sans-serif|monospace|cursive|system-ui)$/.test(f)) erreurs.push(`police « ${f} » absente du kit : le texte est rendu avec une police de secours (voir la liste dans references/moteur.md)`);
  if (utilisees.size > 3) alertes.push(`${utilisees.size} polices différentes (${[...utilisees].join(', ')}) : s'en tenir à 2, plus une manuscrite au besoin`);
  /* 6. images */
  for (const im of A.querySelectorAll('img')) {
    const nom = (im.getAttribute('src') || '').split('/').pop();
    if (!im.complete || !im.naturalWidth) { erreurs.push(`image introuvable : ${im.getAttribute('src')}`); continue; }
    const r = im.getBoundingClientRect(); if (r.width < 2) continue;
    const fit = getComputedStyle(im).objectFit;
    const z = fit === 'cover' ? Math.max(r.width / im.naturalWidth, r.height / im.naturalHeight) : Math.min(r.width / im.naturalWidth, r.height / im.naturalHeight);
    const flou = /blur\(/.test(getComputedStyle(im).filter) || im.closest('.flou,.flou1,.flou2,.flou3');
    if (z > 1.3 && !flou) alertes.push(`image agrandie ×${z.toFixed(1)} (${nom}, ${im.naturalWidth} px affichée sur ${Math.round(r.width)} px) : elle sera floue, la réduire ou fournir une image plus grande`);
  }
  /* 7. composants hors de l'affiche */
  for (const el of A.querySelectorAll('.panneau,.pilule,.cta,.barre-contact,.pilule-double,.pave,.carte-prix,.url,.infoline,.chip,.store')) {
    if (el.closest('[data-bord]')) continue;
    const r = el.getBoundingClientRect();
    const hors = Math.max(ar.left - r.left, r.right - ar.right, ar.top - r.top, r.bottom - ar.bottom);
    if (hors > 2) alertes.push(`bloc .${el.className.split(' ').slice(0, 2).join('.')} coupé par le bord de l'affiche (${Math.round(hors)} px) : ajouter data-bord si c'est voulu`);
  }
  return { W, H, erreurs, alertes, blocs: liste.map(({ el, ...r }) => r) };
}

/* contraste et visibilité : compare l'affiche avec et sans ses textes */
async function analyserPixels(page, normal, sansTexte, blocs, W, H) {
  return await page.evaluate(async ({ a, b, blocs, W, H }) => {
    const img = src => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });
    const [ia, ib] = await Promise.all([img(a), img(b)]);
    const mk = i => { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(i, 0, 0, W, H); return x; };
    const xa = mk(ia), xb = mk(ib);
    const lum = (r, g, b) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const out = [];
    for (const bl of blocs) {
      let somme = [0, 0, 0], n = 0, encre = 0, lums = [];
      const tranches = [];
      for (const [x, y, w, h] of bl.rects) {
        const X = Math.max(0, Math.floor(x)), Y = Math.max(0, Math.floor(y)), Wd = Math.min(W - X, Math.ceil(w)), Hd = Math.min(H - Y, Math.ceil(h));
        if (Wd < 2 || Hd < 2) continue;
        const da = xa.getImageData(X, Y, Wd, Hd).data, db = xb.getImageData(X, Y, Wd, Hd).data;
        const nt = Math.max(1, Math.min(6, Math.floor(Wd / 70))), tr = Array.from({ length: nt }, () => [0, 0]);
        for (let p = 0, px = 0; p < da.length; p += 4, px++) {
          somme[0] += db[p]; somme[1] += db[p + 1]; somme[2] += db[p + 2]; n++;
          if (px % 7 === 0) lums.push(lum(db[p], db[p + 1], db[p + 2]));
          const d = Math.abs(da[p] - db[p]) + Math.abs(da[p + 1] - db[p + 1]) + Math.abs(da[p + 2] - db[p + 2]);
          const t = tr[Math.min(nt - 1, Math.floor(((px % Wd) / Wd) * nt))]; t[1]++;
          if (d > 48) { encre++; t[0]++; }
        }
        if (nt > 1) tranches.push(tr.map(t => t[0] / t[1]));
      }
      if (!n) continue;
      const fond = somme.map(v => v / n), lf = lum(...fond);
      lums.sort((p, q) => p - q);
      const p15 = lums[Math.floor(lums.length * 0.15)], p85 = lums[Math.floor(lums.length * 0.85)];
      const al = bl.couleur[3] / 255, c = bl.couleur.slice(0, 3).map((v, i) => v * al + fond[i] * (1 - al)), lt = lum(...c);
      const pire = Math.min(ratio(lt, p15), ratio(lt, p85));
      let trou = false;
      for (const tr of tranches) { const m = [...tr].sort((p, q) => p - q)[Math.floor(tr.length / 2)]; if (m > 0.05 && tr.some(v => v < m * 0.08)) trou = true; }
      out.push({ texte: bl.texte, contraste: ratio(lt, lf), pire, encre: encre / n, trou, taille: bl.taille, gras: bl.gras, degrade: bl.degrade });
    }
    return out;
  }, { a: 'data:image/png;base64,' + normal.toString('base64'), b: 'data:image/png;base64,' + sansTexte.toString('base64'), blocs, W, H });
}

/* ---------- préparation d'une page ---------- */
async function preparer(page, fichierUrl) {
  await page.goto(fichierUrl, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const aKit = await page.evaluate(() => !!window.kit);
  if (!aKit) return { avertir: 'kit.js n\'est pas chargé dans la page : ajouter <script src="{{KIT}}/kit/kit.js"></script> avant </body>.' };
  await page.evaluate(() => window.kit.formes());
  const noms = await page.evaluate(() => window.kit.icones());
  const { carte, inconnues } = resoudreIcones(noms);
  await page.evaluate(c => window.kit.poser(c), carte);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 15000 }).catch(() => {});
  const ajust = await page.evaluate(() => window.kit.ajuster());
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(120);
  return { inconnues, ajust };
}

(async () => {
  const { chromium } = chargerPlaywright();
  const nav = await lancer(chromium);
  let bloquant = false;
  for (const f of opt.fichiers) {
    const src = path.resolve(f);
    if (!fs.existsSync(src)) { console.error('Fichier introuvable : ' + f); bloquant = true; continue; }
    const dir = path.dirname(src), base = path.basename(src).replace(/\.html?$/i, '');
    const kitUrl = url.pathToFileURL(KIT).href.replace(/\/$/, '');
    const html = fs.readFileSync(src, 'utf8').split('{{KIT}}').join(kitUrl);
    const tmp = path.join(dir, `.${base}.rendu.html`);
    fs.writeFileSync(tmp, html);
    const tmpUrl = url.pathToFileURL(tmp).href;
    const png = opt.sortie && opt.fichiers.length === 1 ? path.resolve(opt.sortie) : path.join(dir, base + '.png');
    const apercu = png.replace(/\.png$/i, '') + '.apercu.jpg';
    console.log(`\n── ${path.basename(src)}`);
    try {
      /* passe 1 : échelle 1 — contrôles + aperçu */
      const c1 = await nav.newContext({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
      const p1 = await c1.newPage();
      const journal = []; p1.on('console', m => { if (m.type() === 'error') journal.push(m.text()); }); p1.on('pageerror', e => journal.push(String(e)));
      const prep = await preparer(p1, tmpUrl);
      if (prep.avertir) console.log('  ✗ ' + prep.avertir);
      const toile = p1.locator('.affiche').first();
      if (!(await toile.count())) { console.log('  ✗ aucun élément .affiche dans la page'); bloquant = true; await c1.close(); continue; }
      const boite = await toile.boundingBox();
      await p1.setViewportSize({ width: Math.ceil(boite.x + boite.width), height: Math.ceil(boite.y + boite.height) });
      let erreurs = [], alertes = [];
      for (const [nom, sug] of prep.inconnues || []) erreurs.push(`icône inconnue « ${nom} »${sug.length ? ' — proches : ' + sug.join(', ') : ''} (chercher : node scripts/icones.js <mot>)`);
      for (const a of prep.ajust || []) (a.limite ? erreurs : alertes).push(a.limite ? `texte trop long pour sa place, même réduit de moitié : « ${a.texte} » — le raccourcir` : `texte réduit automatiquement de ${a.de} à ${a.a} px pour tenir : « ${a.texte} »`);
      for (const j of journal) if (!/favicon/.test(j)) alertes.push('console : ' + j.slice(0, 160));
      if (opt.controle) {
        const r = await p1.evaluate(relever);
        if (r.fatal) { console.log('  ✗ ' + r.fatal); bloquant = true; await c1.close(); continue; }
        erreurs.push(...r.erreurs); alertes.push(...r.alertes);
        const normal = await toile.screenshot({ type: 'png' });
        // on efface seulement le remplissage des lettres : « color » reste intact, car les formes du kit
        // (vagues, badges, pinceaux) se colorent avec currentColor et doivent rester dans le fond mesuré
        await p1.addStyleTag({ content: '.affiche *{-webkit-text-fill-color:transparent !important;text-shadow:none !important;-webkit-text-stroke-color:transparent !important}.degrade-texte,.metal-argent,.metal-or,.texte-3d{background-image:none !important}' });
        const sans = await toile.screenshot({ type: 'png' });
        const pa = await c1.newPage(); await pa.goto('about:blank');
        const px = await analyserPixels(pa, normal, sans, r.blocs.filter(b => !b.libre), Math.round(r.W), Math.round(r.H));
        await pa.close();
        const court = t => { t = t.replace(/\s+/g, ' ').trim(); return '« ' + (t.length > 46 ? t.slice(0, 44) + '…' : t) + ' »'; };
        for (const b of px) {
          if (b.encre < 0.012) { erreurs.push(`texte invisible ou caché par un autre élément : ${court(b.texte)}`); continue; }
          if (b.trou) alertes.push(`texte peut-être masqué en partie (vérifier sur l'aperçu) : ${court(b.texte)}`);
          if (b.degrade) continue;
          const grand = b.taille >= 40 || (b.taille >= 30 && b.gras), seuil = grand ? 3 : 4.2;
          if (b.contraste < seuil * 0.62) erreurs.push(`texte illisible sur son fond (contraste ${b.contraste.toFixed(1)}, il faut ${seuil}) : ${court(b.texte)}`);
          else if (b.contraste < seuil) alertes.push(`contraste faible (${b.contraste.toFixed(1)}, viser ${seuil}) : ${court(b.texte)}`);
          else if (b.pire < 1.5) alertes.push(`une partie du fond a presque la couleur du texte (vérifier sur l'aperçu) : ${court(b.texte)}`);
        }
        await p1.reload({ waitUntil: 'load' }); await preparer(p1, tmpUrl);
      }
      if (opt.guides) await p1.evaluate(() => {
        const A = document.querySelector('.affiche'), g = document.createElement('div');
        g.style.cssText = 'position:absolute;inset:0;z-index:99999;pointer-events:none';
        const m = parseFloat(getComputedStyle(A).getPropertyValue('--marge')) || 64, L = (css) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;' + css; g.appendChild(d); };
        L(`inset:${m}px;border:1.5px dashed rgba(255,0,180,.9)`);
        for (const p of [33.333, 66.666]) { L(`left:${p}%;top:0;bottom:0;border-left:1px solid rgba(0,255,255,.7)`); L(`top:${p}%;left:0;right:0;border-top:1px solid rgba(0,255,255,.7)`); }
        L('left:50%;top:0;bottom:0;border-left:1px dashed rgba(255,255,0,.8)');
        A.appendChild(g);
      });
      fs.writeFileSync(apercu, await p1.locator('.affiche').first().screenshot({ type: 'jpeg', quality: 86 }));
      await c1.close();

      /* passe 2 : échelle finale */
      const c2 = await nav.newContext({ viewport: { width: Math.ceil(boite.x + boite.width), height: Math.ceil(boite.y + boite.height) }, deviceScaleFactor: opt.echelle });
      const p2 = await c2.newPage(); await preparer(p2, tmpUrl);
      const t2 = p2.locator('.affiche').first();
      fs.writeFileSync(png, await t2.screenshot({ type: 'png' }));
      if (opt.jpg) fs.writeFileSync(png.replace(/\.png$/i, '') + '.jpg', await t2.screenshot({ type: 'jpeg', quality: 92 }));
      await c2.close();

      console.log(`  ✓ ${path.basename(png)}  ${Math.round(boite.width * opt.echelle)}×${Math.round(boite.height * opt.echelle)} px` + (opt.jpg ? '  (+ .jpg)' : ''));
      console.log(`  ✓ ${path.basename(apercu)}  → à regarder pour le contrôle visuel`);
      if (opt.controle) {
        erreurs = [...new Set(erreurs)]; alertes = [...new Set(alertes)];
        console.log(`  Contrôles : ${erreurs.length} défaut(s) bloquant(s), ${alertes.length} alerte(s)`);
        erreurs.forEach(e => console.log('   ✗ ' + e)); alertes.forEach(a => console.log('   ⚠ ' + a));
        if (erreurs.length) bloquant = true;
      }
    } catch (e) { console.log('  ✗ rendu impossible : ' + e.message.split('\n')[0]); bloquant = true; }
    finally { if (opt.garder) fs.renameSync(tmp, path.join(dir, base + '.resolu.html')); else fs.rmSync(tmp, { force: true }); }
  }
  await nav.close();
  process.exit(bloquant ? 1 : 0);
})();
