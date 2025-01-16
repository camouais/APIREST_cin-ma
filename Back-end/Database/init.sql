-- remplacer rem commentaires sous Oracle par --


-- Création de la base de données 'REST_API'
DROP DATABASE IF EXISTS REST_API;
CREATE DATABASE REST_API;
USE REST_API;



-- --------------------------------------------------------

-- Structure de la table 'Cinema'


CREATE TABLE Cinema (
   ID_Cinema INT AUTO_INCREMENT PRIMARY KEY,
   Nom_cinema varchar(10) NOT NULL,
   Arrondissement decimal(2,0),
   Adresse varchar(30)
);

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
    Age_minimum INT NOT NULL,
    ID_utilisateur INT
);

INSERT INTO Film (Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur)
VALUES
 ('Annie Hall', 1977, 'Woody Allen', 93.00, 'Anglais', 'Aucun sous-titre', 13, 1),
 ('Brazil', 1984, 'Terry Gilliam', 142.00, 'Anglais', 'Aucun sous-titre', 16, 2);




-- DROP TABLE Seance;
-- CREATE TABLE Seance (
--    ID_seance INT AUTO_INCREMENT PRIMARY KEY,       
--    Nom_cinema varchar(10) NOT NULL,
--    No_salle decimal(2,0) DEFAULT '0' NOT NULL,
--    No_seance decimal(2,0) DEFAULT '0' NOT NULL,
--    Heure_debut decimal(4,2),
--    Heure_fin decimal(4,2),
--    ID_film decimal(10,0) DEFAULT '0' NOT NULL
-- );

-- Contenu de la table 'Seance'


-- CREATE TABLE Programmation (
--    ID_projection INT AUTO_INCREMENT PRIMARY KEY, 
--    ID_film INT NOT NULL, 
--    Date_debut DATE NOT NULL,                     
--    Date_fin DATE NOT NULL,                       
--    Jours_semaine VARCHAR(255) NOT NULL,          
--    Heure_debut TIME NOT NULL,                    
--    Ville VARCHAR(255) NOT NULL,                 
--    ID_cinema INT NOT NULL,                      
--    FOREIGN KEY (ID_film) REFERENCES Film(ID_film),  
--    FOREIGN KEY (ID_cinema) REFERENCES Cinema(ID_cinema) 
-- );

-- Contenu de la table 'Programmation'

CREATE TABLE Programmation (
    ID_projection INT AUTO_INCREMENT PRIMARY KEY, 
    ID_film INT NOT NULL, 
    Date_debut VARCHAR(255) NOT NULL,                     
    Date_fin VARCHAR(255) NOT NULL,                       
    Jours_semaine VARCHAR(255) NOT NULL,          
    Heure_debut VARCHAR(255) NOT NULL,                                   
    ID_cinema INT NOT NULL,                      
    FOREIGN KEY (ID_film) REFERENCES Film(ID_film),  
    FOREIGN KEY (ID_cinema) REFERENCES Cinema(ID_cinema) 
);

INSERT INTO Programmation (ID_Projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema) 
VALUES (11, 2, '30/10/2024', '11/11/2024', 'lundi,mardi,mercredi', '10.00', 2),
(18, 1, '30/10/2024', '11/11/2024', 'lundi,jeudi,vendredi', '10.00', 2) ;



-- Contenu de la table 'Utilisateur'

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
    ('Dupont', 'Jean', 'jean.dupont@example.com', '$2a$10$WDZzwOleUIwUcaA1lDHVj.9JbZbN/23mglLZxyl4O/.m3ytNDGDwi', 'admin', 1),
    ('Durand', 'Marie', 'marie.durand@example.com', '$2a$10$WDZzwOleUIwUcaA1lDHVj.9JbZbN/23mglLZxyl4O/.m3ytNDGDwi', 'proprietaire', 2);

CREATE TABLE Acteur (
ID_acteur INT AUTO_INCREMENT PRIMARY KEY,
Nom_Acteur VARCHAR(50) NOT NULL,
Prenom VARCHAR(50) NOT NULL,
Roles VARCHAR(50) NOT NULL,
ID_film INT,
FOREIGN KEY (ID_film) REFERENCES Film(ID_film)
);

INSERT INTO Acteur VALUES (1, 'Woody', 'Allen', 'Alvy Singer', 1), (2, 'Diane', 'Keaton', 'Annie Hall',1),(3, 'Tony', 'Roberts', 'Rob', 1), (4, 'Carol', 'Kane', 'Allison',1),(5,'Paul', 'Simon', 'Tony Lacey', 1), (6, 'Shelley', 'Duvall','Pam',1), (7, 'Janet','Margolin', 'Robin',1);
INSERT INTO Acteur VALUES (8, 'Jonathan', 'Pryce', 'Sam Lowry', 2), (9, 'Robert De', 'Niro', 'Harry Tuttle',2),(10, 'Kim', 'Greist ', 'Jill Layton', 2), (11, 'Katherine', 'Helmond', 'Ida Lowry, la mère de Sam',2),(12,'Ian', 'Richardson', 'M. Warren', 2);