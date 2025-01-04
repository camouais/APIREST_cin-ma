# APIREST_cinema

Dans ce projet, vous devez proposer une application Web qui fournit les services REST ci-dessous. Ils
concernent les projections et la programmation de films dans les différentes salles de cinéma
parisiennes. Pour avoir une meilleure idée de ce que nous attendons de vous en tant que projet,
veuillez visiter le site Web d'AlloCiné.

1. Le premier service est fourni aux salles de cinéma afin qu'elles puissent publier les nouveaux
films et leur programmation. Pour cela, vous devez proposer une page Web aux propriétaires
de films, avec un identifiant afin qu'ils puissent publier les détails du film : Titre, durée,
Langue (sous-titres si nécessaire), réalisateur, acteurs principaux et âge minimum requis. Pour
simplifier, nous supposons qu'un film est proposé d'une date de début à une date de fin, trois
jours par semaine (et une heure de début donnée pour chaque séance de cinéma). Bien
entendu, vous devez spécifier la ville où le film est projeté (l'adresse de la salle de cinéma)

2. Un deuxième service sera utilisé pour afficher tous les films proposés dans une ville donnée.
Cela se fera via une page web en accès libre, aucune connexion n'est requise

3. Chaque film proposé en réponse au service web affichant la liste des films par ville donnée
est en fait un service web qui affiche les détails des films (donnés dans la question 1)

--------------------------------------
Exemple de structure de fichiers :

/cinema-app  
├── /Back-end  
│   ├── /Config  
│   │   ├── db.config.js  
│   │   └── jwtconfig.js  
│   ├── /Controller  
│   │   ├── authController.js  
│   │   ├── filmController.js  
│   │   └── projectionController.js  
│   ├── /Middleware
│   ├── /Models  (Contient la structure des données de la base de données)
│   ├── index.js  (Fichier principal du backend, contient les routes)
├── /frontend  (a voir)
└── README.md

--------------------------------------

## Dépendances

### Node.js

Pour installer les dépendances du projet, vous devez juste executer `npm install`.  
Pour rappel, dans les projets Node.js, les dépendances sont listées dans le fichier `package.json` (et `package-lock.json`).

Les dépendances n'ont pas vocations à se retrouver dans le dépôt Git.  
J'ai rajouté un `.gitignore` pour ignorer le dossier `node_modules`.

### Base de données

Pour ce projet, nous vous devez avoir une base de données SQL.  
Vous pouvez configurer la connexion à la base de données dans le fichier `db.config.js` dans le dossier `Back-end/Config`. 
Initialisez la base de données avec le fichier `init.sql` dans le dossier `Back-end/Database`.

--------------------------------------

## Lancer le projet

Pour lancer le Backend, vous devez simplement exécuter `node .\Back-end\index.js` et d'avoir la base de données de lancée.