# Le moteur : écrire la maquette et la rendre en image

## Sommaire
1. Squelette de la page
2. Jetons de couleur et polices
3. Poser les blocs : couches et placement
4. Le héros : photo, détourage, absence de photo
5. Maquettes : téléphone, ordinateur, navigateur, livre, boîte
6. Icônes et objets 3D
7. Attributs d'aide
8. Rendre, et lire les contrôles
9. Pièges rencontrés
10. Changer de format

---

## 1. Squelette de la page

Une affiche = un fichier HTML avec un seul élément `.affiche`. `{{KIT}}` désigne le dossier `assets/` du skill ;
le script de rendu le remplace par le bon chemin. Les images du client se mettent à côté du fichier HTML et
s'appellent par leur nom (`src="heros.png"`).

```html
<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Nom de l'affiche</title>
<link rel="stylesheet" href="{{KIT}}/kit/affiche.css">
<style>
.affiche{--fond:#071034;--fond2:#02040f;--primaire:#1E6BFF;--accent:#FFB648;--accent2:#00C2FF;
  --clair:#F7F9FF;--encre:#0B1220;--f-titre:'Sora';--f-texte:'Poppins';--rayon:40px}
/* styles propres à cette affiche, s'il en faut */
</style></head><body>
<div class="affiche f45">
  <!-- 1 fond · 2 décor de fond · 3 héros · 4 blocs de texte · 5 socle · 6 contenu du socle · 7 décor de premier plan -->
</div>
<script src="{{KIT}}/kit/kit.js"></script></body></html>
```

Formats : `f45` 1080 × 1350 · `f11` 1080 × 1080 · `f916` 1080 × 1920 · `fa4` 1080 × 1527 · `f169` 1920 × 1080.
Toutes les mesures de ce guide et du catalogue sont en pixels de cette toile.

Le plus sûr est de partir d'un exemple de `assets/exemples/` : la structure, l'ordre des couches et les tailles y
sont déjà justes. Le code de chaque composant isolé est dans `assets/exemples/planches/*.html`.

## 2. Jetons de couleur et polices

| Jeton | Rôle |
|---|---|
| `--fond`, `--fond2` | couleur de fond, et sa version la plus sombre (dégradés) |
| `--primaire` | couleur de marque : panneaux pleins, pilules par défaut |
| `--accent` | la couleur vive : mot clé, puces, prix, bouton |
| `--accent2` | second accent, à doser : promotion, urgence |
| `--clair` | surfaces claires : socle, cartes, pied |
| `--encre` | texte sur une surface claire ou sur l'accent |
| `--texte`, `--doux` | texte sur le fond (blanc par défaut), texte secondaire |
| `--rayon` | arrondi des panneaux et des cartes |
| `--f-titre`, `--f-texte`, `--f-script` | polices |

Sur une affiche à fond clair, déclare aussi `--texte:#161616;--doux:rgba(22,22,22,.66)`.

**Polices disponibles (25, toutes libres).** Une police absente de cette liste est remplacée par une police de
secours et le script le signale.

- Titres larges ou étroits : `Archivo` (avec `.large` ou `.etroit`, graisses 100–900), `Unbounded`, `Anton`,
  `Bebas Neue`, `Oswald`, `Archivo Black`, `Dela Gothic One`, `Lilita One`, `Alfa Slab One`
- Géométriques et rondes : `Poppins` (300–900, italique 400/600/800), `Outfit`, `Fredoka`
- Grotesques : `Plus Jakarta Sans`, `Montserrat`, `Inter`, `Bricolage Grotesque`
- Techno : `Sora`, `Space Grotesk`
- Sérifs : `Playfair Display`, `DM Serif Display`
- Manuscrites : `Mrs Saint Delafield`, `Great Vibes`, `Kaushan Script`, `Caveat`, `Permanent Marker`

Graisses : classes `.w3` à `.w9`. Titre : `.titre` (applique `--f-titre`, interligne serré). Capitales : `.maj`.
Les signes ₦ et ₵ sont pris en charge.

## 3. Poser les blocs : couches et placement

**Tout se pose en absolu sur la toile**, avec `class="abs"` et `style="left:…;top:…;width:…"`. À l'intérieur d'un
bloc, on empile avec `.pile` (colonne) ou `.rang` (ligne) et `.g8` à `.g48` pour les écarts.

Ordre des couches, du fond vers l'avant (l'ordre dans le HTML fait foi, `.z1` à `.z9` pour forcer) :

1. **Fond** : `<div class="fond fond-radial">`, puis motifs (`.motif-points`…), lueurs, `.grain`.
2. **Décor de fond** : coups de pinceau, mot géant vertical, grandes formes.
3. **Héros** : la personne ou le produit.
4. **Blocs de texte** : titre, panneau, prix. Ils passent devant le héros.
5. **Socle, vague ou bande** : devant le bas du héros.
6. **Contenu du socle** : appel à l'action, contacts.
7. **Décor de premier plan** : badge sur un coin, objet 3D flou.

Repères sur une toile 4:5 : marges 64 px ; en-tête entre y = 50 et 120 ; titre entre 150 et 450 ; panneau entre
520 et 1000 ; socle à partir de 1020–1080.

Estimer une largeur de texte : nombre de caractères × taille × 0,55 (police normale), × 0,72 (capitales larges
Archivo), × 0,42 (étroites). Au moindre doute, mets `white-space:nowrap` et laisse le contrôle signaler un
débordement, ou `data-ajuste`.

Panneau avec onglet, liste et puces :

```html
<div class="panneau verre abs" style="left:64px;top:588px;width:560px;--pad:62px 40px 38px">
  <span class="onglet pilule degrade maj" style="--g1:#FFD9A8;--g2:#FF9F3F;color:#4a2400;font-size:24px">Ce que tu vas apprendre :</span>
  <ul class="liste" data-puce="badge" style="font-size:27px">
    <li>Écrire une histoire qui retient jusqu'à la fin</li>
    <li>Monter ta vidéo sur ton téléphone</li>
  </ul>
</div>
```

L'onglet dépasse du panneau par le haut : prévois 60 px de padding haut dans le panneau et 40 px de libre au-dessus.

## 4. Le héros : photo, détourage, absence de photo

**La personne a envoyé une photo.**
```bash
python3 scripts/detourer.py photo.jpg heros.png
```
Regarde `heros.png` avant de l'utiliser (cheveux, mains, objets tenus). Puis :
```html
<img class="heros lisere z3" src="heros.png" style="--h:900px;right:-20px;--couleur:#5aa0ff">
```
`--h` règle la hauteur ; `left` ou `right` le côté ; le bas est ancré au bas de l'affiche (`--bas` pour le relever).
`.lisere` ajoute un halo de couleur, `.fondu-bas` fond le bas dans le décor. Ajoute une `.lueur` derrière la tête.
Une photo de moins de 900 px de haut sera agrandie : préviens que le rendu sera moins net et demande mieux si possible.

**La photo ne se détoure pas bien**, ou c'est une photo d'ambiance :
- dans un cadre : `<div class="cadre-photo arche lisere abs" style="left:…;top:…;width:420px;height:560px"><img src="photo.jpg"></div>`
  (`.arche`, `.cercle`, ou rectangle arrondi) ;
- en fond plein cadre (composition C6) : `<img class="fond-photo" src="photo.jpg" style="--cadrage:50% 20%">` puis
  `<div class="voile bas"></div>` pour assombrir la moitié basse où va le texte.

**Il n'y a pas de photo.** Par ordre de préférence :
1. une maquette du kit (section 5) : un livre pour un guide, un téléphone pour une formation sur mobile ou une
   application, une boîte pour un pack ;
2. une image générée, si un outil d'image est connecté ou si la personne peut la générer elle-même : textes prêts
   dans `prompt-image.md`. Dis-le avant de générer : cela peut consommer ses crédits ;
3. une composition sans image (C4).

`.heros-vide` dessine une silhouette d'attente. Elle sert dans les exemples et pour montrer une mise en page en
attendant la photo ; ne livre jamais une affiche finale avec.

**Jamais** le visage ni le logo de l'affiche de référence.

## 5. Maquettes : téléphone, ordinateur, navigateur, livre, boîte

Le contenu d'un écran ou d'une couverture est du HTML libre : une capture (`<img>`) ou une mini-mise en page.
Mets `data-libre` sur un écran pour que les contrôles ignorent ses petits textes.

```html
<!-- téléphone : --l largeur, --rot inclinaison, --tranche couleur du bord -->
<div class="mk-telephone z3" style="--l:330px;left:716px;top:250px;--rot:7deg;--tranche:#b9c4ff">
  <div class="ecran" data-libre><img src="capture.png"></div>
</div>

<!-- ordinateur portable, posé sur un sol clair -->
<div class="sol" style="--h:240px"></div>
<div class="mk-laptop" style="--l:760px;left:160px;top:640px"><div class="ecran"><img src="site.png"></div><div class="base"></div></div>

<!-- fenêtre de navigateur -->
<div class="mk-navigateur" style="--l:620px;left:…;top:…"><div class="barre-nav"><i></i><i></i><i></i><span>monsite.com</span></div><img src="page.png"></div>

<!-- livre : --tourne angle (négatif : on voit la tranche des pages à droite), --ep épaisseur -->
<div class="mk-livre z3" style="--l:330px;--h:450px;left:375px;top:120px;--tourne:-20deg;--ep:44px">
  <div class="objet">
    <div class="couverture" style="--fond-couv:linear-gradient(165deg,#1d0f4a,#0b0420)">… titre du livre …</div>
    <div class="tranche"></div>
  </div>
</div>

<!-- boîte : --tourne positif et .tranche.gauche pour voir le côté gauche -->
<div class="mk-boite" style="--l:300px;--h:440px;right:60px;top:560px;--ep:90px;--tourne:26deg">
  <div class="objet"><div class="couverture">…</div><div class="tranche gauche"></div></div>
</div>
```

La couverture d'un livre se compose comme une mini-affiche : sur-titre espacé, titre en gros, un mot surligné,
une ligne en bas.

## 6. Icônes et objets 3D

```bash
node scripts/icones.js téléphone argent whatsapp     # donne les noms dans les trois jeux
```

- Pictogramme : `<i class="ic" data-ic="phone-call"></i>` · trait épais `phone-call:bold` · trait fin `phone-call:regular`.
- Marque : `data-ic="m:whatsapp"` · couleur officielle `m:whatsapp:couleur`.
- Dans un support : `<span class="ic-rond" data-ic="lock-key" style="--d:62px;--ic-fond:#1E6BFF;--ic-couleur:#fff"></span>`
  (`.ic-carre`, `.ic-anneau`, `.blanc`, `.relief`).
- Tuile de marque en volume : `<span class="tuile-3d flou2" data-ic="m:facebook" style="--c:#1877F2;--d:170px;--rot:-14deg"></span>`.
- Objet 3D : `<img class="deco3d flou1" src="{{KIT}}/3d/fusee.png" style="--d:170px;left:…;top:…;--rot:-12deg">`.
  Les fichiers font 256 px : au-delà de 280 px d'affichage, ajoute `.flou1`, `.flou2` ou `.flou3` (c'est aussi ce
  qui donne la profondeur de champ).

Une icône prend la taille (`font-size`) et la couleur (`color`) du texte qui l'entoure.

## 7. Attributs d'aide

| Attribut | Effet |
|---|---|
| `data-puce="…"` sur `<ul class="liste">` | pose la puce de chaque ligne (liste des puces : catalogue, section L). Sur un `<li>`, change la puce de cette ligne. |
| `data-ajuste="2"` | réduit la police jusqu'à ce que le texte tienne sur 2 lignes dans la largeur du bloc |
| `data-bord` | l'élément a le droit de toucher ou de dépasser le bord (mot géant, carte collée au bord, objet coupé) |
| `data-superpose` | ce texte a le droit d'en chevaucher un autre (mot manuscrit en travers du titre) |
| `data-libre` | les contrôles ignorent ce bloc (contenu d'un écran, mention de travail) |
| `data-petit` | ce texte a le droit d'être petit (crédit, mention légale) |
| `data-vague`, `data-forme`, `data-pointes`, `data-lobes`, `data-note`, `data-motif` | variante d'une forme tracée par le kit |

## 8. Rendre, et lire les contrôles

```bash
node scripts/rendre.js affiche.html --jpg          # affiche.png (×2), affiche.jpg, affiche.apercu.jpg
node scripts/rendre.js affiche.html --guides       # ajoute marges et tiers sur l'aperçu
node scripts/rendre.js affiche.html --echelle 3    # pour l'impression
```

| Message | Ce qu'il faut faire |
|---|---|
| ✗ texte hors de l'affiche | déplacer ou réduire ; `data-bord` seulement si c'est un effet voulu |
| ✗ texte qui dépasse de son cadre | réduire la police, raccourcir le texte ou élargir le cadre ; pour un prix, baisser `--taille` |
| ✗ texte invisible ou caché | un bloc passe devant : revoir l'ordre des couches ou la position |
| ✗ texte illisible sur son fond | changer la couleur du texte ou du fond ; ajouter un `.voile` sur une photo |
| ✗ texte illisible sur téléphone | monter à 22 px au moins, ou supprimer cette mention |
| ✗ texte de remplissage | remplacer par la vraie information, ou retirer le bloc |
| ✗ police absente du kit | prendre une police de la liste (section 2) |
| ✗ icône inconnue | `node scripts/icones.js <mot>` |
| ✗ image introuvable | vérifier le nom du fichier et qu'il est à côté du HTML |
| ⚠ texte trop près du bord | viser 34 px au moins, 64 px pour les blocs principaux |
| ⚠ deux textes se chevauchent | les écarter ; `data-superpose` si c'est voulu |
| ⚠ texte peut-être masqué en partie | regarder l'aperçu à cet endroit |
| ⚠ contraste faible | foncer le fond du bloc ou éclaircir le texte |
| ⚠ image agrandie | réduire l'image, la flouter si c'est un décor, ou demander un fichier plus grand |
| ⚠ texte réduit automatiquement | acceptable ; si la réduction est forte, raccourcir le texte |

Les contrôles ne remplacent pas l'œil : ouvre toujours `affiche.apercu.jpg`.

## 9. Pièges rencontrés

- **Un texte passe sous le héros ou sous un téléphone.** Les contrôles ne le voient pas toujours. Garde le texte
  dans sa colonne et vérifie sur l'aperçu que chaque ligne est entière.
- **Un prix ou un titre en capitales larges déborde.** Les capitales larges d'Archivo sont très gourmandes :
  « 15 000 F » à 70 px fait déjà 300 px de large.
- **Un chiffre se coupe en deux lignes dans un badge** (« -60 » puis « % »). Utilise `&nbsp;`.
- **Blanc sur orange ou vert vif** : contraste insuffisant. Fonce la couleur (par exemple `#C2410C` au lieu de `#F26B21`).
- **Texte sombre posé là où la vague n'est pas encore montée.** Règle `--h` de la vague ou du socle, puis place le texte.
- **Trop de pastilles ou de pilules sur une ligne** : elles débordent sur le bloc voisin. Trois au plus dans une
  demi-largeur.
- **Texte de légende à 17–19 px** : illisible sur téléphone. 22 px au moins.
- **Objet 3D sur un texte ou sur le bouton.** Le décor va dans les coins, autour du héros, à cheval sur un bord de bloc.
- **Le mot manuscrit sort par le haut.** Laisse 40 px au-dessus du titre.
- **Composant en `position:relative` qui ignore `left` et `top`** : ajoute `.abs`, qui l'emporte toujours.
- **Flèche « → » tapée au clavier** : elle n'est pas dans les polices. Utilise l'icône `arrow-right`.

## 10. Changer de format

On ne redimensionne pas une affiche, on la remet en page :

- **Carré (`f11`)** : 270 px de hauteur en moins. Retire un bloc (souvent la liste passe de 5 à 3 lignes), réduis le
  héros, mets prix et contact sur une seule ligne en bas.
- **9:16 (`f916`)** : 570 px de plus. Garde le texte entre y = 220 et y = 1620 (les applications recouvrent le haut
  et le bas). Agrandis le héros, espace les blocs, ne grossis pas le texte courant au-delà de 34 px.
- **A4 (`fa4`)** : proche du 4:5. Ajoute 177 px de hauteur au socle ou au héros ; rends avec `--echelle 3`.
