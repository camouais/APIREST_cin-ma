// éléments de style pour la page index pour le diaporama

let slideIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
    showSlides();  // Lancer la première diapositive après le chargement complet de la page
});

function showSlides() {
    const slides = document.querySelectorAll('.slideshow-slide');

    if (slides.length === 0) {
        console.error("Aucune diapositive trouvée");
        return;
    }

    // Masquer toutes les diapositives
    slides.forEach(slide => {
        slide.classList.remove('active');  // Retirer la classe active de toutes les diapositives
    });

    // Incrémenter l'index pour passer à la diapositive suivante
    slideIndex = (slideIndex + 1) % slides.length;  // Assure un retour à la première diapositive après la dernière
    const currentSlide = slides[slideIndex];

    // Ajouter la classe active à la diapositive actuelle pour afficher l'effet de fondu
    currentSlide.classList.add('active');

    setTimeout(showSlides, 3000);  // Changer la diapositive toutes les 3 secondes
}


//Fetch films depuis l'API
async function fetchFilms() {
    try {
        const response = await fetch('/api/films');
        const data = await response.json();

        if (data.success) {
            // console.log("données succès")
            var films = data.data;  // Les films récupérés de l'API
            var filmListContainer;

            if (document.querySelector('.film-list') !== null) {
                filmListContainer = document.querySelector('.film-list'); // La section pour afficher les films
            } else {
                filmListContainer = document.querySelector('.filmF-list'); // La section pour afficher les films
                films = data.data.slice(0, 5);  // Limite les films aux 5 premiers éléments
            }
            filmListContainer.innerHTML = '';  // Vide la liste avant d'ajouter les nouveaux films

            films.forEach(film => {
                // Créez une nouvelle carte de film pour chaque film
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                // Ajoutez les informations de chaque film à la carte
                filmCard.innerHTML = `
                    <img src="img/imagesindex/${film.Titre}.jpg" alt="${film.Titre}">
                    <div class="film-info">
                        <h3>${film.Titre}</h3>

                        <p>Année: ${film.Annee}</p> <!-- Année -->
                    </div>
                `;

                
                // Ajoutez la carte de film au conteneur de films
                filmListContainer.appendChild(filmCard);
            });
        } else {
            console.error('Failed to fetch films:', data.message);
        }
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}

// Chargez les films dès que la page se charge
window.onload = fetchFilms;


async function fetchMyFilms() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/films/mine', {
            headers: {
                'authorization': token
            }
        });

        const data = await response.json();

        if (data.success) {
            const films = data.data;
            const tableHead = document.getElementById('filmTableHead');
            const tableBody = document.getElementById('filmTableBody');
            tableHead.innerHTML = `<tr>
                <th>Titre</th>
                <th>Année</th>
                <th>Réalisateur
                </th><th>Durée</th>
                <th>Langue</th>
                <th>Sous-titres</th>
                <th>Age requis</th>
                <th>Action</th>
                </tr>`;
            tableBody.innerHTML = '';

            films.forEach(film => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${film.Titre}</td>
                    <td>${film.Annee}</td>
                    <td>${film.Nom_Realisateur}</td>
                    <td>${film.Duree}</td>
                    <td>${film.Langue}</td>
                    <td>${film.Sous_titres}</td>
                    <td>${film.Age_minimum}</td>
                    <td><button class="btn btn-danger" onclick="deleteFilm(${film.ID_film})">Supprimer</button></td>
                    <td></td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch films:', data.message);
        }
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}
async function deleteFilm(id) {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    try {
        const response = await fetch(`/api/films/mine/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert('Film supprimé avec succès');
            fetchMyFilms();
        } else {
            console.log('Erreur lors de la suppression:', response);
            alert('Erreur lors de la suppression du film : ' + (data.message || 'Aucun message détaillé'));
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du film:', error);
        alert('Erreur interne du serveur');
    }
}
async function createFilm() {
    const data = new FormData(document.getElementById('filmForm'));
    const selectData = {
        Titre: data.get('Titre'),
        Annee: data.get('Annee'),
        Nom_Realisateur: data.get('Nom_Realisateur'),
        Duree: data.get('Duree'),
        Langue: data.get('Langue'),
        Sous_titres: data.get('Sous-titres'),
        Age_minimum: data.get('Age-minimum')
    };
    fetch('/api/filmcreate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(selectData)
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Film created successfully');
                document.getElementById('filmForm').reset(); // Réinitialise le formulaire
                fetchFilms();
            } else {
                console.error('Failed to create film:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function fetchFilmsByArrondissement() {
    const arrondissement = document.getElementById('arrondissementInput').value;

    if (!arrondissement) {
        alert('Veuillez entrer un arrondissement.');
        return;
    }

    try {
        const response = await fetch(`/api/filmsByArrondissement?arrondissement=${encodeURIComponent(arrondissement)}`);
        const data = await response.json();

        if (data.success) {
            const films = data.data;
            const filmListContainer = document.querySelector('.film-arrondissement'); // La section pour afficher les films
            filmListContainer.innerHTML = '';  // Vide la liste avant d'ajouter les nouveaux films

            films.forEach(film => {
                // Créez une nouvelle carte de film pour chaque film
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                // Ajoutez les informations de chaque film à la carte
                filmCard.innerHTML = `
                    <div class="film-info">
                         <img src="img/imagesindex/${film.Titre}.jpg" alt="${film.Titre}">
                        <h3>${film.Titre}</h3>
                        <p>Cinéma : ${film.Nom_cinema}</p>
                        <p>Jours de projection : ${film.Jours_semaine}</p>
                    </div>
                    
                    <div class="film-info-hover hidden">
                        <h3>${film.Titre}</h3>
                        <p>Année : ${film.Annee}</p>
                        <p>Réalisateur : ${film.Nom_Realisateur}</p>
                        <p>Durée : ${film.Duree}</p>
                        <p>Langue : ${film.Langue}</p>
                        <p>Sous-titres : ${film.Sous_titres}</p>
                        <p>Age Minimum : ${film.Age_minimum}</p>
                        <h3>Projection</h3>
                        <p>Cinéma : ${film.Nom_cinema}</p>
                        <p>Adresse : ${film.Adresse}</p>
                        <p>Jours de projection : ${film.Jours_semaine}</p>
                        <p>Heure : ${film.Heure_debut}</p>
                    </div>
                `;

                filmCard.addEventListener('mouseover', () => {
                    filmCard.querySelector('.film-info').classList.add('hidden');
                    filmCard.querySelector('.film-info-hover').classList.remove('hidden');
                });

                filmCard.addEventListener('mouseout', () => {
                    filmCard.querySelector('.film-info').classList.remove('hidden');
                    filmCard.querySelector('.film-info-hover').classList.add('hidden');
                });

                // Ajoutez la carte de film au conteneur de films
                filmListContainer.appendChild(filmCard);
            });

        } else {
            console.error('Failed to fetch films:', data.message);
        }
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}


async function fetchMyProgrammations() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/programmations/mine', {
            headers: {
                'authorization': token
            }
        });

        const data = await response.json();

        if (data.success) {
            const programmations = data.data;
            const tableHead = document.getElementById('programmationTableHead');
            const tableBody = document.getElementById('programmationTableBody');

            tableHead.innerHTML = `<tr>
                <th>ID Projection</th>
                <th>ID Film</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Jours de Semaine</th>
                <th>Heure Début</th>
            </tr>`;
            tableBody.innerHTML = '';

            programmations.forEach(programmation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${programmation.ID_projection}</td>
                    <td>${programmation.ID_film}</td>
                    <td>${programmation.Date_debut}</td>
                    <td>${programmation.Date_fin}</td>
                    <td>${programmation.Jours_semaine}</td>
                    <td>${programmation.Heure_debut}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch programmations:', data.message);
        }
    } catch (error) {
        console.error('Error fetching programmations:', error);
    }
}


async function createProgrammation() {
    const data = new FormData(document.getElementById('ProgrammationForm'));
    const programmationData = {
        ID_film: data.get('ID_film'),
        Date_debut: data.get('Date_debut'),
        Date_fin: data.get('Date_fin'),
        Jours_semaine: data.get('Jours_semaine'),
        Heure_debut: data.get('Heure_debut'),
        ID_cinema: data.get('ID_cinema')
    };

    try {
        const response = await fetch('/api/programmationcreate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') // Si nécessaire
            },
            body: JSON.stringify(programmationData)
        });

        const result = await response.json();
        if (result.success) {
            alert('Programmation created successfully');
            document.getElementById('ProgrammationForm').reset();
            fetchProgrammation(); // Rafraîchir la liste
        } else {
            console.error('Failed to create programmation:', result.message);
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//Fonctions pour se connecter à la session utilisateur
async function loginUser(email, password) {
    const loginData = { email, password };

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();

        if (data.success) {
            //Si la connexion est réussie, on récupère le token d'autorisation
            localStorage.setItem('token', data.token);
            // console.log('Token:', data.token);


            //Puis on redirige l'utilisateur vers la page de films
            alert('Connexion réussie !');
            window.location.href = 'PageUtilisateur.html'; //Rediriger vers une page de films
        } else {
            alert('Erreur: ' + data.message);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur interne du serveur');
    }
}

//Gestionnaire d'événements pour le bouton de connexion
document.getElementById('loginBtn').addEventListener('click', () => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vérification basique avant d'envoyer la requête
    if (email && password) {
        loginUser(email, password);
    } else {
        alert('Veuillez remplir tous les champs');
    }
});





//page des prioritaires pour les pop up 

// Fonction pour ouvrir la popup "Créer Film"
function openPopupCreerFilm() {
    document.getElementById("popup_creerFilm").classList.remove("hidden");
}

// Fonction pour ouvrir la popup "Créer Programmation"
function openPopupCreerProgrammation() {
    document.getElementById("popup_creerProgrammation").classList.remove("hidden");
}

// Fonction pour fermer une popup spécifique
function closePopup(popupId) {
    document.getElementById(popupId).classList.add("hidden");
}


//fonction pour page de contact
function handleSubmit(event) {
    event.preventDefault(); //empeche traitement par defaut du form

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    //Pour recup les datas du formulaire
    console.log('Form data:', formData);
    //Popup
    alert('Votre message a bien été envoyé!');

    //Redirection
    window.location.href = 'index.html';
}

async function fetchActeurByFilm() {
    const movie = document.getElementById('FilmInput').value;

    if (!movie) {
        alert('Veuillez entrer un film.');
        return;
    }

    try {
        const response = await fetch(`/api/acteurByFilm?movie=${encodeURIComponent(movie)}`);
        const data = await response.json();

        if (data.success) {
            const acteurs = data.data;
            const tableHead = document.getElementById('ActeurbyFilmTableHead');
            const tableBody = document.getElementById('ActeurbyFilmTableBody');
            tableHead.innerHTML = `<tr><th>Nom</th><th>Prénom</th><th>Role</th></tr>`;
            tableBody.innerHTML = '';

            acteurs.forEach(acteur => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${acteur.Nom_Acteur}</td>
                    <td>${acteur.Prenom}</td>
                    <td>${acteur.Roles}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch acteurs:', data.message);
        }
    } catch (error) {
        console.error('Error fetching acteurs:', error);
    }
}