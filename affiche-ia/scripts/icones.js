#!/usr/bin/env node
/* AFFICHE IA — chercher une icône, une marque ou un objet 3D.

   node icones.js téléphone            → propose des noms à mettre dans data-ic et des fichiers assets/3d
   node icones.js whatsapp argent      → plusieurs mots à la fois

   Pictogrammes (Phosphor) : noms en anglais ; le script traduit les mots français courants.
   Marques : data-ic="m:nom" (ajouter :couleur pour la couleur officielle).
   Objets 3D : <img class="deco3d" src="{{KIT}}/3d/nom.png">, noms et mots-clés en français. */
const fs = require('fs'), path = require('path');
const KIT = path.join(__dirname, '..', 'assets');
const lire = f => JSON.parse(fs.readFileSync(path.join(KIT, f), 'utf8'));
const sansAccent = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const FR = {
  telephone: 'phone device-mobile', appel: 'phone', mobile: 'device-mobile', adresse: 'map-pin', lieu: 'map-pin', localisation: 'map-pin', carte: 'map credit-card', email: 'envelope', mail: 'envelope', courrier: 'envelope',
  date: 'calendar', calendrier: 'calendar', heure: 'clock', horloge: 'clock', temps: 'clock timer hourglass', argent: 'money currency coins wallet', prix: 'tag currency', paiement: 'credit-card wallet', banque: 'bank',
  cadeau: 'gift', bonus: 'gift', etoile: 'star', avis: 'star smiley', coche: 'check', valide: 'check seal-check', fleche: 'arrow caret', telecharger: 'download', telechargement: 'download', securite: 'shield lock', securise: 'shield lock', cadenas: 'lock',
  personne: 'user', utilisateur: 'user', groupe: 'users', equipe: 'users', livre: 'book', guide: 'book', diplome: 'graduation-cap certificate', certificat: 'certificate', formation: 'graduation-cap chalkboard', cours: 'chalkboard book',
  video: 'video film play', film: 'film', camera: 'camera', photo: 'camera image', micro: 'microphone', musique: 'music', son: 'speaker', panier: 'shopping-cart', boutique: 'storefront', magasin: 'storefront', achat: 'shopping',
  site: 'globe', web: 'globe', internet: 'globe wifi', lien: 'link', recherche: 'magnifying-glass', loupe: 'magnifying-glass', coeur: 'heart', feu: 'fire', eclair: 'lightning', rapide: 'lightning timer', fusee: 'rocket', cible: 'target crosshair', objectif: 'target',
  trophee: 'trophy', couronne: 'crown', megaphone: 'megaphone', annonce: 'megaphone', cloche: 'bell', notification: 'bell', message: 'chat', discussion: 'chat', robot: 'robot', ia: 'robot sparkle brain', ordinateur: 'laptop desktop', maison: 'house',
  voiture: 'car', avion: 'airplane', voyage: 'airplane suitcase', camion: 'truck', livraison: 'truck package', colis: 'package', outils: 'wrench hammer', reglages: 'gear', sante: 'heartbeat first-aid', medecin: 'stethoscope', eglise: 'church', croix: 'cross',
  croissance: 'chart-line-up trend-up', statistiques: 'chart', idee: 'lightbulb', cle: 'key', document: 'file', fichier: 'file', dossier: 'folder', imprimante: 'printer', ecrire: 'pencil pen', stylo: 'pen', restaurant: 'fork-knife', cuisine: 'cooking-pot',
  gateau: 'cake cookie', patisserie: 'cake cookie', anniversaire: 'cake confetti balloon', fete: 'confetti balloon', cafe: 'coffee', pain: 'bread', boisson: 'coffee wine beer', chef: 'chef-hat', coiffure: 'scissors', couture: 'needle scissors', mode: 't-shirt dress', immobilier: 'house building', ecole: 'student chalkboard', priere: 'hands-praying', bible: 'book-open', concert: 'microphone-stage music', danse: 'music', bebe: 'baby', enfant: 'baby', fleur: 'flower', plante: 'plant leaf', soleil: 'sun', eau: 'drop', electricite: 'lightning plug', batiment: 'building', usine: 'factory', moto: 'moped motorcycle', taxi: 'taxi car', bus: 'bus', train: 'train', bateau: 'boat', valise: 'suitcase', hotel: 'bed', lit: 'bed', nettoyage: 'broom', menage: 'broom', jardin: 'plant tree', arbre: 'tree', animal: 'paw-print', chien: 'dog', chat: 'cat chat', poisson: 'fish', viande: 'bone', legume: 'carrot', fruit: 'orange cherries',
  beaute: 'sparkle', sport: 'barbell soccer', main: 'hand', pouce: 'thumbs-up', oeil: 'eye', billet: 'ticket money', ticket: 'ticket', play: 'play', lecture: 'play', pause: 'pause', plus: 'plus', moins: 'minus', fermer: 'x', menu: 'list', info: 'info', question: 'question', attention: 'warning',
};
const mots = process.argv.slice(2).map(sansAccent);
if (!mots.length) { console.log('Usage : node icones.js <mot> [mot…]   (ex. : node icones.js téléphone argent whatsapp)'); process.exit(2); }
const P = Object.keys(lire('icones/phosphor-fill.json')), M = lire('icones/marques.json'), T = lire('3d/catalogue.json').icones;
for (const m of mots) {
  const cles = [m, ...(FR[m] || '').split(' ').filter(Boolean)];
  const pic = [...new Set(cles.flatMap(c => P.filter(n => n.includes(c))))].sort((a, b) => a.length - b.length).slice(0, 36);
  const mar = Object.keys(M).filter(s => s.includes(m) || sansAccent(M[s].titre).includes(m));
  const tro = T.filter(i => sansAccent(i.nom).includes(m) || i.mots.some(k => sansAccent(k).includes(m))).map(i => i.nom);
  console.log(`\n« ${m} »`);
  console.log('  pictogrammes  data-ic="…"        : ' + (pic.join(', ') || '—'));
  console.log('  marques       data-ic="m:…"      : ' + (mar.join(', ') || '—'));
  console.log('  objets 3D     {{KIT}}/3d/….png   : ' + (tro.join(', ') || '—'));
}
