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

/project-root
|-- /backend
|   |-- /config
|   |   |-- db.config.js       # Database configuration
|   |   |-- server.config.js   # Server-related configuration (e.g., ports)
|   |
|   |-- /models                # Database Models (entities)
|   |   |-- user.model.js      # Example: User model
|   |   |-- product.model.js   # Example: Product model
|   |
|   |-- /repositories          # Data access layer
|   |   |-- user.repository.js # Queries for User
|   |   |-- product.repository.js # Queries for Product
|   |
|   |-- /services              # Business logic
|   |   |-- user.service.js    # Business logic for User
|   |   |-- product.service.js # Business logic for Product
|   |
|   |-- /controllers           # API Endpoints
|   |   |-- user.controller.js # REST routes for User
|   |   |-- product.controller.js # REST routes for Product
|   |
|   |-- /routes                # Route definitions
|   |   |-- api.routes.js      # Combine all routes
|   |
|   |-- server.js              # Entry point for the backend
|
|-- /frontend
|   |-- /public                # Static files (CSS, images, etc.)
|   |   |-- index.html         # Main HTML file
|   |   |-- style.css          # Global CSS
|   |
|   |-- /src                   # Frontend logic
|   |   |-- /components        # Reusable components
|   |   |   |-- Header.js      # Example: Header component
|   |   |   |-- Footer.js      # Example: Footer component
|   |   |
|   |   |-- /pages             # Page views
|   |   |   |-- HomePage.js    # Home Page
|   |   |   |-- AboutPage.js   # About Page
|   |   |
|   |   |-- App.js             # Main app logic
|   |   |-- index.js           # Entry point for React (or other frontend framework)
|
|-- /database
|   |-- init.sql               # SQL script to initialize database (if using relational DB)
|
|-- README.md                  # Documentation
|-- package.json               # Dependencies and scripts for Node.js
