/* AFFICHE IA — kit.js
   Trace dans la page les formes que le CSS seul ne sait pas dessiner (éclats, nuages, vagues,
   coups de pinceau, ovale à la main…), pose les puces des listes et ajuste les textes marqués
   data-ajuste. Les icônes [data-ic] sont injectées par scripts/rendre.js (elles viennent des
   fichiers assets/icones/*.json). */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  let uid = 0;
  const svg = (viewBox, inner, extra = '') =>
    `<svg xmlns="${NS}" viewBox="${viewBox}" ${extra}>${inner}</svg>`;
  const num = (v, d) => (v === undefined || v === '' || isNaN(+v) ? d : +v);

  /* ---------- formes ---------- */
  function eclat(n = 18, creux = 0.84) {           // E06 étoile dentelée
    const p = [];
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? 50 * creux : 50, a = (Math.PI * i) / n - Math.PI / 2;
      p.push((50 + r * Math.cos(a)).toFixed(2) + ',' + (50 + r * Math.sin(a)).toFixed(2));
    }
    return svg('0 0 100 100', `<polygon points="${p.join(' ')}" fill="currentColor"/>`, 'class="forme"');
  }
  function nuage(n = 8) {                           // E08 fleur / nuage à lobes
    const rd = 29, rl = 50 - rd; let c = `<circle cx="50" cy="50" r="${rd + 6}"/>`;
    for (let i = 0; i < n; i++) {
      const a = (2 * Math.PI * i) / n;
      c += `<circle cx="${(50 + rd * Math.cos(a)).toFixed(2)}" cy="${(50 + rd * Math.sin(a)).toFixed(2)}" r="${rl}"/>`;
    }
    return svg('0 0 100 100', `<g fill="currentColor">${c}</g>`, 'class="forme"');
  }
  const VAGUES = {                                  // B01 (coordonnées en %, étirées à la taille du bloc)
    douce:    ['M0,38 C18,8 34,4 52,30 C68,54 84,52 100,22 L100,100 L0,100Z'],
    colline:  ['M0,62 C24,12 56,0 100,46 L100,100 L0,100Z'],
    creux:    ['M0,8 C28,74 72,74 100,8 L100,100 L0,100Z'],
    montante: ['M0,84 C38,80 62,26 100,6 L100,100 L0,100Z'],
    descendante: ['M0,6 C38,26 62,80 100,84 L100,100 L0,100Z'],
    alpha:    ['M0,24 C16,4 32,8 44,40 C56,74 76,66 100,30 L100,100 L0,100Z'],
    double:   ['M0,30 C22,0 40,10 58,34 C74,56 88,50 100,26 L100,100 L0,100Z|.45',
               'M0,52 C20,24 40,26 56,48 C72,70 88,68 100,44 L100,100 L0,100Z'],
  };
  function vague(nom) {
    const d = VAGUES[nom] || VAGUES.douce;
    return svg('0 0 100 100', d.map(s => { const [p, o] = s.split('|'); return `<path d="${p}" fill="currentColor"${o ? ` opacity="${o}"` : ''}/>`; }).join(''), 'preserveAspectRatio="none"');
  }
  function rugueux(seed, f = '0.03 0.11', force = 22) {
    const id = 'rg' + (++uid);
    return [id, `<filter id="${id}" x="-15%" y="-40%" width="130%" height="180%"><feTurbulence type="fractalNoise" baseFrequency="${f}" numOctaves="3" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${force}" xChannelSelector="R" yChannelSelector="G"/></filter>`];
  }
  function traitPinceau(forme) {                    // T12 soulignement
    const [id, flt] = rugueux(3 + +forme, '0.02 0.4', 7);
    const F = {
      1: `<path d="M6,24 C70,9 210,3 394,13 C398,14 398,17 394,18 C300,16 170,19 78,29 C150,22 300,22 372,25 C376,26 376,28 372,29 C250,29 110,36 8,31 C2,30 2,25 6,24Z" fill="currentColor"/>`,
      2: `<g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M8,16 C120,4 260,4 392,14" stroke-width="7"/><path d="M60,31 C170,22 280,22 372,30" stroke-width="5"/></g>`,
      3: `<path d="M4,22 C120,6 280,6 396,20 C280,14 120,14 4,22Z" fill="currentColor"/>`,
      4: `<path d="M6,24 L60,12 L112,26 L170,10 L226,26 L286,10 L340,24 L394,14" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
    };
    return svg('0 0 400 40', `<defs>${flt}</defs><g filter="url(#${id})">${F[forme] || F[1]}</g>`, 'preserveAspectRatio="none"');
  }
  function pinceau(forme) {                         // D04 coups de pinceau secs
    const [id, flt] = rugueux(11 + +forme * 7, '0.012 0.09', 34);
    const jeux = {
      1: [[40, 70, 330, 34], [10, 118, 380, 44], [60, 176, 300, 38], [30, 228, 350, 46], [90, 286, 250, 32], [50, 330, 300, 26]],
      2: [[20, 150, 360, 70], [60, 232, 300, 54]],
      3: [[60, 40, 300, 22], [20, 80, 360, 30], [40, 126, 330, 26], [10, 166, 380, 34], [70, 214, 280, 24], [30, 252, 340, 30], [90, 296, 240, 20], [50, 330, 300, 24], [120, 366, 200, 16]],
    }[forme] || [];
    const r = jeux.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/>`).join('');
    return svg('0 0 400 400', `<defs>${flt}</defs><g filter="url(#${id})" fill="currentColor" transform="rotate(-38 200 200)">${r}</g>`);
  }
  function ovaleMain() {                            // C05
    return svg('0 0 300 120', `<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" vector-effect="non-scaling-stroke">
      <path d="M168,7 C74,2 6,26 7,60 C8,96 84,115 162,113 C238,111 294,90 292,56 C290,24 226,8 140,9"/>
      <path d="M150,14 C70,12 20,34 22,62 C24,92 92,108 158,106 C228,104 282,86 280,58 C278,30 214,16 124,18" opacity=".9"/></g>`, 'class="forme" preserveAspectRatio="none"');
  }
  function flecheMain(forme) {                      // D06
    const F = {
      1: `<path d="M8,118 C52,150 108,150 120,108 C130,74 88,66 82,96 C74,132 176,142 284,36" stroke-dasharray="11 10"/><path d="M252,34 L286,32 L282,66" />`,
      2: `<path d="M8,130 C80,150 200,120 284,30" stroke-dasharray="11 10"/><path d="M250,30 L286,28 L284,64"/>`,
      3: `<path d="M10,30 C90,10 210,40 280,128"/><path d="M246,126 L284,134 L286,96"/>`,
    };
    return svg('0 0 300 160', `<g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${F[forme] || F[1]}</g>`);
  }
  const chevron = () => svg('0 0 100 100', `<path d="M6,14 L50,92 L94,14 L72,14 L50,54 L28,14Z" fill="currentColor"/>`);
  const etincelle = () => svg('0 0 100 100', `<path d="M50,0 C54,34 66,46 100,50 C66,54 54,66 50,100 C46,66 34,54 0,50 C34,46 46,34 50,0Z" fill="currentColor"/>`);
  const curseur = () => svg('0 0 40 52', `<path d="M4,3 L4,41 L14,32 L21,48 L28,45 L21,29 L35,29Z" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/>`);
  const silhouette = () => svg('0 0 400 520', `<g fill="currentColor"><circle cx="200" cy="128" r="92"/><path d="M30,520 C30,362 104,268 200,268 C296,268 370,362 370,520Z"/></g>`, 'preserveAspectRatio="xMidYMax meet"');
  const ETOILE = 'M50,4 L61.8,36.6 L96.5,37.8 L69,59.2 L78.6,92.6 L50,73 L21.4,92.6 L31,59.2 L3.5,37.8 L38.2,36.6Z';
  function etoiles(note) {                          // E15 / D09
    let h = '';
    for (let i = 1; i <= 5; i++) {
      const part = Math.max(0, Math.min(1, note - (i - 1))), id = 'et' + (++uid);
      h += svg('0 0 100 100', `<defs><clipPath id="${id}"><rect width="${part * 100}" height="100"/></clipPath></defs><path d="${ETOILE}" fill="currentColor" opacity=".28"/><path d="${ETOILE}" fill="currentColor" clip-path="url(#${id})"/>`, 'style="width:1em;height:1em"');
    }
    return h;
  }
  function motifVagues() {                          // F05 grandes vagues ton sur ton
    const b = [];
    for (let i = 0; i < 7; i++) {
      const y = -10 + i * 22;
      b.push(`<path d="M-10,${y} C20,${y - 16} 40,${y + 18} 60,${y + 2} C78,${y - 12} 92,${y + 10} 112,${y - 4}" />`);
    }
    return svg('0 0 100 130', `<g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round">${b.join('')}</g>`, 'preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"');
  }

  /* ---------- puces des listes ---------- */
  const PUCES = {
    'check-rond':    ['pleine', 'check:bold'],
    'check-blanc':   ['blanche', 'check:bold'],
    'fleche-rond':   ['pleine', 'arrow-right:bold'],
    'chevron-rond':  ['pleine', 'caret-right:bold'],
    'plus-rond':     ['pleine', 'plus:bold'],
    'badge':         ['', 'seal-check'],
    'check':         ['', 'check:bold'],
    'check-contour': ['', 'check-circle:regular'],
    'check-cercle':  ['', 'check-circle'],
    'coche-carre':   ['', 'check-square'],
    'etoile':        ['', 'star'],
    'fleche':        ['', 'arrow-right:bold'],
    'eclair':        ['', 'lightning'],
    'megaphone':     ['', 'megaphone-simple'],
  };
  function puces(racine) {
    racine.querySelectorAll('.liste[data-puce]').forEach(ul => {
      const type = ul.dataset.puce;
      [...ul.children].forEach((li, i) => {
        if (li.tagName !== 'LI' || li.querySelector(':scope > .puce')) return;
        const t = li.dataset.puce || type, s = document.createElement('span');
        if (t === 'point') s.className = 'puce point';
        else if (t === 'numero') { s.className = 'puce num'; s.textContent = String(i + 1).padStart(ul.dataset.zero !== undefined ? 2 : 1, '0'); }
        else if (t === 'chevron') { s.className = 'puce'; s.innerHTML = svg('0 0 24 24', '<path d="M2,2 L22,12 L2,22 L8,12Z" fill="currentColor"/>', 'style="width:1em;height:1em;display:block"'); }
        else {
          const [cls, ic] = t.startsWith('ic:') ? ['', t.slice(3)] : (PUCES[t] || PUCES['check-rond']);
          s.className = 'puce ' + cls; s.innerHTML = `<i class="ic" data-ic="${ic}"></i>`;
        }
        li.prepend(s);
      });
    });
  }

  function formes(racine = document) {
    const pose = (sel, fab) => racine.querySelectorAll(sel).forEach(el => {
      if (el.dataset.kitFait) return; el.dataset.kitFait = 1;
      el.insertAdjacentHTML('afterbegin', fab(el));
    });
    pose('.badge-eclat', el => eclat(num(el.dataset.pointes, 18), num(el.dataset.creux, 0.84)));
    pose('.badge-nuage', el => nuage(num(el.dataset.lobes, 8)));
    pose('.vague', el => vague(el.dataset.vague || 'douce'));
    pose('.trait-pinceau', el => traitPinceau(num(el.dataset.forme, 1)));
    pose('.pinceau', el => pinceau(num(el.dataset.forme, 1)));
    pose('.ovale-main', ovaleMain);
    pose('.fleche-main', el => flecheMain(num(el.dataset.forme, 1)));
    pose('.chevron-pointe', chevron);
    pose('.etincelle', etincelle);
    pose('.curseur', curseur);
    pose('.heros-vide', silhouette);
    pose('.etoiles', el => etoiles(num(el.dataset.note, 5)));
    pose('[data-motif="vagues"]', motifVagues);
    puces(racine);
  }

  /* ---------- icônes ---------- */
  function icones(racine = document) {              // liste des icônes demandées par la page
    return [...new Set([...racine.querySelectorAll('[data-ic]')].map(e => e.dataset.ic))];
  }
  function poser(carte, racine = document) {        // carte : { "phone": "<svg…>", … }
    racine.querySelectorAll('[data-ic]').forEach(el => {
      if (el.dataset.icFait) return;
      const s = carte[el.dataset.ic]; if (!s) return;
      el.dataset.icFait = 1; el.insertAdjacentHTML('afterbegin', s);
    });
  }

  /* ---------- ajustement automatique des textes ----------
     data-ajuste="2" : réduit la taille de police jusqu'à tenir sur 2 lignes dans la largeur du bloc. */
  function nbLignes(el) {
    const r = document.createRange(); r.selectNodeContents(el);
    const tops = new Set(); for (const b of r.getClientRects()) if (b.width > 1) tops.add(Math.round(b.top / 4));
    return tops.size;
  }
  function ajuster(racine = document) {
    const rapport = [];
    racine.querySelectorAll('[data-ajuste]').forEach(el => {
      const max = parseInt(el.dataset.ajuste) || 1;
      let fs = parseFloat(getComputedStyle(el).fontSize); const depart = fs, min = depart * 0.5;
      const deborde = () => el.scrollWidth > el.clientWidth + 1 || nbLignes(el) > max;
      while (deborde() && fs > min) { fs -= Math.max(1, fs * 0.02); el.style.fontSize = fs + 'px'; }
      if (fs < depart) rapport.push({ texte: el.textContent.trim().slice(0, 40), de: Math.round(depart), a: Math.round(fs), limite: fs <= min });
    });
    return rapport;
  }

  window.kit = { formes, icones, poser, ajuster };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => formes());
  else formes();
})();
