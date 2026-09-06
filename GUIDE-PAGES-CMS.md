# Portfolio administrable avec Pages CMS

Cette version conserve le site GitHub Pages et ajoute une couche de contenu éditable avec Pages CMS.

## Ce que vous pouvez modifier sans HTML

- Profil, photo et textes principaux de l'accueil
- Présentation « À propos »
- Expériences : ajouter, modifier, supprimer, réordonner
- Formations : ajouter, modifier, supprimer, réordonner
- Expertises : ajouter, modifier, supprimer, réordonner
- Engagements : ajouter, modifier, supprimer, réordonner
- Coordonnées principales

## Mise en ligne

1. Gardez une copie ZIP de votre ancien site.
2. Remplacez les fichiers du dépôt GitHub Pages par ceux de ce dossier.
3. Attendez la publication de GitHub Pages et vérifiez toutes les pages.
4. Ouvrez Pages CMS et connectez-vous directement avec GitHub.
5. Autorisez Pages CMS uniquement pour le dépôt du portfolio si GitHub vous propose ce choix.
6. Sélectionnez le dépôt `damigoukombate.github.io` et la branche `main`.
7. Pages CMS détectera `.pages.yml` et affichera les rubriques d'édition.

## Utilisation quotidienne

Dans Pages CMS, choisissez une rubrique, modifiez les champs puis enregistrez. Pages CMS écrit la modification dans votre dépôt GitHub. GitHub Pages republie ensuite le site.

## Sécurité

- Ne communiquez jamais votre mot de passe GitHub.
- Activez l'authentification à deux facteurs sur GitHub.
- Conservez toujours le ZIP de sauvegarde avant une grosse modification.
- Le site contient encore son contenu HTML d'origine comme solution de secours : si le chargement des données échoue, le visiteur voit l'ancienne version au lieu d'une page vide.

## Note technique

Les contenus administrables se trouvent dans `content/*.json`. Le fichier `assets/cms-content.js` les charge dans les pages publiques. `.pages.yml` décrit les champs affichés dans Pages CMS.
