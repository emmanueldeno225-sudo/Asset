# Textes pour un générateur d'images

Deux usages :
- **A. Générer le héros** (une personne, un produit, une mascotte) qu'on posera ensuite dans l'affiche du kit.
  C'est l'usage normal quand il n'y a pas de photo.
- **B. Générer l'affiche entière** avec ChatGPT ou un autre générateur, quand la personne le demande ou que les
  scripts ne peuvent pas tourner.

Un générateur réinvente toujours un peu : pour un texte exact, un vrai logo et un vrai visage, l'affiche du kit
reste plus sûre. Dis-le simplement quand on te demande le mode B.

Générer une image peut consommer les crédits de la personne. Annonce-le avant, et ne relance jamais une
génération pour « réessayer » sans le dire.

---

## A. Générer le héros

Le héros est généré **sans aucun texte**, sur fond uni, pour être détouré puis posé dans l'affiche.

### Personne

```
Photo de studio professionnelle, plan taille, d'une [femme / d'un homme] [origine, âge approximatif],
[coiffure], expression [confiante et souriante / déterminée / joyeuse], regard vers l'objectif,
[pose : bras croisés / tient un téléphone / tient un carnet et un stylo / montre vers la gauche].
Tenue : [vêtement] de couleur [couleur d'accent de l'affiche, en mots et en code], [second vêtement neutre].
Éclairage doux de face, léger contre-jour [couleur claire du fond de l'affiche] sur les épaules et les cheveux.
Fond uni gris clair parfaitement lisse, sans décor, sans ombre portée au sol.
Cadrage vertical, le sujet occupe toute la hauteur, coupé à la taille, rien de coupé sur les côtés ni au-dessus de la tête.
Aucun texte, aucun logo, aucun filigrane. Rendu photo réaliste, net, haute définition.
```

À adapter :
- **La tenue reprend la couleur d'accent** de l'affiche (veste moutarde sur une affiche noir et jaune) : c'est la
  touche qui lie le héros au reste.
- **La pose regarde vers le texte** : si le texte est à gauche, épaules tournées légèrement vers la gauche.
- Format vertical 2:3 ou 3:4. Demande un fond transparent si le générateur le propose ; sinon fond uni, puis
  `python3 scripts/detourer.py`.
- Ne demande jamais « la même personne que sur l'affiche de référence ».

### Produit ou objet

```
Rendu 3D réaliste d'[objet : un casque audio / un flacon / une pile de livres], vu de trois quarts, légèrement en plongée,
matière [mate / brillante], couleurs [palette de l'affiche], éclairage de studio doux avec un reflet net,
fond uni gris clair, ombre de contact légère, aucun texte, aucun logo.
```

Pour un livre, un guide, un pack ou une application, préfère les maquettes du kit (`mk-livre`, `mk-boite`,
`mk-telephone`) : le titre y est exact.

### Mascotte ou personnage 3D

```
Personnage 3D style film d'animation : [robot amical blanc et bleu / mascotte], buste, expression [curieuse / enthousiaste],
[tient un téléphone / lève le pouce], matières lisses et brillantes, éclairage de studio, contre-jour [couleur],
fond uni gris clair, aucun texte, aucun logo.
```

### Décor 3D isolé

Le kit fournit 202 objets 3D (`node scripts/icones.js <mot>`). N'en génère un que s'il manque :

```
Icône 3D isolée de [objet], style rendu doux et brillant, couleurs vives, vue de trois quarts,
fond transparent (ou uni blanc), aucune ombre au sol, aucun texte.
```

---

## B. Générer l'affiche entière

À donner avec, en pièces jointes : l'affiche de référence, le logo, la photo de la personne. Sans ces pièces, le
générateur invente un visage et un logo.

Ce qui fait dériver un générateur, et la parade :

| Dérive constatée | Parade dans le texte |
|---|---|
| Police étroite et haute au lieu d'une police large | Décrire la forme des lettres : « lettres plus larges que hautes, très grasses », et interdire « police étroite ou condensée » |
| Italique ajouté | « Aucun italique » |
| Effets brillants, contours lumineux, dégradés partout | « Design plat et mat, couleurs unies » si la référence est mate ; à l'inverse, nommer les effets voulus |
| Éléments trop gros, affiche tassée | Donner les positions et les tailles en pourcentage de la largeur et de la hauteur |
| Traits, cadres, séparateurs ajoutés | Liste « Interdit » à la fin |
| Texte corrigé ou reformulé | « Respecte exactement les textes entre guillemets » |

Gabarit :

```
Crée une affiche publicitaire au format portrait [4:5, 1080 × 1350 px] pour [offre].
Style : [ADN de style en deux phrases : ambiance, matières, plat ou brillant].
Respecte exactement les textes entre guillemets, sans en ajouter, en retirer ni en corriger.

PALETTE
- Fond : [nom] ([code]). Marque : [nom] ([code]). Accent : [nom] ([code]). Clair : [code]. Aucune autre couleur dominante.

POLICES
- Titres : [description de la forme des lettres + un nom de police proche]. [Aucun italique.]
- Textes : [description].

FOND
- [couches du fond, de l'arrière vers l'avant]

BLOCS (positions en % de la largeur L et de la hauteur H)
- Logo : [forme, taille, position].
- Titre : de [x1] à [x2] % L, de [y1] à [y2] % H : « … » en [couleur], « … » en [couleur d'accent].
- Sous-titre : « … »
- Héros : [description ou « la personne de la photo jointe »], [position, taille, pose]. [Ce qui coupe son bas.]
- Panneau : [matière, arrondi, position] avec l'étiquette « … » et la liste : « … », « … », « … ». Puces : [forme, couleur].
- Prix : [forme] « … » ; ancien prix barré « … ».
- Appel à l'action : [forme] « … ».
- Contacts : [forme, position] « … », « … ».
- Décor : [objets, nombre, positions, flou].

INTERDIT
[italique, police condensée, effets brillants, cadres ou traits ajoutés, éléments agrandis, texte ajouté ou corrigé, filigrane]
```

Conseil à donner avec le texte : si le résultat s'écarte, corriger **un seul point à la fois** dans la même
conversation (« garde tout, mais élargis la police du titre »), plutôt que de tout régénérer.
