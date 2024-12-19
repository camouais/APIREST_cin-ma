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
├── /backend
│   ├── /controllers
│   │   ├── cinema.controller.js
│   │   ├── movie.controller.js
│   │   └── schedule.controller.js
│   ├── /services
│   │   ├── cinema.service.js
│   │   ├── movie.service.js
│   │   └── schedule.service.js
│   ├── /data-access
│   │   ├── cinema.repository.js
│   │   ├── movie.repository.js
│   │   └── schedule.repository.js
│   ├── /models
│   │   ├── cinema.model.js
│   │   ├── movie.model.js
│   │   └── schedule.model.js
│   ├── /routes
│   │   ├── cinema.routes.js
│   │   ├── movie.routes.js
│   │   └── schedule.routes.js
│   ├── /config
│   │   ├── database.js
│   │   └── appConfig.js
│   ├── app.js
│   ├── package.json
│   └── README.md
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   │   ├── MovieDetails.js
│   │   │   ├── MoviesByCity.js
│   │   │   ├── MovieForm.js
│   │   │   └── CinemaMap.js
│   │   ├── /pages
│   │   │   ├── Home.js
│   │   │   ├── MoviePage.js
│   │   │   └── AddMovie.js
│   │   ├── /api
│   │   │   ├── moviesApi.js
│   │   │   ├── cinemasApi.js
│   │   │   └── schedulesApi.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── package.json
│   └── public
│       ├── index.html
│       └── styles.css
├── /database
│   ├── init.sql
│   ├── seed.sql
│   └── migrations/
└── README.md
