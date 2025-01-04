-- remplacer rem commentaires sous Oracle par --


-- Création de la base de données 'REST_API'
DROP DATABASE IF EXISTS REST_API;
CREATE DATABASE REST_API;
USE REST_API;


-- Structure de la table 'Artiste'


CREATE TABLE Artiste (
   Nom varchar(20) NOT NULL,
   Prenom varchar(15),
   Annee_naissance decimal(4,0),
   PRIMARY KEY (Nom)
);


-- Contenu de la table 'Artiste'


INSERT INTO Artiste VALUES( 'Allen', 'Woody', '1938');
INSERT INTO Artiste VALUES( 'Lynch', 'David', '1946');
INSERT INTO Artiste VALUES( 'Kusturica', 'Emir', '1959');
INSERT INTO Artiste VALUES( 'Lang', 'Fritz', '1899');
INSERT INTO Artiste VALUES( 'Eastwood', 'Clint', '1932');
INSERT INTO Artiste VALUES( 'Hitchcock', 'Alfred', '1898');
INSERT INTO Artiste VALUES( 'Kubrick', 'Stanley', '1935');
INSERT INTO Artiste VALUES( 'Curtis', 'Michael', '1902');
INSERT INTO Artiste VALUES( 'Stewart', 'James', '1911');
INSERT INTO Artiste VALUES( 'Novak', 'Kim', NULL);
INSERT INTO Artiste VALUES( 'Hunt', 'Greg', '1950');
INSERT INTO Artiste VALUES( 'Tarantino', 'Quentin', '1948');
INSERT INTO Artiste VALUES( 'Willis', 'Bruce', '1952');
INSERT INTO Artiste VALUES( 'Spielberg', 'Steven', '1943');
INSERT INTO Artiste VALUES( 'Hudson', 'Hugh', NULL);
INSERT INTO Artiste VALUES( 'Gillian', 'Terry', '1944');
INSERT INTO Artiste VALUES( 'Truffaut', 'Francois', '1938');
INSERT INTO Artiste VALUES( 'Lambert', 'Christophe', '1953');
INSERT INTO Artiste VALUES( 'Keitel', 'Harvey', '1940');
INSERT INTO Artiste VALUES( 'Woo', 'John', '1951');
INSERT INTO Artiste VALUES( 'Travolta', 'John', '1953');
INSERT INTO Artiste VALUES( 'Cage', 'Nicolas', '1954');
INSERT INTO Artiste VALUES( 'DiCaprio', 'Leonardo', '1973');
INSERT INTO Artiste VALUES( 'Cameron', 'James', '1943');
INSERT INTO Artiste VALUES( 'Cruise', 'Tom', '1960');
INSERT INTO Artiste VALUES( 'De Palma', 'Brian', '1953');
INSERT INTO Artiste VALUES( 'Depp', 'Johnny', '1967');
INSERT INTO Artiste VALUES( 'Ricci', 'Christina', '1974');
INSERT INTO Artiste VALUES( 'Burton', 'Tim', '1958');

-- --------------------------------------------------------

-- Structure de la table 'Cinema'


CREATE TABLE Cinema (
   ID_Cinema INT AUTO_INCREMENT PRIMARY KEY,
   Nom_cinema varchar(10) NOT NULL,
   Arrondissement decimal(2,0),
   Adresse varchar(30)
);


-- Contenu de la table 'Cinema'


INSERT INTO Cinema VALUES( '1', 'Rex', '2', '22 Bd Poissoniere');
INSERT INTO Cinema VALUES( '2', 'Kino', '15', '3 Bd Raspail');
INSERT INTO Cinema VALUES( '3', 'Nations', '12', '3 Rue de Reuilly');
INSERT INTO Cinema VALUES( '4', 'Halles', '1', 'Forum des Halles');

-- Structure de la table 'Film'


CREATE TABLE Film (
    ID_film INT AUTO_INCREMENT PRIMARY KEY,          
    Titre VARCHAR(255) NOT NULL,                       
    Annee DECIMAL(4, 0),                             
    Nom_Realisateur VARCHAR(255),                     
    Duree DECIMAL(5, 2) NOT NULL,                    
    Langue VARCHAR(50) NOT NULL,                     
    Sous_titres VARCHAR(50),                        
    Age_minimum INT NOT NULL
);



-- Contenu de la table 'Film'


INSERT INTO Film (Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum)
VALUES
('Annie Hall', 1977, 'Woody Allen', 93.00, 'Anglais', 'Aucun sous-titre', 13),
('Brazil', 1984, 'Terry Gilliam', 142.00, 'Anglais', 'Aucun sous-titre', 16),
('Underground', 1995, 'Emir Kusturica', 127.00, 'Serbe', 'Sous-titres en anglais', 18),
('Metropolis', 1926, 'Fritz Lang', 153.00, 'Allemand', 'Sous-titres en français', 12);

-- Structure de la table 'Role'


CREATE TABLE Role (
   Nom_Role varchar(20) NOT NULL,
   ID_film decimal(10,0) DEFAULT '0' NOT NULL,
   Nom_acteur varchar(20) NOT NULL,
   PRIMARY KEY (ID_film, Nom_acteur)
);


-- Contenu de la table 'Role'


INSERT INTO Role VALUES( 'Bernard', '32', 'Truffaut');
INSERT INTO Role VALUES( 'Davis', '43', 'Allen');
INSERT INTO Role VALUES( 'Tarzan', '85', 'Lambert');
INSERT INTO Role VALUES( 'Ferguson', '65', 'Stewart');
INSERT INTO Role VALUES( 'Elster', '65', 'Novak');
INSERT INTO Role VALUES( 'Jonas', '10', 'Allen');
INSERT INTO Role VALUES( 'McLane', '33', 'Willis');
INSERT INTO Role VALUES( 'McLane', '34', 'Willis');
INSERT INTO Role VALUES( 'McLane', '35', 'Willis');
INSERT INTO Role VALUES( 'Mr Brown', '1', 'Tarantino');
INSERT INTO Role VALUES( 'Munny', '45', 'Eastwood');
INSERT INTO Role VALUES( 'Mr White', '1', 'Keitel');
INSERT INTO Role VALUES( 'Wolf', '73', 'Keitel');
INSERT INTO Role VALUES( 'Coolidge', '73', 'Willis');
INSERT INTO Role VALUES( 'Vega', '73', 'Travolta');
INSERT INTO Role VALUES( 'Deakins', '101', 'Travolta');
INSERT INTO Role VALUES( 'Archer', '102', 'Travolta');
INSERT INTO Role VALUES( 'Troy', '102', 'Cage');
INSERT INTO Role VALUES( 'Dowson', '104', 'DiCaprio');
INSERT INTO Role VALUES( 'Howard', '135', 'Cruise');
INSERT INTO Role VALUES( 'Howard', '136', 'Cruise');
INSERT INTO Role VALUES( 'Crane', '141', 'Depp');
INSERT INTO Role VALUES( 'Edward', '142', 'Depp');
INSERT INTO Role VALUES( 'Van Tassel', '141', 'Ricci');

-- Structure de la table 'Salle'


CREATE TABLE Salle (
   Nom_cinema varchar(10) NOT NULL,
   No_salle decimal(2,0) DEFAULT '0' NOT NULL,
   Climatise char(1),
   Capacite decimal(4,0),
   PRIMARY KEY (Nom_cinema, No_salle)
);

-- Contenu de la table 'Salle'


INSERT INTO Salle VALUES( 'Rex', '1', 'O', '150');
INSERT INTO Salle VALUES( 'Rex', '2', 'O', '100');
INSERT INTO Salle VALUES( 'Rex', '3', 'N', '80');
INSERT INTO Salle VALUES( 'Rex', '4', 'N', '80');
INSERT INTO Salle VALUES( 'Kino', '1', 'N', '280');
INSERT INTO Salle VALUES( 'Kino', '2', 'O', '120');
INSERT INTO Salle VALUES( 'Kino', '3', 'O', '130');
INSERT INTO Salle VALUES( 'Nations', '1', 'O', '130');
INSERT INTO Salle VALUES( 'Nations', '2', 'N', '90');
INSERT INTO Salle VALUES( 'Nations', '3', 'N', '60');
INSERT INTO Salle VALUES( 'Halles', '1', 'O', '75');
INSERT INTO Salle VALUES( 'Halles', '2', 'N', '60');
INSERT INTO Salle VALUES( 'Halles', '3', 'N', '60');

-- Structure de la table 'Seance'


CREATE TABLE Seance (
   Nom_cinema varchar(10) NOT NULL,
   No_salle decimal(2,0) DEFAULT '0' NOT NULL,
   No_seance decimal(2,0) DEFAULT '0' NOT NULL,
   Heure_debut decimal(4,2),
   Heure_fin decimal(4,2),
   ID_film decimal(10,0) DEFAULT '0' NOT NULL,
   PRIMARY KEY (Nom_cinema, No_salle, No_seance)
);

-- Contenu de la table 'Seance'


INSERT INTO Seance VALUES( 'Rex', '1', '3', '9.99', '9.99', '1');
INSERT INTO Seance VALUES( 'Rex', '1', '4', '9.99', '9.99', '6');
INSERT INTO Seance VALUES( 'Rex', '2', '1', '9.99', '9.99', '34');
INSERT INTO Seance VALUES( 'Rex', '2', '2', '9.99', '9.99', '34');
INSERT INTO Seance VALUES( 'Rex', '2', '3', '9.99', '9.99', '7');
INSERT INTO Seance VALUES( 'Rex', '2', '4', '9.99', '9.99', '65');
INSERT INTO Seance VALUES( 'Rex', '3', '1', '9.99', '9.99', '11');
INSERT INTO Seance VALUES( 'Rex', '3', '2', '9.99', '9.99', '11');
INSERT INTO Seance VALUES( 'Rex', '3', '3', '9.99', '9.99', '11');
INSERT INTO Seance VALUES( 'Rex', '4', '1', '9.99', '9.99', '38');
INSERT INTO Seance VALUES( 'Rex', '4', '2', '9.99', '9.99', '38');
INSERT INTO Seance VALUES( 'Rex', '4', '3', '9.99', '9.99', '38');
INSERT INTO Seance VALUES( 'Kino', '1', '1', '9.99', '9.99', '34');
INSERT INTO Seance VALUES( 'Kino', '1', '2', '9.99', '9.99', '73');
INSERT INTO Seance VALUES( 'Kino', '1', '3', '9.99', '9.99', '34');
INSERT INTO Seance VALUES( 'Kino', '2', '1', '9.99', '9.99', '43');
INSERT INTO Seance VALUES( 'Kino', '2', '2', '9.99', '9.99', '7');
INSERT INTO Seance VALUES( 'Kino', '2', '3', '9.99', '9.99', '43');
INSERT INTO Seance VALUES( 'Kino', '3', '1', '9.99', '9.99', '101');
INSERT INTO Seance VALUES( 'Kino', '3', '2', '9.99', '9.99', '102');
INSERT INTO Seance VALUES( 'Kino', '3', '3', '9.99', '9.99', '104');
INSERT INTO Seance VALUES( 'Kino', '3', '4', '9.99', '9.99', '104');
INSERT INTO Seance VALUES( 'Nations', '1', '1', '9.99', '9.99', '65');
INSERT INTO Seance VALUES( 'Nations', '1', '2', '9.99', '9.99', '65');
INSERT INTO Seance VALUES( 'Nations', '1', '3', '9.99', '9.99', '65');
INSERT INTO Seance VALUES( 'Nations', '2', '1', '9.99', '9.99', '43');
INSERT INTO Seance VALUES( 'Nations', '2', '2', '9.99', '9.99', '43');
INSERT INTO Seance VALUES( 'Nations', '2', '3', '9.99', '9.99', '43');
INSERT INTO Seance VALUES( 'Nations', '3', '1', '9.99', '9.99', '7');
INSERT INTO Seance VALUES( 'Nations', '3', '2', '9.99', '9.99', '7');
INSERT INTO Seance VALUES( 'Nations', '3', '3', '9.99', '9.99', '7');
INSERT INTO Seance VALUES( 'Halles', '1', '1', '9.99', '9.99', '32');
INSERT INTO Seance VALUES( 'Halles', '1', '2', '9.99', '9.99', '32');
INSERT INTO Seance VALUES( 'Halles', '1', '3', '9.99', '9.99', '32');
INSERT INTO Seance VALUES( 'Halles', '2', '1', '9.99', '9.99', '5');
INSERT INTO Seance VALUES( 'Halles', '2', '2', '9.99', '9.99', '5');
INSERT INTO Seance VALUES( 'Halles', '2', '3', '9.99', '9.99', '45');
INSERT INTO Seance VALUES( 'Halles', '3', '1', '9.99', '9.99', '3');
INSERT INTO Seance VALUES( 'Halles', '3', '2', '9.99', '9.99', '3');
INSERT INTO Seance VALUES( 'Halles', '3', '3', '9.99', '9.99', '3');

CREATE TABLE Programmation (
    ID_projection INT AUTO_INCREMENT PRIMARY KEY, 
    ID_film INT NOT NULL, 
    Date_debut DATE NOT NULL,                     
    Date_fin DATE NOT NULL,                       
    Jours_semaine VARCHAR(255) NOT NULL,          
    Heure_debut TIME NOT NULL,                    
    Ville VARCHAR(255) NOT NULL,                 
    ID_cinema INT NOT NULL,                      
    FOREIGN KEY (ID_film) REFERENCES Film(ID_film),  
    FOREIGN KEY (ID_cinema) REFERENCES Cinema(ID_cinema) 
);


CREATE TABLE Utilisateur (
    ID_utilisateur INT AUTO_INCREMENT PRIMARY KEY,  
    Nom VARCHAR(50) NOT NULL,                     
    Prenom VARCHAR(50) NOT NULL,                   
    Email VARCHAR(100) UNIQUE NOT NULL,            
    Mot_de_passe VARCHAR(255) NOT NULL,            
    Role ENUM('proprietaire', 'admin') NOT NULL,  
    ID_cinema INT,                                 
    FOREIGN KEY (ID_cinema) REFERENCES Cinema(ID_cinema)
);
INSERT INTO Utilisateur (Nom, Prenom, Email, Mot_de_passe, Role, ID_cinema) 
VALUES 
    ('Dupont', 'Jean', 'jean.dupont@example.com', 'motdepassehashé', 'admin', 1),
    ('Durand', 'Marie', 'marie.durand@example.com', 'motdepassehashé', 'proprietaire', 2);
INSERT INTO Utilisateur VALUES( 'Halles', '3', '3', '9.99', '9.99', '3');
