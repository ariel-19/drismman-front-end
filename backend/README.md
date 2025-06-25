# Backend Auto-École

Ce projet est le backend d'une application d'auto-école, développé avec Spring Boot et ScyllaDB.

## Prérequis

- Java 17 ou supérieur
- Maven
- ScyllaDB (ou Cassandra compatible)
- Docker (optionnel, pour exécuter ScyllaDB dans un conteneur)

## Installation de ScyllaDB

### Option 1 : Utilisation de Docker

```bash
# Télécharger et démarrer un conteneur ScyllaDB
docker run --name scylla-node -p 9042:9042 -d scylladb/scylla

# Vérifier que le conteneur est en cours d'exécution
docker ps
```

### Option 2 : Installation native

Suivez les instructions d'installation de ScyllaDB pour votre système d'exploitation sur le site officiel : https://www.scylladb.com/download/

## Configuration

Les paramètres de connexion à ScyllaDB sont configurés dans le fichier `src/main/resources/application.properties`. Modifiez ces paramètres selon votre configuration :

```properties
spring.cassandra.contact-points=localhost
spring.cassandra.port=9042
spring.cassandra.keyspace-name=autoecole
spring.cassandra.schema-action=CREATE_IF_NOT_EXISTS
spring.cassandra.local-datacenter=datacenter1
```

## Exécution de l'application

```bash
# Compiler le projet
mvn clean install

# Exécuter l'application
mvn spring-boot:run
```

L'application sera accessible à l'adresse http://localhost:8080

## API REST

### Élèves

- `GET /api/eleves` : Liste tous les élèves
- `GET /api/eleves/{id}` : Récupère un élève par son ID
- `GET /api/eleves/search?nom=Dupont&prenom=Jean` : Recherche des élèves par nom et/ou prénom
- `POST /api/eleves` : Crée un nouvel élève
- `PUT /api/eleves/{id}` : Met à jour un élève existant
- `DELETE /api/eleves/{id}` : Supprime un élève

### Moniteurs

- `GET /api/moniteurs` : Liste tous les moniteurs
- `GET /api/moniteurs/{id}` : Récupère un moniteur par son ID
- `GET /api/moniteurs/search?nom=Dupont&prenom=Jean&numeroAgrement=12345` : Recherche des moniteurs par nom, prénom et/ou numéro d'agrément
- `POST /api/moniteurs` : Crée un nouveau moniteur
- `PUT /api/moniteurs/{id}` : Met à jour un moniteur existant
- `DELETE /api/moniteurs/{id}` : Supprime un moniteur

### Leçons

- `GET /api/lecons` : Liste toutes les leçons
- `GET /api/lecons/{id}` : Récupère une leçon par son ID
- `GET /api/lecons/eleve/{eleveId}` : Liste les leçons d'un élève
- `GET /api/lecons/moniteur/{moniteurId}` : Liste les leçons d'un moniteur
- `GET /api/lecons/search?eleveId=...&moniteurId=...&statut=...` : Recherche des leçons selon différents critères
- `POST /api/lecons` : Crée une nouvelle leçon
- `PUT /api/lecons/{id}` : Met à jour une leçon existante
- `PATCH /api/lecons/{id}/statut?statut=TERMINEE` : Met à jour le statut d'une leçon
- `PATCH /api/lecons/{id}/commentaire?commentaire=...` : Ajoute un commentaire à une leçon
- `DELETE /api/lecons/{id}` : Supprime une leçon

## Structure du projet

- `model` : Entités JPA (Eleve, Moniteur, Lecon)
- `repository` : Interfaces Spring Data pour l'accès aux données
- `service` : Services métier
- `controller` : Contrôleurs REST
- `config` : Configuration de l'application et de ScyllaDB

## Technologies utilisées

- Spring Boot 3.5.0
- Spring Data Cassandra
- ScyllaDB Java Driver
- Maven
