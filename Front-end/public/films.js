// Fetch films from the API and populate the table
async function fetchFilms() {
    try {
        const response = await fetch('/api/films'); // Call the API
        const data = await response.json(); // Parse JSON response

        if (data.success) {
            const films = data.data; // Extract the film data
            const tableHead = document.getElementById('filmTableHead');
            const tableBody = document.getElementById('filmTableBody');
            tableHead.innerHTML = `<tr><th>Titre</th><th>Année</th><th>Réalisateur</th></tr>`;
            tableBody.innerHTML = ``; // Clear existing content

            // Dynamically create table rows to display each film
            films.forEach(film => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${film.Titre}</td>
                    <td>${film.Annee}</td>
                    <td>${film.Nom_Realisateur}</td>`;
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
        Nom_Realisateur: data.get('Nom_Realisateur')
    };
    fetch('/api/filmcreate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Film created successfully');
                window.location.href = 'films.html';
            } else {
                console.error('Failed to create film:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}