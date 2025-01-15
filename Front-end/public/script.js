
//Fetch films depuis l'API
async function fetchFilms() {
    try {
        const response = await fetch('/api/films');
        const data = await response.json();

        if (data.success) {
            // console.log("données succès")
            const films = data.data;  // Les films récupérés de l'API
            const filmListContainer = document.querySelector('.film-list'); // La section pour afficher les films
            filmListContainer.innerHTML = '';  // Vide la liste avant d'ajouter les nouveaux films

            films.forEach(film => {
                // Créez une nouvelle carte de film pour chaque film
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                // Ajoutez les informations de chaque film à la carte
                filmCard.innerHTML = `
                    <img src="https://via.placeholder.com/250x350" alt="${film.Titre}">
                    <div class="film-info">
                        <h3>${film.Titre}</h3>
                        <p>Genre: ${film.Genre || 'Inconnu'}</p> <!-- Genre, si défini -->
                        <p>Durée: ${film.Duree} min</p> <!-- Durée -->
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

async function fetchFilmsByCity() {
    try {
        // console.log("ici fetchfilmsbycity---1");
        const response = await fetch('/api/filmsCity'); // Call the API
        // console.log("ici fetchfilmsbycity----2");
        const data = await response.json(); 

        if (data.success) {
            const films = data.data;
            const tableHead = document.getElementById('FilmbyCityTableHead');
            const tableBody = document.getElementById('FilmbyCityTableBody');
            tableHead.innerHTML = `<tr><th>Titre</th><th>Année</th><th>Réalisateur</th><th>Durée</th>
            <th>Langue</th><th>Sous-titres</th><th>Age requise</th></tr>`;
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
                `;
                tableBody.appendChild(row);
            });
            // console.log(films)
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
                <th>Ville</th>
                <th>ID Cinéma</th>
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
                    <td>${programmation.ID_cinema}</td>
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
        alert('Une erreur s\'est produite lors de la création de la programmation.');
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


// éléments de style pour la page d'accueil pour le diaporama 

let slideIndex = Math.floor(Math.random() * document.querySelectorAll('.slideshow-slide').length);
showSlides();

function showSlides() {
    console.log('Affichage de la diapositive', slideIndex); // Debugging
    const slides = document.querySelectorAll('.slideshow-slide');
    slides.forEach(slide => slide.style.display = 'none');
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000);
}


function changeSlide(n) {
    const slides = document.querySelectorAll('.slideshow-slide');
    slideIndex += n; // Modifier l'index en fonction de la direction
    if (slideIndex > slides.length) slideIndex = 1; // Boucle au début
    if (slideIndex < 1) slideIndex = slides.length; // Boucle à la fin

    slides.forEach(slide => slide.style.display = 'none'); // Masquer toutes les diapositives
    slides[slideIndex - 1].style.display = 'block'; // Afficher la nouvelle diapositive
}



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

// pour choisir l'année du film
const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
        document.write(`<option value="${year}">${year}</option>`);
    }