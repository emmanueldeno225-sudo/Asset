# Affiche IA

Un skill pour Claude qui fabrique des affiches publicitaires professionnelles à partir d'une affiche de référence.

On lui envoie une affiche dont on aime le style, il pose quelques questions sur l'offre, puis il livre une affiche
nouvelle, dans le même esprit, en image haute définition et au texte exact.

## Ce que contient ce dépôt

| Dossier | Contenu |
|---|---|
| `affiche-ia/` | Le skill complet. C'est ce dossier qu'on installe. |
| `affiche-ia/references/affiche-ia.md` | **Le catalogue « affiche IA »** : tous les éléments extraits des affiches de référence (fonds, titres, panneaux, pilules, puces, prix, pieds de page, décors…). |
| `affiche-ia/references/analyses.md` | La fiche d'analyse de chacune des 19 affiches. |
| `affiche-ia/references/planches/` | Le rendu de chaque composant du kit. |
| `affiche-ia/references/exemples/` | L'aperçu des 8 affiches modèles. |
| `demos/` | Affiches d'essai fabriquées avec le skill. |

## Installer le skill

Ouvrir le fichier `affiche-ia.skill` reçu dans la conversation avec Claude et utiliser le bouton qui enregistre le
skill. Pour refaire ce fichier depuis le dossier : zipper `affiche-ia/` (sans le sous-dossier `evals/`) et renommer
l'archive en `affiche-ia.skill`.

## S'en servir

Envoyer une affiche de référence et écrire, par exemple : « Je veux une affiche dans ce style pour ma formation ».
Le skill demande ensuite le nom de l'offre, le contenu, le prix, la date, les contacts, le logo et la photo.

Pour ajouter une affiche au catalogue : l'envoyer et écrire « ajoute cette affiche au catalogue affiche IA ».
