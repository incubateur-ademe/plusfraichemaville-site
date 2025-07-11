# Documentation des scripts récurrents / one shot

## Scripts récurrents

### [connect-sync.ts](connect-sync.ts)

Synchronisation de notre base projets et utilisateurs avec le CRM Connect.  
Lancé par Cron toutes les nuits.

### [hubspot-sync.ts](hubspot-sync.ts)

Synchronisation de notre base projets et utilisateurs avec le CRM Hubspot.  
Lancé par Cron toutes les nuits.

### [csm-mail-batch](csm-mail-batch.ts)

Envoie des mails CSM via Brevo (création de projets, inactivité au bout de 10 jours, etc...).  
Lancé par Cron toutes les nuits.

## Scripts one shot

Ces scripts ont été lancés pour effectuer des traitements ou récupérer des données à un instant t.  
Ils sont conservés au cas où ils auraient à être relancés.

### [fill-climadiag-tables.tsx](fill-climadiag-tables.tsx)

Récupère les fichiers climadiag fournis par Météo France, et remplit la table "climadiag" avec leur données.
Sera à relancer lorsque nous aurons des mise à jour des données climadiag.
Attention : le code postal de Mâcon est faux. Après le lancement du script, il faut le mettre à jour pour mettre 71000 à la place de 71870.

### [update-climadiag-population.tsx](update-climadiag-population.tsx)

Le script précédent ne récupére pas l'attribut "population" des fichiers de Météo France. Or cet attribut est utile pour ordonner la liste des résultats de recherche de collectivités.  
Ce script sert donc à mettre à jour la table "climadiag" avec la donnée "population"

### [fill-lcz-infos.tsx](fill-lcz-infos.tsx)

Ce script vient compléter la table "climadiag" avec les infos LCZ du CEREMA.  
Trois infos sont récupérées pour chacune des collectivités :

- Le taux de couverture LCZ
- la superficie
- la population

Pour chaque collectivité où le taux de couverture est supérieur à 0, on va chercher ses coordonnées géographiques grâce à l'API adresse.
Puis pour chaque EPCI, on va calculer puis stocker une moyenne du taux de couverture, et renseigner les coordonées géographiques de sa collectivité la plus couverte.

### [fill-adresse-all-infos-field.ts](fill-adresse-all-infos-field.ts)

Au lancement de PFMV, on n'enregistrait pas tout le retour de l'API adresse pour les projets et les collectivités.  
Or une partie des données que l'on n'enregistrait pas sont utiles pour localiser les adresses sur une carte.
Ce script sert donc à rappeler l'API adresse pour toutes les collectivités et tous les projets pour remplir le nouveau champ adresse contenant toutes les infos.

### [fill-user-etablissement-field.tsx](fill-user-etablissement-field.tsx)

Remplit le champ nom_etablissement et siren_info de tous les utilisateurs pour la table user.

### [get-matomo-territoire-search.tsx](./analytics/get-matomo-territoire-search.tsx)

Va se connecter à l'API MATOMO pour ressortir toutes les collectivités et les EPCI qui ont été recherchées sur le site dans la page "surchauffe de votre territoire".
Il faut ajuster la date variable "dateFin" à la date du jour.
