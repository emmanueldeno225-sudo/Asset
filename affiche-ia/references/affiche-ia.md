# Affiche IA — catalogue des éléments

Tout ce qu'un graphiste utilise pour construire une affiche publicitaire, extrait de 19 affiches de référence
(formations, produits numériques, applications, événements, services). Les fiches détaillées de ces affiches sont
dans `analyses.md`.

Chaque élément a :
- un **identifiant** (lettre de famille + numéro) pour en parler sans ambiguïté ;
- son **aspect** : ce qu'on voit, avec les mesures utiles sur une toile de 1080 px de large ;
- les affiches où il a été **vu** (numéros de `analyses.md`) ;
- **quand** s'en servir ;
- son nom dans le **kit** (`assets/kit/affiche.css`), prêt à l'emploi.

Les planches `references/planches/*.jpg` montrent le rendu réel de chaque élément du kit.

## Sommaire

- [A — Formats et marges](#a--formats-et-marges)
- [C — Compositions](#c--compositions) (8 mises en page types)
- [F — Fonds](#f--fonds)
- [B — Bas de l'affiche](#b--bas-de-laffiche)
- [T — Titres et typographie](#t--titres-et-typographie)
- [P — Panneaux et cartes](#p--panneaux-et-cartes)
- [E — Pilules, étiquettes, badges](#e--pilules-étiquettes-badges)
- [L — Listes et puces](#l--listes-et-puces)
- [X — Prix](#x--prix)
- [N — Appels à l'action](#n--appels-à-laction)
- [J — Pied de page et contacts](#j--pied-de-page-et-contacts)
- [K — Icônes](#k--icônes)
- [D — Décorations](#d--décorations)
- [H — Héros : personne, produit, maquettes](#h--héros--personne-produit-maquettes)
- [G — Logo](#g--logo)
- [Q — Palettes relevées](#q--palettes-relevées)
- [R — Recettes : les touches qui font « pro »](#r--recettes--les-touches-qui-font-pro)

---

## A — Formats et marges

| Classe | Taille de travail | Usage |
|---|---|---|
| `f45` | 1080 × 1350 | Fil Instagram et Facebook. Le format de 12 des 19 références : à prendre par défaut. |
| `f11` | 1080 × 1080 | Carré : Facebook, catalogue WhatsApp, boutique en ligne. |
| `f916` | 1080 × 1920 | Statut WhatsApp, story, TikTok. Garder le texte entre y = 220 et y = 1620. |
| `fa4` | 1080 × 1527 | A4 portrait pour l'impression (rendre avec `--echelle 3`). |
| `f169` | 1920 × 1080 | Bannière, écran, couverture. |

- **Marge de sécurité** : 64 px de chaque côté (`--marge`). Aucun texte à moins de 34 px du bord. Seuls les décors,
  le héros et les mots géants peuvent toucher ou dépasser le bord.
- **Colonnes** : sur les références, le texte occupe 50 à 58 % de la largeur, le héros 45 à 55 %, et les deux se
  chevauchent de 5 à 10 %. Ce chevauchement donne la profondeur.
- **Pas de 8 px** : les écarts valent 8, 16, 24, 32, 48, 64. Deux blocs liés sont à 16–24 px, deux blocs
  indépendants à 48–64 px.

---

## C — Compositions

Huit mises en page reviennent. Les zones sont données en pourcentage de la largeur (L) et de la hauteur (H).

### C1 · Titre à gauche, héros à droite, panneau, socle
La plus répandue pour vendre une formation.
- Logo en haut à gauche (5 % H), pseudo ou site en haut à droite.
- Titre : 6–62 % L, 10–34 % H. Sous-titre dessous, puis un trait de pinceau.
- Héros : 45–100 % L, 22–82 % H, coupé par le bord droit et par le socle.
- Panneau « ce que tu vas apprendre » : 6–55 % L, 42–76 % H, avec onglet.
- Socle clair : 0–100 % L, 78–100 % H, avec appel à l'action et contacts.
- **Vu sur** : 04, 06, 12, 13, 14, 16, 18.

### C2 · Héros au centre en bas, blocs autour
- Logo rond centré en haut (4–18 % H).
- Titre : 6–58 % L, 23–38 % H. Carte prix : 60–92 % L, 23–46 % H. Bloc date dessous.
- Héros : 28–76 % L, 45–100 % H, au centre. Bouton d'inscription et horaires à gauche du héros.
- Bandeau de contacts devant le héros : 6–94 % L, 83–94 % H.
- **Vu sur** : 09.

### C3 · Produit en vedette
Le produit (boîte, livre, téléphone, ordinateur) remplace la personne.
- Variante **côté** : titre et liste à gauche (6–62 % L), produit à droite (55–98 % L, 35–98 % H), prix en bas à gauche. Vu sur 01, 03, 08.
- Variante **centrée** : produit au centre (33–66 % L, 12–55 % H) entouré de cartes penchées, titre et prix dessous. Vu sur 19.

### C4 · Sans photo : étapes ou informations
- Titre : 20–70 % L, 10–24 % H, sur 2 ou 3 lignes. Pilule de rubrique dessous.
- Trois cartes d'étapes empilées : 22–78 % L, 38–78 % H.
- Ligne de contact en bas : 10–90 % L, 86–92 % H.
- Beaucoup de vide autour : c'est le vide qui fait le sérieux.
- **Vu sur** : 10, et 02 (titre centré, deux colonnes d'informations, bande blanche en pied).

### C5 · Bento
Fond clair, cartes colorées juxtaposées, chacune une idée.
- Logo centré en haut (6–14 % H).
- Carte haute à gauche pour la personne (8–43 % L, 25–100 % H), qui déborde par le haut.
- Carte titre à droite (44–92 % L, 25–48 % H), carte liste dessous (44–92 % L, 50–70 % H).
- Barre de réassurance en bas (10–70 % L, 80–91 % H).
- **Vu sur** : 17.

### C6 · Photo plein cadre
- La photo couvre toute l'affiche. Un voile dégradé monte du bas (45–100 % H) pour porter le texte.
- Logo en haut à droite, titre en bas à gauche (8–60 % L, 50–68 % H), liste à droite du titre, contacts tout en bas.
- **Vu sur** : 07.

### C7 · Héros en haut à gauche, titre à droite, panneaux centrés
- Héros : 6–52 % L, 6–46 % H, bas fondu dans le fond.
- Titre et date : 45–94 % L, 10–44 % H.
- Deux panneaux centrés dessous (12–88 % L) : informations, puis date limite.
- Barre blanche de contacts et partenaires en pied.
- **Vu sur** : 15.

### C8 · Deux héros
Un objet à gauche, une personne à droite, le panneau au centre.
- Titre centré en haut (14–86 % L, 18–38 % H).
- Objet 0–32 % L, personne 62–100 % L, tous deux de 36 à 100 % H. Panneau au centre : 33–66 % L, 45–80 % H.
- Bande claire en pied avec bonus et bouton.
- **Vu sur** : 11.

---

## F — Fonds

Un fond se construit en couches : couleur ou dégradé, motif discret, lueurs, grain.

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| F01 | Rideau plissé | Plis verticaux réguliers, ombre entre les plis, clair en haut | 09, 16 (panneaux verticaux) | `.fond-rideau` (`--pli` largeur d'un pli) |
| F02 | Dégradé et projecteur | Dégradé sombre ; halo clair derrière le héros | presque toutes | `.fond-degrade` (`--angle`), `.fond-radial` (`--px` `--py` `--taille` `--lueur`) |
| F03 | Photo floue teintée | Photo d'ambiance (salle, bureau) floutée, recouverte de la couleur de marque | 02, 15 | `<img class="fond-photo flou">` + `.voile.teinte` + `.voile` |
| F04 | Grille de points | Petits points clairs tous les 26 px, à 15 % d'opacité | 03 | `.motif-points` (`--pas`) |
| F05 | Ondes ton sur ton | Cercles concentriques ou larges vagues, à peine plus clairs que le fond | 05, 08 | `.motif-ondes`, `data-motif="vagues"` |
| F06 | Halos et reflets | Taches de lumière floues dans les coins, traits de lumière horizontaux | 10 | `.lueur` (`--couleur` `--d` `--flou` `--force`), `.reflet` |
| F07 | Trame demi-teinte | Points qui s'effacent en dégradé, dans un coin | 01, 10, 14 | `.motif-trame` |
| F08 | Fond coupé en deux | Deux couleurs vives côte à côte, fondues vers le sombre en bas | 18, 19 | `.fond-split` (`--coupe` `--angle`) |
| F09 | Diagonale sombre vers vif | Noir à gauche, couleur vive à droite | 04 | `.fond-diagonale` |
| F10 | Anthracite à bandes | Gris foncé avec de larges bandes obliques plus claires | 01 | `.fond-bandes` |
| F11 | Photo plein cadre | Photo nette + voile dégradé en bas | 07 | `<img class="fond-photo">` + `.voile.bas` (aussi `.haut`, `.gauche`) |
| F12 | Lignes obliques fines | Deux ou trois traits clairs en diagonale | 06 | `.motif-lignes` |
| F13 | Grandes formes douces | Disques ou barres ton sur ton, très grands, coupés par le bord | 03, 17 | `.forme-douce` |
| F14 | Grille fine | Quadrillage discret qui s'efface sur les bords (tech, IA, crypto) | — (ajout) | `.motif-grille` |
| F15 | Grain et vignette | Grain de pellicule à 10–15 %, coins assombris | — (ajout) | `.grain`, `.vignette` |
| F16 | Faisceau de projecteur | Cône de lumière qui part d'un coin et traverse le fond (cinéma, spectacle, lancement) | — (ajout) | `<div class="faisceau"><i></i></div>` (`--forme` `--angle` `--couleur` `--force`) |

Règles relevées : le fond ne compte jamais plus de deux teintes ; le motif reste sous 15 % d'opacité ; la zone
la plus claire du fond est derrière le héros, pas derrière le texte.

---

## B — Bas de l'affiche

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| B01 | Vague | Forme claire ondulée qui monte du bas, parfois doublée d'une vague de couleur | 09, 16 | `<div class="vague" data-vague="douce">` : `douce` `alpha` `double` `colline` `creux` `montante` `descendante` |
| B02 | Socle | Feuille claire aux coins hauts très arrondis (60–80 px) ou en arc, 20–25 % H | 04, 12, 13 | `.socle` (`--h` `--arrondi`), `.socle.arc` (`--courbe`), `.socle.lisere` |
| B03 | Bande droite | Bande claire pleine largeur, 10–14 % H, parfois décollée du bas | 02, 11 | `.bande-pied` (`--h` `--bas`) |
| B04 | Sol ou table | Surface claire au premier plan sur laquelle le produit est posé | 03 | `.sol` |

Le socle clair sert à trois choses : il termine l'affiche, il porte les informations pratiques en texte foncé
lisible, et il coupe le bas du héros proprement.

---

## T — Titres et typographie

### Polices du kit et voix qu'elles donnent

| Voix | Police du kit | Proche de (références) |
|---|---|---|
| Capitales très larges, puissantes | **Archivo** + `.large` (graisse 800–900) | 01, 09, 11, 17, 18 |
| Capitales étroites et hautes | **Archivo** + `.etroit`, **Anton**, **Bebas Neue**, **Oswald** | prix de 18 et 19 |
| Géométrique ronde, amicale | **Poppins** (300 à 900), **Outfit**, **Fredoka** | 02, 04, 05, 06, 15, 16 |
| Grotesque moderne, sérieuse | **Plus Jakarta Sans**, **Montserrat**, **Inter**, **Bricolage Grotesque** | 03, 08, 10, 14, 19 |
| Techno | **Sora**, **Space Grotesk**, **Unbounded** | 12, 13 |
| Très grasse d'impact | **Dela Gothic One**, **Archivo Black**, **Lilita One**, **Alfa Slab One** | 07, 17 |
| Sérif élégant | **Playfair Display**, **DM Serif Display** | 07 |
| Manuscrite signature | **Mrs Saint Delafield**, **Great Vibes** | 06 |
| Manuscrite pinceau, feutre | **Kaushan Script**, **Caveat**, **Permanent Marker** | 14 |

Une affiche = une police de titre + une police de texte (souvent la même famille) + au plus une manuscrite.

### Traitements

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| T01 | Capitales larges | Titre en capitales très grasses et étirées, interligne serré (0,95–1) | 01, 09, 11, 17, 18 | `.titre.maj.large.w9` avec `--f-titre:'Archivo'` |
| T02 | Mot clé en couleur | Tout le titre en blanc, un seul mot ou une ligne dans la couleur d'accent | 03, 05, 09, 10, 11, 14, 16, 17, 18 | `<span class="c-accent">` |
| T03 | Mot surligné | Pavé de couleur vive derrière le texte, texte foncé | 19 (et pavés d'information de 01, 02) | `.surligne`, `.surligne.bloc`, `.surligne.incline` |
| T04 | Petit italique + gros gras | Un mot de liaison en italique fin, deux fois plus petit, au milieu d'un titre gras | 04, 14 | `<span class="italique w5" style="font-size:.5em">` |
| T05 | Mot manuscrit en travers | Un mot en écriture signature, penché de -4 à -8°, qui chevauche le titre, dans la couleur d'accent | 06, 14 | `.script` + `data-superpose` |
| T06 | Texte métal | Dégradé argent ou or dans les lettres | 04, 14 | `.metal-argent`, `.metal-or`, `.degrade-texte` (`--g1` `--g2`) |
| T07 | Texte en relief lumineux | Lettres en dégradé clair, tranche plus foncée dessous, lueur colorée autour | 12, 13 | `.texte-3d` (`--t1` `--t2` `--t3` `--halo`) |
| T08 | Mot géant vertical | Nom de marque en capitales énormes, tourné à 90°, coupé par le bord droit | 08 | `.vertical` + `data-bord` |
| T09 | Titre rond | Lettres rondes très grasses, première ligne blanche, seconde en dégradé jaune | 16 | `--f-titre:'Fredoka'` + `.degrade-texte` |
| T10 | Sous-titre entre filets | Phrase fine encadrée par deux filets horizontaux | 09 | `.entre-filets` |
| T11 | Sur-titre espacé | Petites capitales très espacées, entre deux tirets | 19 | `.surtitre.filets` |
| T12 | Trait de pinceau | Coup de pinceau sous le titre, long de 50–70 % du titre | 04, 05, 12, 13 | `<span class="trait-pinceau" data-forme="1">` (1 épais, 2 double, 3 fin, 4 zigzag) |
| T13 | Descripteur latéral | Petite phrase à droite du titre, séparée par un filet vertical | 16 | `.barre-v` |
| T14 | Texte en sérif | Accroche et liste en sérif gras sur une photo | 07 | `font-family:'Playfair Display'` |
| T15 | Emphase dans la phrase | Dans le sous-titre, deux ou trois mots en gras ou en couleur ; le reste en gris clair | 03, 06, 10 | `<b>`, `.c-accent`, `.c-doux` |
| T16 | Texte en contour | Lettres vides, juste le trait | — (ajout) | `.contour-texte` |

Tailles relevées sur 1080 px : titre 70–120 px, sous-titre 28–36 px, texte de liste 24–30 px, mentions 20–24 px.
Le titre est 3 à 4 fois plus gros que le texte courant : c'est cet écart qui fait la hiérarchie.

---

## P — Panneaux et cartes

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| P01 | Panneau en verre dépoli | Rectangle très arrondi (28–44 px), fond translucide qui floute ce qu'il y a derrière, bord clair de 1,5 px, reflet en haut | 01, 02, 06, 10, 11, 12, 16 | `.panneau.verre` · `.sombre` `.clair` `.teinte` · `--rayon` `--pad` `--verre` `--bord` `--flou` |
| P02 | Panneau contour | Même forme, fond vide, bord fin clair | 13, 14, 15, 18 | `.panneau.contour` |
| P03 | Panneau sombre | Fond noir plein, bord fin clair | 04 | `.panneau.sombre` |
| P04 | Carte claire | Carte blanche très arrondie avec ombre douce | 08, 09, 19 | `.panneau.carte`, `.carte.creme` |
| P05 | Bulle | Carte dont un coin est à angle droit, avec un chevron qui la désigne | 03 | `.bulle`, `.bulle.haut-droite` + `.chevron-pointe` |
| P06 | Onglet | Étiquette à cheval sur le bord haut du panneau, à 40 px du coin gauche. Elle donne le titre du panneau. | 04, 06, 11, 12, 13, 16, 17 | `.onglet` + `.pilule…` · `.centre` `.droite` `.dossier` |
| P07 | Étiquette verticale | Titre du panneau en petites capitales, tourné, le long du bord gauche | 14 | `.etiquette-v` |
| P08 | Carte d'étape | Numéro dans un disque, filet vertical, texte avec mots en gras | 10 | `.etape` > `.num` + `.sep` + texte |
| P09 | Bento | Cartes colorées juxtaposées avec 20–24 px d'écart | 17 | `.bento` |
| P10 | Carte penchée | Carte blanche tournée de 6–8°, qui flotte près du produit | 19 | `.carte.incline` (`--rot`) |
| P11 | Bloc date | Jour en très gros sur pavé clair, petite étiquette du jour au-dessus, année en étiquette penchée | 05 | `.bloc-date` > `.petit` `.jour` `.annee` (`--taille`, `--annee`, `--sur-annee`) |
| P12 | Lignes d'informations | Pile de lignes, chacune dans un style différent : pilule double, ligne surlignée, étiquette + texte, pilule contour | 02 | `.infos` > `.pilule-double`, `.info-ligne.surlignee`, `.info-ligne` |
| P13 | Panneau accroché | Panneau de couleur collé sous une carte, comme s'il en descendait | 09 | `.panneau.plein.colle-haut` |
| P14 | Barre de réassurance | Barre en verre clair qui aligne deux ou trois pilules à icône (« Plateforme sécurisée », « Livraison instantanée ») | 17 | `.panneau.verre.clair.reassurance` + `.pilule.avec-ic` |
| P15 | Bord lumineux | Bord clair en haut du panneau, qui s'efface vers le bas | 10, 14, 15 | `.bord-lumineux` |
| P16 | Halo | Lueur colorée autour et à l'intérieur du panneau | 12 | `.halo` (`--couleur`) |

Un panneau contient une seule idée : la liste, ou le prix, ou les informations pratiques. Jamais tout.

---

## E — Pilules, étiquettes, badges

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| E01 | Pilule pleine | Texte gras dans une forme entièrement arrondie, couleur de marque ou d'accent | 02, 09, 10 | `.pilule` · `.accent` `.accent2` `.blanc` `.noir` |
| E02 | Pilule en dégradé | Dégradé clair en haut, soutenu en bas, léger relief | 04, 12 | `.pilule.degrade.relief` (`--g1` `--g2`) |
| E03 | Pilule contour | Bord fin, fond vide ; en série pour les caractéristiques | 02, 19 | `.pilule.contour`, série dans `.chips` |
| E04 | Pilule double | Bord fin qui contient un libellé plein à gauche et une valeur en gras à droite | 02, 15, 16 | `.pilule-double` > `.cle` + `.val` |
| E05 | Étiquette penchée | Pilule tournée de 3–4°, en autocollant (double blanc décalé) ou en parallélogramme | 05, 15 | `.pilule.penche`, `.autocollant`, `.biais` |
| E06 | Badge éclat | Étoile dentelée de 16–20 pointes avec un chiffre fort | 01, 16 | `.badge-eclat` (`data-pointes` `data-creux` `--d` `--couleur`) |
| E07 | Badge rond | Disque de couleur vive, texte centré, souvent penché et à cheval sur un coin | 17, 19 | `.badge-rond` (`.lisere`) |
| E08 | Badge nuage | Forme à lobes, claire, pour un slogan en trois mots | 04 | `.badge-nuage` (`data-lobes`) |
| E09 | Ticket de prix | Étiquette aux bords crantés, épinglée | 18 | `.ticket` + `.epingle` |
| E10 | Pastille pseudo | Pilule en verre avec l'icône du réseau et le nom du compte | 11, 13 | `.pilule.verre` + `<i class="ic" data-ic="m:tiktok">` |
| E11 | Étiquette nom | Pilule avec icône de personne et nom, posée près du héros | 06 | `.pilule.carre.degrade` + icône |
| E12 | Tampon pointillé | Pilule à bord en pointillés, précédée d'un petit sceau | 16 | `.pilule.pointille` + `.badge-eclat` |
| E13 | Micro-étiquette | Toute petite pilule posée sur le coin haut d'un bloc (« Infoline ») | 10 | `.micro` |
| E14 | Chips | Petits rectangles blancs : drapeau ou pictogramme + sigle | 15 | `.chip` |
| E15 | Note et avis | Smiley ou étoiles + « 4,9 avis positifs » | 17, 18 | `.note` + `.etoiles` (`data-note`) |
| E16 | Pastille à légende | Icône dans un rond, deux mots dessous | 01 | `.pastille` > `.ic-rond` + légende |
| E17 | Badges de boutiques | App Store et Google Play | 08 | `.store`, `.store.noir` |
| E18 | Billet d'entrée à talon | Billet de cinéma ou de concert : corps avec le prix, talon séparé par des pointillés et deux encoches, légèrement penché | — (ajout) | `.billet` > `.corps` + `.talon` (`--couleur` `--sur` `--l` `--talon` `--rot`) |

---

## L — Listes et puces

Toujours `<ul class="liste" data-puce="…">`. La puce est posée par le kit.

| Id | Puce | Aspect | Vu sur | `data-puce` |
|---|---|---|---|---|
| L01 | Coche dans un rond | Coche blanche sur rond de couleur, ou coche de couleur sur rond blanc cerclé | 01, 02, 11, 16 | `check-rond`, `check-blanc` |
| L02 | Flèche dans un rond | Flèche foncée sur rond jaune | 04 | `fleche-rond` |
| L03 | Chevron | Pointe de flèche pleine, ou chevron dans un rond | 06, 13 | `chevron`, `chevron-rond` |
| L04 | Badge vérifié | Sceau dentelé avec coche | 12 | `badge` |
| L05 | Icône de thème | Mégaphone, éclair, étoile… en rapport avec le sujet | 14 | `megaphone`, `eclair`, `etoile`, `ic:nom-phosphor` |
| L06 | Coche fine | Coche dans un cercle au trait | 03 | `check-contour` |
| L07 | Coche simple, case | Coche seule ; case cochée | 07, 17 | `check`, `coche-carre` |
| L08 | Point, numéro | Point rond ; numéro dans un disque | 01 (boîte), 18 | `point`, `numero` (+ `data-zero` pour 01, 02) |

Mises en forme : `.liste.col2` (deux colonnes, vu sur 01), `.liste.separee` (filet entre les lignes, 03),
`.liste.rangees` (chaque ligne dans sa pilule, 17), `<li class="bonus">` (ligne bonus avec libellé en couleur, 14),
fin de ligne en gras avec `<b>` (06).

Relevé : 3 à 6 lignes, 5 à 8 mots par ligne, texte 24–30 px, écart entre lignes 18–24 px.

---

## X — Prix

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| X01 | Duo de pavés | Deux pavés côte à côte, libellé fin au-dessus : ancien prix barré sur jaune, prix promo blanc sur rouge | 01 | `.prix-duo` > `.prix-case` > `.libelle` + `.pave.ancien` / `.pave.nouveau` |
| X02 | Duo de pilules | Pilule grise « prix normal » barrée de rouge, pilule d'accent « nouveau prix » | 14 | `.prix-pilule.ancien` / `.nouveau` |
| X03 | Cartes empilées | Carte blanche « ancien prix » barré, carte de couleur « nouveau prix » avec flèche | 06 | `.prix-carte.ancien` / `.nouveau` |
| X04 | Grande carte prix | Carte de couleur : libellé suivi d'un filet, montant énorme, mention en italique | 12 | `.carte-prix` > `.ligne` + `.montant` + `.ligne.fin` |
| X05 | Prix géant | Carte blanche carrée : un mot, puis le prix sur toute la largeur | 09 | `.panneau.carte` + `.prix-geant` + `.devise` |
| X06 | Tickets | Voir E09 | 18 | `.ticket` |
| X07 | Ligne de prix | Ancien prix gris barré, flèche, nouveau prix énorme en accent, devise en petit | 19 | `.prix-ligne` > `.ancien` + `.fleche` + `.nouveau` |
| X08 | Mention de paiement | « Payable en 2 fois », coordonnées de paiement, en petit espacé | 01, 06 | `.mention` |
| X09 | Badge de réduction | Voir E06 et E07 : « -60 % » | 19 | `.badge-rond`, `.badge-eclat` |

Le trait qui barre : `.barre` (horizontal), `.barre.diag` (penché), `.barre.rouge` ; `--ep-trait` règle son épaisseur.
Le nouveau prix est toujours plus gros et plus coloré que l'ancien. La devise est 2 à 3 fois plus petite que le montant.

---

## N — Appels à l'action

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| N01 | Languette | Pilule blanche suspendue en haut du socle, avec un point de couleur avant le texte | 04 | `.cta.blanc.languette` + `.point` |
| N02 | Bouton plein | Rectangle arrondi en dégradé de la couleur de marque | 13 | `.cta.degrade.carre` |
| N03 | Bouton à icône | Icône de téléchargement ou de validation avant le texte | 11, 12 | `.cta` + `.ic` ou `.ic-rond` |
| N04 | Adresse du site | Pilule façon barre de recherche (globe, adresse, loupe), avec un curseur de souris posé dessus | 03, 08 | `.url` + `.curseur` |
| N05 | Ovale à la main | Deux ovales tracés à la main autour de deux lignes de texte | 14 | `.ovale-main` |
| N06 | Phrase d'appel | Capitales fines espacées, suivies d'un triangle rouge | 01 | `.appel` + `.triangle-bas` |
| N07 | Encadré | Phrase d'appel dans un rectangle au trait fin | 03 | `.cta.contour.carre` |
| N08 | Date limite | « Rejoignez-nous avant » + date, en pilule double | 15 | `.pilule-double` |

Un seul appel à l'action par affiche, à l'endroit où l'œil finit sa lecture : en bas à gauche ou au centre du socle.

---

## J — Pied de page et contacts

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| J01 | Barre sombre | Barre noire arrondie : icônes blanches rondes, numéro, tiret, e-mail | 04 | `.barre-contact.noir.biseau` > `.contact` + `.tiret` |
| J02 | Bandeau de marque | Bandeau arrondi de la couleur de marque, devant le héros : adresse à gauche, téléphone à droite | 09 | `.barre-contact` |
| J03 | Bande blanche | Voir B03 : adresse, téléphones, logos | 02 | `.bande-pied` |
| J04 | Rangée de réseaux | Icônes rondes blanches côte à côte, nom du compte dessous ou à côté | 05, 07, 13 | `.reseaux` > `.ic-rond.blanc` |
| J05 | Pseudos | Icône ronde d'accent + pseudo, répétés | 08 | `.contact` + `.ic-rond` |
| J06 | Infoline | Numéro dans une étiquette sombre, micro-étiquette au-dessus, filet qui file vers les réseaux | 10 | `.infoline` + `.micro` + `.filet` |
| J07 | Barre des partenaires | Barre blanche : contacts, séparateur pointillé, logos partenaires, logo rond qui dépasse à droite, bandeau slogan dessous | 15 | `.barre-contact.blanc` + `.logos` + `.logo-rond` |
| J08 | Contacts en texte | Libellé en gras, numéros en couleur séparés par `||` | 16 | texte simple |
| J09 | Gros numéro | Icône de téléphone en accent + numéro en très gras (36–40 px) | 14 | `.contact.w8` |

Ordre de lecture relevé : ce qu'on fait (appel à l'action), puis où (adresse ou site), puis comment joindre.

---

## K — Icônes

`<i class="ic" data-ic="nom"></i>` : l'icône prend la taille et la couleur du texte.

- **Pictogrammes** : jeu Phosphor, 1 512 icônes en trois graisses. `phone` (plein), `phone:bold` (trait épais),
  `phone:regular` (trait fin). Chercher un nom : `node scripts/icones.js téléphone`.
- **Marques** : `m:whatsapp`, `m:facebook`, `m:instagram`, `m:tiktok`, `m:youtube`, `m:x`, `m:telegram`…
  Ajouter `:couleur` pour la couleur officielle.
- **Supports** : `.ic-rond` (rond plein), `.ic-carre` (carré arrondi), `.ic-anneau` (cercle au trait), avec
  `.blanc`, `.relief`, et les variables `--d` (diamètre), `--ic-fond`, `--ic-couleur`.

Règle relevée : sur une affiche, toutes les icônes ont le même style (toutes pleines, ou toutes au trait) et le
même support.

---

## D — Décorations

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| D01 | Étoiles 3D dorées | 3 à 5 étoiles en volume, de tailles différentes, penchées, dont deux coupées par le bord | 09 | `<img class="deco3d" src="{{KIT}}/3d/etoile.png">` |
| D02 | Icônes 3D floues | Logos ou objets 3D aux coins, d'autant plus flous qu'ils sont grands (profondeur de champ) | 02, 03, 11, 17, 18 | `.deco3d` ou `.tuile-3d`, + `.flou1` `.flou2` `.flou3` |
| D03 | Billets et pièces | Billets ou pièces qui volent autour du héros | 06, 12, 13 | `3d/billets-ailes.png`, `3d/billet-dollar.png`, `3d/piece.png` + `.file` |
| D04 | Coups de pinceau | Traînées de peinture sèche derrière le héros, blanches ou d'accent | 04, 12 | `<div class="pinceau" data-forme="1">` (1, 2, 3) |
| D05 | Objets en mouvement | Feuilles, carnets qui volent avec un flou de vitesse | 04 | `.deco3d.file` |
| D06 | Flèche pointillée | Flèche en pointillés qui fait une boucle, du texte vers la liste | 07 | `<span class="fleche-main" data-forme="1">` (1 boucle, 2 courbe, 3 pleine) |
| D07 | Chevron pointeur | Gros chevron d'accent au-dessus d'une carte | 03 | `.chevron-pointe` |
| D08 | Points de pagination | Cinq petits disques, le premier plus opaque | 17 | `.points` |
| D09 | Étoiles de notation | Cinq étoiles jaunes | 18 | `.etoiles` |
| D10 | Lueur derrière le héros | Halo de la couleur claire du fond, derrière la tête et les épaules | 04, 06, 12, 13, 16 | `.lueur` |
| D11 | Filets | Traits fins horizontaux ou verticaux, pleins ou pointillés | 09, 10, 15 | `.filet`, `.filet.v`, `.pointille` |
| D12 | Étincelle | Étoile à quatre branches avec halo | 01 | `.etincelle` |
| D13 | Crédit vertical | Signature du graphiste, minuscule, tournée, sur un bord | 10, 18 | `.credit-v` |
| D14 | Reflet sur les cartes | Trait de lumière sur l'arête haute ou basse d'une carte | 10, 15 | `.reflet` |
| D15 | Demi-cercle | Demi-disque d'accent coupé par le bord | 01 | `.demi-cercle` |
| D16 | Pellicule | Bande de film à perforations, penchée, qui traverse l'affiche ; chaque vue reçoit une capture ou un objet | — (ajout) | `.pellicule` > `.vue` > `<img>` ou `<img class="objet">` (`--rot` `--lv` `--hv`) + `data-bord` |

Les 202 objets 3D disponibles sont listés dans `assets/3d/catalogue.json` (chercher : `node scripts/icones.js argent`).
Dosage relevé : 3 à 6 décorations, toutes de la même famille, placées dans les coins et autour du héros,
jamais sur le texte.

---

## H — Héros : personne, produit, maquettes

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| H01 | Personne détourée | Photo de studio, cadrée à la taille, bras croisés ou objet en main, regard caméra, coupée par le bas | 04, 05, 06, 09, 11, 13, 14, 15, 16, 17, 18 | `<img class="heros" src="personne.png">` (`--h` hauteur, `--bas`) |
| H02 | Liseré de lumière | Halo de la couleur du fond autour de la silhouette | 06, 13, 16 | `.heros.lisere` (`--couleur`) |
| H03 | Boîte produit | Boîte en volume avec le titre de l'offre sur la face | 01 | `.mk-boite` |
| H04 | Livre | Livre en volume, couverture composée comme une mini-affiche | 19 | `.mk-livre` |
| H05 | Téléphone | Téléphone penché de 6–10° avec une capture d'écran | 08, 11 | `.mk-telephone` |
| H06 | Ordinateur portable | Portable de face, posé sur un sol clair, avec une capture | 03 | `.mk-laptop` + `.sol` |
| H07 | Personnage 3D | Robot ou mascotte à la place de la personne | 11, 12 | image fournie ou générée |
| H08 | Photo plein cadre | Voir F11 | 07 | `.fond-photo` |
| H09 | Héros dans une carte | La personne sort d'une carte de couleur : épaules dans la carte, tête au-dessus | 17 | `.panneau.plein` + `.heros` au-dessus |
| H10 | Bas fondu | Le bas du héros se dissout dans le fond | 15 | `.fondu-bas` |
| H11 | Photo encadrée | Photo non détourée dans une arche, un cercle ou un rectangle arrondi | — (ajout) | `.cadre-photo` (`.arche` `.cercle` `.lisere`) |

Relevé : le héros occupe 45 à 60 % de la hauteur ; sa tête est dans le tiers haut ou au centre ; son regard ou
ses épaules pointent vers le texte ; ses vêtements reprennent une couleur de l'affiche.

---

## G — Logo

| Id | Élément | Aspect | Vu sur | Kit |
|---|---|---|---|---|
| G01 | Logo dans un rond cerclé | Disque blanc, anneau d'accent, léger halo, centré en haut | 09 | `.logo-rond` (`--d` `--anneau`) |
| G02 | Logo en haut à gauche | Petit (5–7 % H), avec le site ou le pseudo en face à droite | 08, 13, 16 | `<img class="logo">` |
| G03 | Logo en haut à droite | Quand le titre occupe la gauche | 07, 11 | idem |
| G04 | Logo centré en haut | Sur fond clair | 17 | idem |
| G05 | Logo sur pastille claire | Logo foncé posé sur un rectangle blanc pour rester lisible sur fond sombre | 03 | `.logo-pastille` |
| G06 | Logos partenaires | Rangée de logos en pied | 02, 15 | `.logos` |
| G07 | Logo au-dessus du titre | Petit logo d'église ou d'association juste au-dessus du titre | 05 | `<img class="logo">` |
| G08 | Logo en texte | Nom en gras + pictogramme, quand il n'y a pas de fichier | — (ajout) | `.logo-texte` |

Le logo est le plus petit des éléments importants : il signe, il ne vend pas.

---

## Q — Palettes relevées

Couleurs mesurées sur les images. Rôles : **fond** (60 % de la surface), **marque** (30 %), **accent** (10 %).

| N° | Affiche | Fond | Marque | Accent | Clair |
|---|---|---|---|---|---|
| 01 | Coaching MRR | anthracite `#2A2A2A` → `#474646` | rouge `#EA191D` | jaune `#FFD21F` | gris `#D2D0CF` |
| 02 | Maîtrisez le numérique | bleu roi `#040594` → `#04035B` | rouge `#F01414` | jaune `#FFF200` | blanc `#F5F6F7` |
| 03 | HR Engine | bleu `#0F3FBD` → `#0D3A86` | bleu nuit `#172037` | jaune `#F2C230` | crème `#F5EFD9` |
| 04 | Copywriting | noir `#0B0904` | jaune `#EACD04` | or `#E9BA49` | crème `#FDFDF5` |
| 05 | Mardi Ciel ouvert | bordeaux `#530405` | rouge vif `#ED0708` | saumon `#E2A585` | crème `#F1E3D1` |
| 06 | Content Blueprint | bleu `#1B4B86` → `#0B1B3E` | bleu clair `#5DB7E5` | vert menthe `#3DF0A8` | blanc |
| 07 | Nguwa Design | brique `#791C0B` | brun `#471F0F` | orange `#FF9A1F` | blanc |
| 08 | VendorSan | vert `#1E604A` → `#276C52` | blanc `#FCFDFC` | jaune `#EABD22` | crème `#E5E1D5` |
| 09 | Alpha Impact | vert `#0F502F` | menthe `#3EAE7F` | menthe clair `#76C3A2`, or `#F5B921` | blanc `#FAF8F9` |
| 10 | Conditions | bleu nuit `#020536` → `#010C21` | bleu électrique `#081DBB` | jaune `#FFE600`, rouge `#D0121B` | blanc |
| 11 | Andromeda téléphone | bleu `#0D25E0` → `#121592` | rouge `#E53935` | jaune `#FFE94A` | blanc `#F7F7F8` |
| 12 | AI Income Blueprint | bleu nuit `#030521` → `#0D1A49` | bleu `#2556C6` | pêche `#EAB072` | blanc `#F9FBFE` |
| 13 | Zynex Crypto Hub | violet nuit `#0E051D` | violet `#623DA2` | orange `#FF9D47` | blanc `#FAFAFE` |
| 14 | Social Media Ads | noir `#121212` | argent `#BBBCBC` | or `#E0B93B` | blanc |
| 15 | Clirap | vert sapin `#0E3930` | rouge `#C42121` | orange `#F5AD31` | blanc `#F9FBF9` |
| 16 | German Class | bordeaux `#4D0309` → `#640712` | rouge vif `#F61E30` | jaune `#FFC61A` | blanc |
| 17 | The WhatsApp Closer | blanc `#FCFCFC` | orange `#F96409`, bleu `#1A69C8` | vert `#2FB141` | — |
| 18 | Andromeda Facebook Ads | pétrole `#09191F` / bleu ciel `#B8DEEB` | vert `#2ECC40` | cyan `#22D3EE`, orange `#FF8A00`, rouge `#E11D2A` | — |
| 19 | Ose te montrer | orange `#F24A15` / bleu `#1F47E5` → nuit `#090C30` | blanc | jaune `#EEE81F` | blanc |

Familles qui reviennent :
- **Sombre + un accent chaud** (04, 12, 13, 14) : luxe, argent, expertise.
- **Bleu + jaune** (02, 03, 10, 11) : technologie, confiance, formation.
- **Vert + blanc** (08, 09, 15) : sérieux, croissance, éducation.
- **Bordeaux + rouge vif** (05, 16) : énergie, événement, ferveur.
- **Deux couleurs vives opposées** (17, 18, 19) : promotion, jeunesse.

---

## R — Recettes : les touches qui font « pro »

Ce sont les combinaisons vues sur les meilleures références. En choisir deux ou trois par affiche.

1. **Panneau à onglet** : P01 ou P02 + P06 + puces en accent. Le titre de la liste devient un objet.
2. **Socle qui coupe le héros** : B02 par-dessus le bas de H01, avec N01 en languette. L'affiche se termine net.
3. **Profondeur de champ** : D02 en trois tailles : un grand objet très flou au premier plan, un moyen un peu
   flou, un petit net. L'image paraît photographiée.
4. **Un mot, une couleur** : T02 sur un seul mot du titre, et la même couleur sur les puces et le prix. L'œil relie les trois.
5. **Ancien prix barré, nouveau prix énorme** : X01, X02 ou X07 + un badge de réduction penché à cheval sur le coin.
6. **Le héros déborde** : la tête du héros passe devant le titre ou sort d'une carte (H09). Les plans se superposent.
7. **Lueur derrière la tête** : D10 dans la teinte claire du fond. Le héros se détache sans contour.
8. **Écriture en travers** : T05, un seul mot, penché, en accent. Donne de la vie à un titre très géométrique.
9. **Réassurance** : P14 ou E16 près du prix (« Paiement sécurisé », « Accès immédiat »). Lève le doute au moment d'acheter.
10. **Un thème tenu jusqu'au bout** : quand le nom de l'offre évoque un univers (cinéma, voyage, cuisine), deux ou
    trois éléments le déclinent : pellicule D16, billet E18 et faisceau F16 pour le cinéma. Pas plus de trois.
11. **Le vide** : garder un tiers de l'affiche sans texte. Une affiche pleine se lit moins qu'une affiche aérée.
