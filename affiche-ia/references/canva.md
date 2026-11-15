# Canva : générer ou rendre modifiable

À lire seulement si le connecteur Canva est connecté (outils `mcp__Canva__…`) **et** que la personne veut un design
dans son compte Canva : pour le retoucher elle-même, ou pour que Canva génère l'affiche.

Tout ce qui suit a été essayé sur une vraie affiche. Les limites sont celles constatées, pas des suppositions.

## Avant de commencer

- **Réseau.** L'envoi d'un fichier passe par `www.canva.com`, le téléchargement d'un export par
  `export-download.canva.com`. Si une requête est refusée par le proxy (erreur 403 sur CONNECT), demander l'ajout de
  l'hôte exact à l'environnement, puis recommencer.
- **Chaque essai crée un nouveau design** dans le compte de la personne, et chaque envoi une image dans ses
  importations. Rien ne se supprime par le connecteur : à la fin, dire quels designs sont des brouillons à supprimer.
- **Générer** peut consommer le quota d'IA de son compte Canva : l'annoncer.
- Ne jamais modifier ni réorganiser ses designs existants sans qu'elle l'ait demandé.

## Route 1 — Canva génère l'affiche

Quand il n'y a pas de style de référence à suivre de près, ou quand la personne veut surtout un design modifiable.

1. `create-design` avec un `brief` qui contient : le type et le format (« affiche verticale 4:5, 1080 × 1350 px »),
   le thème et les couleurs (l'ADN de style en deux phrases), et **chaque texte exact entre guillemets**. Ne pas
   donner `format` : le dire dans le brief.
2. Attendre, puis `get-create-design-async-job` jusqu'à `completed` (respecter `wait_seconds`).
3. `read-design` (champ `design_content`) : vérifier chaque texte, mot à mot.
4. `get-export-formats`, `export-design` en PNG (`width` 1080), télécharger, **regarder l'image**.
5. Livrer le lien du design et l'image.

Constaté :
- rendu soigné, textes exacts et tous modifiables, illustration générée de belle facture ;
- la mise en page est celle de Canva (centrée, façon modèle) : on ne lui fait pas suivre une affiche de référence ;
- l'illustration contient des mots inventés (« CINÉMA », « ENTRÉE », faux numéros) : les signaler ;
- aucun contrôle automatique : la relecture à l'œil est la seule garantie.

## Route 2 — Rendre modifiable l'affiche du kit

Quand l'affiche a été fabriquée avec le kit et que la personne veut pouvoir en changer les textes dans Canva.

1. `create-upload-url`, puis envoyer le PNG en un seul POST :
   `curl -X POST -H "Content-Type: application/octet-stream" --data-binary @affiche.png "<uploadUrl>"`.
   La réponse donne un `mediaId`. Une URL ne sert qu'une fois.
2. `separate-image-layers` avec ce `mediaId` et un titre ; attendre ; `get-separate-image-layers-job`.
3. Exporter le design obtenu en PNG, le télécharger et **le comparer à l'original**, zone par zone.
4. Livrer le lien, en disant précisément ce qui est abîmé.

Constaté :
- tous les textes sont reconnus et deviennent modifiables ; la mise en page et les images sont conservées ;
- les textes droits de taille courante ressortent propres (en-tête, sous-titre, pastilles, bouton, lien) ;
- les polices sont remplacées par des polices proches, et les effets de lettre (relief, dégradé) sont perdus ;
- **les textes penchés** ressortent en double (l'ancien reste visible sous le nouveau) ;
- **les très gros chiffres en capitales larges** (prix en Archivo large) gardent un fantôme, même droits.

Donc, pour cette route, rendre d'abord une variante « Canva » de l'affiche : aucun bloc de texte penché (`--rot:0deg`),
prix et pourcentages dans la police de texte plutôt qu'en capitales larges. Et prévenir : le résultat est une base à
retoucher, pas une copie parfaite.

## Autres outils utiles

- `remove-background` : détourer une photo déjà envoyée dans Canva (alternative à `scripts/detourer.py`).
- `resize-design` : décliner un design dans un autre format (crée un nouveau design).
- `edit-design` : corriger un texte, déplacer un élément, ajouter une forme ou une image, dans une transaction
  ouverte par `read-design` (`open_transaction: true`). Montrer l'aperçu et obtenir l'accord de la personne avant
  d'enregistrer (`finalize: "commit"`). On ne peut pas y choisir la police d'un texte.
- `list-brand-kits` : si la personne a un kit de marque dans Canva.

## Que conseiller

| La personne veut… | Route |
|---|---|
| suivre de près le style d'une affiche de référence, un rendu contrôlé | le kit (image), sans Canva |
| une affiche vite faite qu'elle retouchera dans Canva | Route 1 |
| l'affiche du kit **et** pouvoir changer un prix plus tard | le kit ; pour une correction, revenir vers le skill (une minute) ; Route 2 seulement si elle y tient |
