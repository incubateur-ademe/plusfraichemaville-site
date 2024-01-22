# Plus fraîche ma ville - Site web

Le but de la startup d'état Plus fraîche ma ville est d'accompagner les collectivités dans le choix de solutions de rafraîchissement urbain pérennes et durables.

Ce repository concerne la V2 du site web http://plusfraichemaville.fr.

La partie Front et Back de ce site est implémenté en NextJS (App router).
Elle fait également appel au CMS Strapi, dont le repository est ici : https://github.com/incubateur-ademe/plusfraichemaville-cms

Pour la partie contenu du site, nous avons autant que possible utilisé des Server Components.

## Variable d'environnement

Vous pouvez trouver un fichier d'exemple des variables d'environnement à configurer [ici.](./.env.dist)
Vous pouvez copier ce fichier à la racine du projet et le renommer en .env.local pour qu'il soit pris en compte.

## Utilisation du CMS

Toute la partie "contenu" du site est récupéré à partir du [CMS Strapi](https://github.com/incubateur-ademe/plusfraichemaville-cms).
Avant de démarrer le serveur en local, assurez vous que les variables d'environnement liées à Strapi sont bien configurées.

## Démarrage du serveur en local

Afin de démmarer le serveur en local en mode développement, vous pouvez lancer la commande

```shell
npm run develop
```

Pour lancer le serveur en local en simulant l'environnement de production, utiliser la commande suivante :

```shell
npm run localAsProd
```
