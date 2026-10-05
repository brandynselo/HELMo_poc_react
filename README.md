# ImmoVision - Proof of Concept (React)

## Description
POC visant à évaluer si **React seul** (Vite + React Router) suffit pour le projet scolaire ImmoVision, en comparaison avec une version Next.js réalisée séparément.
Ce n'est pas l'application finale : il sert uniquement à valider les choix technologiques.

## Objectifs
- Découvrir et évaluer React et vérifier son adéquation avec les besoins d'ImmoVision
- Tester la création de pages et de composants
- Évaluer la gestion du routage
- Tester la récupération et l'affichage de données
- Évaluer l'intégration avec une API
- Identifier les limitations rencontrées (SEO, rendu serveur, etc.)

## Technologies
React, TypeScript, Vite, React Router, Node.js, npm

## Prérequis
[Node.js](https://nodejs.org/) (npm inclus) et, de préférence, Git.

## Installation et lancement
```bash
git clone <URL_DU_REPOSITORY>
cd HELMo_poc_react/helmo-app
npm install
npm run dev
```
L'application est accessible sur `http://localhost:5173`.

## API mock
Les données (biens, avis) sont servies par une fausse API [json-server](https://github.com/typicode/json-server), située dans le dossier `api/`, À PART part du projet React, pas celui dedans. Il faudra le créer.

Dans un second terminal :
```bash
cd api
npx json-server@0.17.4 db.json --watch --port 4000
```
L'API est accessible sur `http://localhost:4000` (ex. `/biens`, `/avis`).

## Conclusion
Les observations de ce POC, comparées à celles de la version Next.js, serviront à choisir la technologie du projet final.

## Licence
Projet réalisé dans le cadre d'un projet scolaire.
