# Image de base Python
FROM python:3.9-slim

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste de l'application
COPY . .

# Exposer le port de l’API Flask
EXPOSE 5000

# Lancer l’application
CMD ["python", "app.py"]
