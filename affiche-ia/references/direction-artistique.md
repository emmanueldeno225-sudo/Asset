# Direction artistique : de la référence à une affiche originale

## Sommaire
1. Ce qu'on garde, ce qu'on change
2. Choisir la composition
3. Choisir les touches
4. Régler la hiérarchie
5. Écrire les textes
6. Couleurs
7. Typographie
8. Le héros
9. Grille de relecture
10. Défauts fréquents

---

## 1. Ce qu'on garde, ce qu'on change

Le style d'une affiche tient à cinq choses. On les garde, parce que c'est ce que la personne a aimé :

| On garde | On change |
|---|---|
| La **palette** et le rôle de chaque couleur | La **mise en page** : composition, côté du héros, place des blocs |
| La **voix des polices** (large, ronde, techno, sérif…) | Les **textes**, écrits pour la nouvelle offre |
| Les **formes** : arrondis, pilules, obliques | Le **héros** : la photo ou le produit du client |
| Les **matières** : verre, relief, aplat mat, grain | Le **décor** : objets en rapport avec la nouvelle offre |
| L'**ambiance** : sombre et luxueuse, vive et jeune, calme | Les défauts de la référence : fautes, blocs trop serrés, textes trop petits |

Si la personne demande de changer la couleur (« dans ce style, mais en bleu »), garde les rôles : le fond reste le
plus sombre, l'accent reste le plus vif.

Trois niveaux de fidélité. Sans indication, prends le deuxième.
1. **Très proche** : même composition, mêmes composants ; on corrige les défauts. Réservé à une affiche qui
   appartient déjà à la personne.
2. **Même esprit, autre mise en page** : même ADN, composition différente, deux ou trois touches ajoutées.
3. **Carte blanche** : on ne garde que la palette et l'ambiance.

## 2. Choisir la composition

Les huit compositions sont décrites dans `affiche-ia.md` (section C). Le choix dépend de ce que tu as en main :

| Tu as… | Prends | Exemple à ouvrir |
|---|---|---|
| une photo détourée d'une personne, une liste de contenus, un prix | C1 | `formation-en-ligne.html`, `formation-premium.html` |
| une photo, un prix, une date, une adresse (formation en salle) | C2 | `formation-en-salle.html` |
| un produit numérique (livre, guide, pack) | C3 centrée | `produit-numerique.html` |
| une application ou un site, avec des captures | C3 côté | `application.html` |
| aucune image : des conseils, des étapes, une annonce | C4 | `etapes-sans-photo.html` |
| un service avec plusieurs prestations, un fond clair voulu | C5 | `bento-service.html` |
| une belle photo d'ambiance non détourable | C6 | — (fond photo + voile, voir `moteur.md`) |
| un événement : date, heure, lieu, orateur | C1 avec bloc date, ou C7 | `evenement.html` |

Pour t'écarter de la référence sans perdre son style :
- inverse les côtés (héros à gauche si la référence l'a à droite) ;
- change la fin de l'affiche : socle en arc à la place d'une vague, bande à la place d'un socle ;
- déplace le prix : dans le socle s'il était près du titre, ou l'inverse ;
- change le conteneur de la liste : panneau contour à la place du verre, lignes en pilules à la place des puces.

## 3. Choisir les touches

Deux ou trois recettes de la section R du catalogue, pas plus. Une touche doit servir l'offre :

| L'offre a… | Touche utile |
|---|---|
| une promotion | ancien prix barré + badge de réduction penché sur un coin (R5) |
| des bonus | cartes penchées (P10) ou ligne bonus (`li.bonus`) |
| un chiffre de preuve (élèves, avis) | badge éclat ou note avec étoiles (E06, E15) |
| un achat en ligne | réassurance : paiement sécurisé, accès immédiat (R9) |
| une date limite | pilule double « avant le… » (E04) |
| un titre court et géométrique | mot manuscrit en travers (R8) |
| un héros fort | lueur derrière la tête et débordement sur le titre (R6, R7) |
| un univers numérique | objets 3D flous en profondeur (R3) |

N'ajoute pas une touche que l'offre ne justifie pas : pas de badge « -50 % » sans réduction réelle.

## 4. Régler la hiérarchie

L'œil suit trois temps. Chacun a sa taille :

1. **Accrocher** : le titre (70–120 px) et le héros. Un seul des deux domine.
2. **Convaincre** : sous-titre (28–36 px), liste (24–30 px), preuve.
3. **Faire agir** : prix, appel à l'action, contact (le prix peut atteindre 90–120 px).

Règles qui tiennent sur toutes les références :
- Le titre est 3 à 4 fois plus gros que le texte courant.
- Un seul élément par affiche a la couleur d'accent en grande surface (un mot du titre, ou le prix, ou le bouton).
  Les autres rappels d'accent sont petits : puces, filets, icônes.
- Les blocs s'alignent sur deux ou trois verticales, pas plus. La marge gauche (64 px) est la principale.
- Les écarts sont des multiples de 8. Ce qui va ensemble est proche (16–24 px), ce qui est distinct est loin (48–64 px).
- Un tiers de l'affiche reste sans texte.
- Tous les arrondis de l'affiche sont de la même famille (`--rayon`).

## 5. Écrire les textes

- **Titre** : 3 à 8 mots. Le nom de l'offre, ou le résultat promis. Coupe les lignes là où la phrase respire.
- **Sous-titre** : une phrase, 8 à 14 mots, qui dit ce que la personne y gagne.
- **Liste** : 3 à 5 lignes, 4 à 8 mots chacune, toutes construites de la même façon (toutes à l'infinitif, ou
  toutes en nom). Commence chaque ligne par une majuscule, pas de point final.
- **Appel à l'action** : un verbe à l'impératif + ce qu'on obtient (« Réserve ta place », « Télécharge le guide »).
- **Tutoiement ou vouvoiement** : un seul, partout.
- Reprends les mots de la personne. N'ajoute ni promesse de gain, ni chiffre, ni avis qu'elle n'a pas donnés.

Orthographe et typographie françaises, à vérifier mot à mot :
- Les capitales portent leurs accents : FORMATION ACCÉLÉRÉE, DÉBUT, MÉTHODE, À PARTIR DE.
- Espace insécable (`&nbsp;`) avant `: ; ! ? %` et entre un nombre et son unité : `15&nbsp;000&nbsp;FCFA`, `-60&nbsp;%`.
- Milliers séparés par une espace : 15 000, pas 15000 ni 15.000.
- Heures : 9 h 30, 18 h. Dates : 6 janvier 2027, mois en minuscules.
- Guillemets français « » ; apostrophe droite acceptée.
- Abréviations : 1re, 2e, n° ; « offerte » s'accorde.
- Numéros de téléphone groupés par deux, avec l'indicatif : +225 07 00 00 00 01.

## 6. Couleurs

- Trois rôles : **fond** (environ 60 % de la surface), **marque** (30 %), **accent** (10 %). Plus le clair du socle
  et l'encre du texte sur fond clair.
- Sur fond sombre, le texte courant est blanc ; le texte secondaire est blanc à 74 % (`--doux`).
- Sur fond clair, déclare `--texte` foncé et `--doux` gris.
- Le texte posé sur l'accent est foncé (`--encre`) si l'accent est clair (jaune, menthe, pêche), blanc s'il est
  soutenu (rouge, bleu).
- Contraste : 4,2 au moins pour le texte courant, 3 pour les gros titres. Le script le mesure.
- Blanc sur orange vif ou sur vert vif passe rarement : fonce la couleur de deux crans.

## 7. Typographie

- Une police de titre et une police de texte (souvent la même famille en deux graisses). Une manuscrite au plus,
  pour un seul mot.
- Associations éprouvées : Archivo large + Poppins ; Sora + Poppins ; Plus Jakarta Sans seule ; Bricolage Grotesque
  + Plus Jakarta Sans ; Montserrat seule ; Fredoka + Outfit ; Alfa Slab One + Playfair Display.
- Interligne du titre : 0,95 à 1,05. Interligne du texte : 1,25 à 1,3.
- Les capitales larges prennent beaucoup de place : 50 à 66 px suffisent pour un titre de trois lignes.
- Pas de texte justifié, pas de capitales pour une phrase entière de plus de huit mots.

## 8. Le héros

- Il occupe 45 à 60 % de la hauteur. Sa tête est dans le tiers haut ou au centre de l'affiche.
- Il regarde l'objectif ou le texte, jamais le bord.
- Son bas est toujours coupé par quelque chose : le bord, le socle, un bandeau. Jamais de coupe dans le vide.
- Aucun texte sur le visage. Un bloc peut mordre sur une épaule ou le buste.
- Une lueur de la teinte claire du fond derrière la tête le détache.
- Si ses vêtements jurent avec la palette, choisis l'accent dans une couleur de ses vêtements.
- Un produit numérique devient un objet : livre, boîte, téléphone, écran.

## 9. Grille de relecture

Regarde l'aperçu et réponds à ces dix questions. Un « non » se corrige avant de livrer.

1. En une seconde, voit-on de quoi il s'agit ?
2. Y a-t-il une seule chose qui domine ?
3. Lit-on tout sans effort sur un écran de téléphone (image réduite à 400 px de large) ?
4. Chaque texte est-il entièrement visible, sans rien qui le coupe ou le recouvre ?
5. Les blocs sont-ils alignés entre eux, avec des écarts réguliers ?
6. Compte-t-on trois couleurs au plus, hors photo ?
7. Le prix, la date et le contact se trouvent-ils sans chercher ?
8. L'affiche a-t-elle de l'air : un tiers sans texte, rien de collé aux bords ?
9. Reconnaît-on le style de la référence sans retrouver sa mise en page ?
10. Chaque mot est-il juste : orthographe, accents, chiffres, numéros ?

## 10. Défauts fréquents

| Défaut | Correction |
|---|---|
| Tout est gros, rien ne domine | Réduire le texte courant, agrandir le seul titre |
| Affiche pleine à craquer | Retirer un bloc ; raccourcir la liste à quatre lignes |
| Cinq couleurs vives | Revenir à fond, marque, accent |
| Texte blanc sur une zone claire de la photo | Voile sombre derrière, ou déplacer le texte |
| Héros minuscule ou flottant | L'agrandir et l'ancrer en bas, coupé par le socle |
| Décor posé sur le texte | Décor dans les coins et autour du héros seulement |
| Icônes de styles mélangés | Un seul style, un seul support |
| Arrondis de tailles différentes | Une seule valeur de `--rayon`, les pilules entièrement rondes |
| Titre coupé au mauvais endroit | Forcer les retours à la ligne là où la phrase respire |
| Prix moins visible que le reste | Le mettre dans un pavé ou une carte, en gros |
