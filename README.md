# Taskify

**Taskify** est une application SaaS de gestion de tâches collaborative, développée avec Next.js, Prisma, PostgreSQL et NextAuth.

--

## Fonctionnalités

- Authentification avec NextAuth (Google et credentials)  
- Création, lecture, modification et suppression (CRUD) de tâches  
- Dashboard responsive avec interface moderne  
- API REST intégrée avec Next.js App Router  
- Base de données PostgreSQL gérée avec Prisma  
- UI fluide et agréable avec React et Tailwind CSS  
- Dark mode (à implémenter)  
- Tests avec Jest / Playwright (à implémenter)  

---

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/ton-utilisateur/taskify.git
cd taskify

2. Installer les dépendances :
npm install


3. Configurer la base de données PostgreSQL :
Utiliser Docker ou une installation locale
Modifier le fichier .env avec ta variable DATABASE_URL :
env
DATABASE_URL="postgresql://admin:admin@localhost:5432/taskify"

4. Pousser le schéma Prisma vers la base :
npx prisma db push

5.Lancer le serveur de développement :
npm run dev

6.Ouvrir dans le navigateur : http://localhost:3000



Scripts disponibles
npm run dev : lance le serveur Next.js en mode développement

npm run build : compile le projet pour la production

npm run start : démarre le serveur en production

npx prisma generate : génère le client Prisma

npx prisma db push : synchronise le schéma Prisma avec la base de données


Contribuer
Les contributions sont les bienvenues !
Merci d’ouvrir une issue ou une pull request.
