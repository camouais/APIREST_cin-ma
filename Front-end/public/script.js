
//Fetch films depuis l'API
async function fetchFilms() {
    try {
        const response = await fetch('/api/films');
        const data = await response.json();

        if (data.success) {
            console.log("données succès")
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
            console.log('Token:', data.token);


            //Puis on redirige l'utilisateur vers la page de films
            alert('Connexion réussie !');
            window.location.href = 'Creerfilm.html'; //Rediriger vers une page de films
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

//Script.js

var cta = document.querySelector(".cta");
var check = 0;

cta.addEventListener('click', function(e) {
    var text = e.target.nextElementSibling;
    var loginText = e.target.parentElement;

    //Afficher/Masquer la zone de connexion
    text.classList.toggle('show-hide');
    loginText.classList.toggle('expand');
    
    // Modifie l'icône de la flèche
    if (check == 0) {
        cta.classList.add('open');  // Pivote la flèche
        check++;
    } else {
        cta.classList.remove('open');
        check = 0;
    }
});
