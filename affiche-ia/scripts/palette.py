#!/usr/bin/env python3
"""AFFICHE IA — lire une affiche de référence : format, couleurs, zones claires et sombres.

    python3 palette.py reference.jpg [--planche palette.png]

Mesure plutôt que deviner. Affiche :
  - le format et la classe de toile qui s'en approche ;
  - les couleurs dominantes avec leur part de surface ;
  - les couleurs vives (accents), même si elles couvrent peu de surface ;
  - une carte 4 × 5 des zones (teinte moyenne de chaque case) pour voir où sont le sombre, le clair, le socle ;
  - une proposition de jetons CSS (--fond, --fond2, --primaire, --accent, --clair, --encre) à corriger à l'œil.
--planche écrit une image des couleurs relevées, à montrer à la personne si besoin.
"""
import sys, colorsys
from PIL import Image
import numpy as np

def hx(c): return '#%02X%02X%02X' % tuple(int(round(v)) for v in c[:3])
def hsv(c): return colorsys.rgb_to_hsv(c[0] / 255, c[1] / 255, c[2] / 255)
def lum(c): return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255
def nom(c):
    h, s, v = hsv(c)
    if v < 0.16: return 'noir'
    if s < 0.12: return 'blanc' if v > 0.88 else ('gris clair' if v > 0.6 else 'gris foncé')
    d = h * 360
    t = ('rouge' if d < 14 or d >= 345 else 'orange' if d < 40 else 'jaune' if d < 68 else 'vert' if d < 165 else
         'cyan' if d < 195 else 'bleu' if d < 255 else 'violet' if d < 290 else 'rose')
    return t + (' sombre' if v < 0.42 else ' clair' if (v > 0.85 and s < 0.45) else '')

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args: print(__doc__); sys.exit(2)
    planche = sys.argv[sys.argv.index('--planche') + 1] if '--planche' in sys.argv else None
    if planche: args = [a for a in args if a != planche]
    im = Image.open(args[0]).convert('RGB'); W, H = im.size; r = W / H
    formats = {'f11 (carré 1:1)': 1, 'f45 (4:5)': 0.8, 'f916 (9:16)': 0.5625, 'fa4 (A4)': 0.7072, 'f169 (16:9)': 1.7778}
    proche = min(formats, key=lambda k: abs(formats[k] - r))
    print(f'Format : {W}×{H} px, rapport {r:.3f} → toile {proche}')

    pt = im.resize((200, max(1, round(200 * H / W))), Image.LANCZOS)
    q = pt.quantize(colors=12, method=Image.Quantize.MEDIANCUT, kmeans=4)
    pal = q.getpalette(); cnt = sorted(q.getcolors(), reverse=True); tot = sum(c for c, _ in cnt)
    dom = [((pal[i * 3], pal[i * 3 + 1], pal[i * 3 + 2]), c / tot) for c, i in cnt]
    print('\nCouleurs dominantes (part de la surface) :')
    for c, p in dom: print(f'  {hx(c)}  {p:5.1%}  {nom(c)}')

    # accents : pixels très saturés, regroupés par teinte
    a = np.asarray(pt, dtype=np.float32) / 255
    mx, mn = a.max(2), a.min(2); sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    vif = (sat > 0.6) & (mx > 0.55)
    accents = []
    if vif.sum() > 20:
        px = a[vif]; hues = np.array([colorsys.rgb_to_hsv(*p)[0] for p in px])
        bins = (hues * 18).astype(int) % 18
        for b in np.argsort(-np.bincount(bins, minlength=18))[:5]:
            sel = px[bins == b]
            if len(sel) < max(12, 0.0025 * a.shape[0] * a.shape[1]): continue
            # on garde les pixels les plus vifs du groupe
            s2 = sel[np.argsort(-(sel.max(1) - sel.min(1)))[:max(5, len(sel) // 3)]]
            accents.append((tuple(np.median(s2, 0) * 255), len(sel) / (a.shape[0] * a.shape[1])))
    print('\nCouleurs vives (accents possibles) :')
    for c, p in accents: print(f'  {hx(c)}  {p:5.1%}  {nom(c)}')
    if not accents: print('  aucune : affiche en tons sourds')

    print('\nCarte des zones (haut → bas, gauche → droite) :')
    g = np.asarray(im.resize((4, 5), Image.BOX), dtype=np.float32)
    for y in range(5): print('  ' + '  '.join(f'{hx(g[y, x])} {"clair " if lum(g[y, x]) > 0.62 else "sombre" if lum(g[y, x]) < 0.25 else "moyen "}' for x in range(4)))
    bas = float(np.mean([lum(g[4, x]) for x in range(4)])); haut = float(np.mean([lum(g[0, x]) for x in range(4)]))
    if bas > 0.6 and haut < 0.45: print('  → bas clair sous un haut sombre : socle, vague ou bande claire en pied (B01–B03).')
    if abs(float(np.mean([lum(g[y, 0]) for y in range(3)])) - float(np.mean([lum(g[y, 3]) for y in range(3)]))) > 0.3: print('  → gauche et droite de luminosité très différente : fond coupé ou diagonale (F08, F09).')

    # proposition de jetons
    # le fond est la couleur la plus présente dans les 55 % du haut : c'est là que se joue l'ambiance,
    # le bas étant souvent un socle clair
    haut_im = pt.crop((0, 0, pt.width, max(1, int(pt.height * 0.55)))).quantize(colors=8, method=Image.Quantize.MEDIANCUT, kmeans=3)
    hp = haut_im.getpalette(); hc = sorted(haut_im.getcolors(), reverse=True)
    fond = (hp[hc[0][1] * 3], hp[hc[0][1] * 3 + 1], hp[hc[0][1] * 3 + 2]); sombre = lum(fond) < 0.5
    fonces = [c for c, p in dom if lum(c) < lum(fond) - 0.03 and p > 0.04]
    fond2 = min(fonces, key=lum) if fonces else tuple(v * 0.55 for v in fond)
    clairs = [c for c, p in dom if lum(c) > 0.8 and p > 0.02]
    clair = max(clairs, key=lum) if clairs else (255, 255, 255)
    hf = hsv(fond)[0]
    def ecart(c): d = abs(hsv(c)[0] - hf); return min(d, 1 - d)
    autres = sorted(accents, key=lambda t: -t[1])
    loin = [c for c, p in autres if ecart(c) > 0.09 or hsv(fond)[1] < 0.2]
    pres = [c for c, p in autres if c not in loin]
    accent = loin[0] if loin else (autres[0][0] if autres else (255, 210, 31))
    primaire = pres[0] if pres else (loin[1] if len(loin) > 1 else tuple(min(255, v * 1.6 + 30) for v in fond))
    encre = min((c for c, p in dom), key=lum); encre = encre if lum(encre) < 0.2 else (12, 16, 28)
    print(f'\nJetons proposés (affiche {"sombre" if sombre else "claire"}) — à vérifier à l\'œil sur la référence :')
    print(f'  --fond:{hx(fond)}; --fond2:{hx(fond2)}; --primaire:{hx(primaire)}; --accent:{hx(accent)}; --clair:{hx(clair)}; --encre:{hx(encre)};')
    if not sombre: print('  affiche claire : mettre aussi --texte sur une couleur foncée et --doux sur un gris.')

    if planche:
        from PIL import ImageDraw
        cs = [c for c, _ in dom[:8]] + [c for c, _ in accents[:4]]
        im2 = Image.new('RGB', (110 * len(cs), 140), (255, 255, 255)); d = ImageDraw.Draw(im2)
        for i, c in enumerate(cs):
            d.rectangle([i * 110 + 6, 6, i * 110 + 104, 104], fill=tuple(int(v) for v in c)); d.text((i * 110 + 14, 114), hx(c), fill=(0, 0, 0))
        im2.save(planche); print(f'\nPlanche des couleurs → {planche}')

if __name__ == '__main__': main()
