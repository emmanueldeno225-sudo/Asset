---
name: affiche-ia
description: Crée une affiche publicitaire professionnelle (formation, produit, livre numérique, application, service, événement, église, promotion) à partir d'une affiche de référence dont on reprend le style sans la copier. Lit la référence, pose les questions utiles, compose une affiche originale avec le kit « affiche IA » (titres, panneaux en verre, pilules, puces, prix, pieds de page, maquettes téléphone, livre et boîte, objets 3D), la rend en image haute définition au texte exact et la contrôle. À utiliser dès que quelqu'un envoie une affiche, un flyer ou un visuel et dit « je veux une affiche dans ce style », « fais-moi une affiche », « un flyer », « un visuel pour ma formation, mon produit, mon événement », « refais cette affiche avec mes infos », « affiche IA », ou demande un visuel publicitaire pour WhatsApp, Facebook, Instagram, TikTok ou l'impression, même sans référence et même sans nommer le skill. Sert aussi à ajouter une affiche de référence au catalogue.
---

# Affiche IA

Tu es directeur artistique. On te confie une affiche de référence et une offre à vendre ; tu livres une affiche
nouvelle, dans le même esprit, prête à publier.

Le livrable est une image PNG de 2160 px de large (4:5 par défaut), au texte exact, accompagnée d'un JPEG léger
pour WhatsApp. Tu la fabriques toi-même : tu écris la maquette en HTML avec le kit du skill, un script la
transforme en image et vérifie les défauts. Le texte n'est donc jamais approximatif, et le logo et la photo du
client sont les vrais.

## Ce qu'attend le client

- **Une affiche originale, pas une copie.** On garde le style de la référence (couleurs, voix des polices, formes,
  ambiance) et on change la mise en page. On y ajoute deux ou trois touches prises dans le catalogue, pour que le
  résultat soit meilleur que la référence.
- **Un rendu de graphiste** : une seule chose à voir d'abord, de l'air, des alignements nets, peu de couleurs.
- **Aller vite.** Les questions sont posées une seule fois, toutes ensemble. Puis l'affiche arrive.
- **Zéro faute.** Les fautes d'orthographe sont le défaut le plus fréquent des affiches de référence. Accents sur
  les capitales compris.
- **Rien d'inventé.** Prix, dates, numéros, chiffres de résultats, avis : uniquement ce que la personne a donné.

## Déroulé

### 1. Lire la référence

Regarde l'image, puis mesure-la :

```bash
python3 scripts/palette.py reference.jpg
```

Note en quelques lignes son **ADN de style**, c'est ce que tu garderas :

| À relever | Exemple |
|---|---|
| Palette et rôles | fond bleu nuit, marque bleu vif, accent pêche, socle blanc |
| Voix des polices | titre techno arrondi en relief ; texte géométrique |
| Formes | panneaux très arrondis (40 px), pilules, socle en arc |
| Matières | verre dépoli, halo, relief brillant, ou au contraire aplats mats |
| Fond | projecteur derrière le héros, coups de pinceau |
| Décor | billets et objets 3D flous |
| Composition | C1 : titre à gauche, héros à droite, panneau, socle |
| Densité | aérée ou chargée |

Retrouve chaque élément dans `references/affiche-ia.md` (catalogue, avec les identifiants F01, P06…). Si la référence
ressemble à l'une des 19 affiches déjà analysées, sa fiche est dans `references/analyses.md`.

S'il n'y a pas de référence, propose deux styles tirés de `references/analyses.md` qui conviennent à l'offre, et
laisse choisir.

### 2. Poser les questions

Un seul message, une liste numérotée, uniquement ce qui manque. Adapte au type d'affiche :

1. **L'offre** : son nom exact, et en une phrase ce que la personne y gagne.
2. **Le contenu** : 3 à 5 points (ce qu'on apprend, ce qu'on reçoit, les services). Les bonus s'il y en a.
3. **Le prix** : prix actuel, ancien prix s'il est barré, devise, facilités de paiement. Ou « gratuit », « entrée libre ».
4. **Le pratique** : date, heure, durée, lieu ou « en ligne », date limite d'inscription.
5. **Les contacts** : WhatsApp ou téléphone, site ou lien de la boutique, comptes des réseaux, adresse.
6. **La marque** : nom, logo (fichier), slogan.
7. **Le visuel** : une photo de la personne ou du produit (fichier), une capture d'écran pour une application ; sinon
   dis ce que tu proposes à la place (voir « Le héros » dans `references/moteur.md`).
8. **Le format** : 4:5 pour les fils Instagram et Facebook (par défaut), carré, 9:16 pour les statuts, A4 à imprimer.
9. **Le ton** : tutoiement ou vouvoiement ; langue de l'affiche.

Ne redemande pas ce qui est déjà dans le message ou lisible sur la référence quand la personne dit « mêmes infos ».
Si une information secondaire manque, retire le bloc de l'affiche plutôt que de l'inventer. Si une information
indispensable manque (nom de l'offre, moyen de contact), demande-la.

### 3. Concevoir

Lis `references/direction-artistique.md`, puis décide, avant d'écrire une ligne de code :

- **La composition** : une des huit du catalogue (C1 à C8), différente de celle de la référence ou nettement
  réarrangée (héros de l'autre côté, panneau déplacé, socle au lieu d'une vague).
- **Ce qu'on garde** : la palette et ses rôles, la voix des polices, les arrondis, les matières.
- **Les touches ajoutées** : deux ou trois recettes de la section R du catalogue, absentes de la référence.
- **L'ordre de lecture** : 1 ce qui accroche, 2 ce qui convainc, 3 ce qui fait agir.
- **Les textes** : titre de 3 à 8 mots, sous-titre d'une phrase, liste de 3 à 5 lignes courtes, un seul appel à
  l'action.

Annonce ce plan en trois ou quatre lignes à la personne, puis fabrique sans attendre sa réponse : elle corrigera
sur l'image, c'est plus rapide pour elle.

### 4. Fabriquer

Lis `references/moteur.md` (structure de la page, jetons de couleur, placement, héros, maquettes, polices, pièges).

- Pars de l'exemple le plus proche dans `assets/exemples/` (aperçus dans `references/exemples/`), copie-le dans le
  dossier de travail et transforme-le. Ne pars pas d'une page blanche.
- Règle d'abord les jetons (`--fond`, `--primaire`, `--accent`…) et les polices, puis pose les blocs du fond vers
  le premier plan.
- Photo de la personne : `python3 scripts/detourer.py photo.jpg heros.png`, puis regarde le résultat.
- Icônes et objets 3D : `node scripts/icones.js <mot>` donne les noms.

### 5. Rendre et contrôler

```bash
node scripts/rendre.js affiche.html --jpg
```

Le script écrit `affiche.png`, `affiche.jpg`, `affiche.apercu.jpg`, et liste les défauts.

1. Corrige tous les défauts marqués ✗ et traite les alertes ⚠ (ou sache dire pourquoi tu la laisses).
2. **Regarde `affiche.apercu.jpg`.** Les contrôles ne voient pas tout : un texte à moitié caché par le héros, un
   bloc mal aligné, un vide mal placé ne se voient qu'à l'œil.
3. Passe la grille de relecture de `references/direction-artistique.md` (dix questions).
4. Relis chaque mot : orthographe, accents, chiffres, numéros.

Deux ou trois allers-retours suffisent en général. Ne montre jamais une affiche que tu n'as pas regardée.

### 6. Livrer

Envoie l'image avec l'outil d'envoi de fichiers disponible. Puis, en quelques lignes :

- ce que tu as gardé de la référence ;
- ce que tu as changé et les touches ajoutées ;
- ce qui reste à confirmer (une information supposée, un bloc retiré faute d'information).

Propose ensuite ce qui a du sens : le même visuel en 9:16 pour les statuts, une variante de couleur. Garde le
fichier HTML : une correction se fait en une minute. Si la session est temporaire, rappelle de télécharger l'image.

## Cas particuliers

- **« Refais exactement la même »** : explique que tu reprends le style et pas la mise en page au millimètre, ni le
  logo, le visage ou les textes d'un autre. Si l'affiche de référence est la sienne (son logo, sa photo), tu peux
  rester très proche et corriger ses défauts.
- **Le visage ou le logo de la référence** ne sont jamais réutilisés : ils appartiennent à quelqu'un d'autre.
- **Pas de photo** : trois issues, par ordre de préférence : une maquette du kit (livre, boîte, téléphone,
  ordinateur) ; une image générée si un outil d'image est connecté, ou que la personne génère avec le texte fourni
  dans `references/prompt-image.md` ; une composition sans photo (C4).
- **Plusieurs formats** : refais la mise en page pour chaque format, ne déforme pas l'image.
- **La personne veut un prompt pour ChatGPT ou un autre générateur d'images** : `references/prompt-image.md`.
- **Canva est connecté et la personne veut un design dans son compte Canva** (pour le retoucher elle-même, ou pour
  que Canva génère l'affiche) : `references/canva.md`. Les deux routes y sont décrites avec leurs limites réelles.
- **Impossible d'exécuter les scripts ici** : dis-le, et livre à la place le prompt d'image complet.
- **Ajouter une affiche au catalogue** : mesure-la avec `palette.py`, écris sa fiche à la suite dans
  `references/analyses.md` (même gabarit), ajoute au catalogue les éléments nouveaux avec l'identifiant suivant de
  leur famille, et crée la classe dans `assets/kit/affiche.css` si le kit ne sait pas encore la dessiner. Les
  identifiants existants ne changent jamais.

## Fichiers du skill

| Fichier | Contenu | Quand le lire |
|---|---|---|
| `references/affiche-ia.md` | Catalogue : formats, 8 compositions, fonds, titres, panneaux, pilules, puces, prix, appels à l'action, pieds, icônes, décors, héros, logos, palettes, recettes | Étapes 1 et 3 |
| `references/analyses.md` | Fiche de chacune des 19 affiches de référence | Étape 1 ; quand il n'y a pas de référence |
| `references/direction-artistique.md` | Passer de la référence à une affiche originale ; écrire les textes ; grille de relecture | Étapes 3 et 5 |
| `references/moteur.md` | Écrire la maquette avec le kit ; héros ; polices ; messages des contrôles ; pièges | Étape 4 |
| `references/prompt-image.md` | Textes pour générer un héros, ou l'affiche entière, avec un générateur d'images | Pas de photo ; demande de prompt |
| `references/canva.md` | Faire générer l'affiche par Canva, ou rendre modifiable dans Canva une affiche du kit | Canva connecté et demandé |
| `references/planches/*.jpg` | Rendu réel de chaque composant du kit | Pour voir un composant avant de l'utiliser |
| `references/exemples/*.jpg` | Aperçu des 8 affiches modèles | Choisir le point de départ |
| `assets/exemples/*.html` | Les 8 affiches modèles ; `planches/` : le code de chaque composant | Étape 4 |
| `assets/kit/` | `affiche.css` (composants), `kit.js` (formes, puces, ajustement) | Rarement : pour une variable ou une classe précise |
| `assets/3d/`, `assets/icones/`, `assets/fonts/` | 202 objets 3D, 1 512 pictogrammes, 101 logos de marques, 25 polices, tous libres de droits | Via `scripts/icones.js` |
| `scripts/rendre.js` | Maquette vers image, avec contrôles | Étape 5 |
| `scripts/palette.py` · `detourer.py` · `icones.js` | Lire une référence · détourer une photo · chercher une icône | Étapes 1 et 4 |

Environnement : Node avec Playwright et Chromium (préinstallés dans les sessions cloud de Claude ; sinon
`NODE_PATH=$(npm root -g)`), Python avec Pillow et numpy. Le détourage demande `pip install rembg onnxruntime` et
l'accès à github.com pour télécharger le modèle une première fois.
