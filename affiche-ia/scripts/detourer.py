#!/usr/bin/env python3
"""AFFICHE IA — détourer une photo (retirer le fond) pour en faire le héros d'une affiche.

    python3 detourer.py photo.jpg [sortie.png] [--modele isnet-general-use]

Écrit un PNG transparent, rogné au plus près du sujet. Si la photo est déjà détourée
(PNG avec transparence), elle est seulement rognée.

Modèles (téléchargés une fois, depuis github.com) :
    isnet-general-use   défaut : personnes et objets, bords nets
    u2net_human_seg     personnes seulement, plus tolérant sur les fonds chargés
    u2net               ancien modèle généraliste, en secours
Si aucun modèle ne peut être téléchargé, le script explique les autres solutions.
"""
import sys, os
os.environ.setdefault('TQDM_DISABLE', '1')   # pas de barre de téléchargement dans la sortie

def rogner(im, marge=4):
    boite = im.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
    if not boite: return im
    x0, y0, x1, y1 = boite
    return im.crop((max(0, x0 - marge), max(0, y0 - marge), min(im.width, x1 + marge), min(im.height, y1 + marge)))

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    modele = 'isnet-general-use'
    if '--modele' in sys.argv: modele = sys.argv[sys.argv.index('--modele') + 1]; args = [a for a in args if a != modele]
    if not args: print(__doc__); sys.exit(2)
    src = args[0]; out = args[1] if len(args) > 1 else os.path.splitext(src)[0] + '-detoure.png'
    from PIL import Image, ImageFilter
    im = Image.open(src)
    try:
        from PIL import ImageOps; im = ImageOps.exif_transpose(im)      # photos de téléphone tournées
    except Exception: pass
    if im.mode in ('RGBA', 'LA') or 'transparency' in im.info:
        im = im.convert('RGBA'); a = im.getchannel('A'); vides = sum(a.histogram()[:13]) / (im.width * im.height)
        if vides > 0.03:
            im = rogner(im); im.save(out); print(f'déjà détourée → {out}  {im.width}×{im.height} px'); return
    try:
        from rembg import remove, new_session
    except ImportError:
        print('rembg n\'est pas installé :  pip install rembg onnxruntime\n' + SECOURS); sys.exit(1)
    res = None
    for m in dict.fromkeys([modele, 'u2net_human_seg', 'u2net']):
        try:
            res = remove(im.convert('RGB'), session=new_session(m), post_process_mask=True); modele = m; break
        except Exception as e:
            print(f'modèle {m} indisponible ({str(e).splitlines()[0][:90]})')
    if res is None: print(SECOURS); sys.exit(1)
    res = res.convert('RGBA')
    # adoucit le bord d'un demi-pixel pour éviter l'effet « découpé aux ciseaux »
    a = res.getchannel('A').filter(ImageFilter.GaussianBlur(0.6)); res.putalpha(a)
    res = rogner(res); res.save(out)
    plein = sum(res.getchannel('A').histogram()[200:]) / (res.width * res.height)
    print(f'détourée avec {modele} → {out}  {res.width}×{res.height} px  (sujet : {plein:.0%} du cadre)')
    if res.height < 900: print('attention : moins de 900 px de haut. Sur une affiche de 1080 px le héros sera agrandi et un peu flou ; demander une photo plus grande si possible.')
    if plein < 0.25 or plein > 0.97: print('attention : découpe suspecte, regarder le résultat avant de l\'utiliser (essayer --modele u2net_human_seg).')

SECOURS = """Détourage impossible ici. Trois solutions :
  1. demander à la personne une photo déjà détourée (PNG transparent : remove.bg, ou « détourer le sujet » dans la galerie du téléphone) ;
  2. utiliser un outil de retrait de fond s'il y en a un de connecté ;
  3. ne pas détourer : mettre la photo dans un cadre (.cadre-photo, .arche ou .cercle) ou en fond plein cadre (.fond-photo + .voile)."""

if __name__ == '__main__': main()
