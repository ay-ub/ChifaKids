# ChifaKids - Gestion Informatique des Dossiers Médicaux Pédiatriques

## 📌 Introduction

ChifaKids est une solution logicielle destinée aux cabinets de pédiatrie pour optimiser la gestion des dossiers médicaux des enfants. Ce projet vise à automatiser les processus administratifs et médicaux afin d'améliorer l'efficacité, la sécurité et la qualité des services médicaux.

## 🎯 Objectifs du Projet

- 📂 **Gestion efficace des dossiers médicaux** : Stockage numérique sécurisé des informations médicales des patients.
- 🗓 **Planification et suivi des rendez-vous** : Réduction des délais et amélioration de l'organisation.
- 🔒 **Sécurisation des données médicales** : Protection des informations sensibles contre les accès non autorisés.
- ⚡ **Automatisation des tâches administratives** : Simplification des procédures d'inscription, de modification et d'annulation des rendez-vous.
- 📊 **Amélioration de la précision des données médicales** : Réduction des erreurs humaines grâce à un système intelligent.

## 🏥 Contexte

Ce projet a été développé suite à une étude réalisée au sein du cabinet médical **Rajaa** à Chlef, Algérie. L'analyse des processus existants a mis en évidence plusieurs problèmes, notamment :

- Perte de temps dans la recherche des dossiers médicaux.
- Difficulté dans la gestion des rendez-vous.
- Risque élevé d'erreurs et de perte des données médicales.

## 🎭 Identification des Acteurs

Dans toute analyse d’application, la première étape consiste à identifier les divers acteurs impliqués. Dans cette optique, nous avons identifié trois acteurs principaux :

| Acteurs            | Rôle                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Administrateur** | Gère l’administration de l’application, y compris la gestion des médecins et des infirmiers.  |
| **Infirmier**      | Utilise l’application pour la gestion des malades, de la salle d’attente et de la trésorerie. |
| **Médecin**        | Utilise l’application pour consulter les malades.                                             |

## 📂 Structure du Projet

```
ChifaKids/
│── client/                      # Code source du front-end
│── server/                      # Code source du back-end
│── uml-diagrams/                # Diagrammes UML du projet
│   ├── class-diagrams/
│   │   ├── class-diagram.png
│   ├── sequence-diagrams/
│   │   ├── add-appointment-sequence.png
│   │   ├── manage-consultations-sequence.png
│   │   ├── update-curve-data-sequence.png
│   ├── use-case-diagrams/
│   │   ├── admin-use-case-diagram.png
│   │   ├── doctor-use-case-diagram.png
│   │   ├── nurse-use-case-diagram.png
│   │   ├── use-case-general.png
│── README.md
```

## 🚀 Fonctionnalités

✅ Gestion électronique des dossiers patients.
✅ Planification et rappel automatique des rendez-vous.
✅ Sécurisation et chiffrement des données médicales.
✅ Génération d'ordonnances et de rapports médicaux.
✅ Interface intuitive et accessible pour les médecins et le personnel médical.

## 🛠 Technologies Utilisées

- **Front-end** : React.js avec Tailwind CSS.
- **Back-end** : Node.js avec Express et PostgreSQL.
- **Authentification** : JWT.
- **Déploiement** : CI/CD via GitHub Actions.

## 📦 Installation & Exécution

### 🛠 Prérequis

- Node.js (v18+)
- PostgreSQL (v15+)
- pnpm (gestionnaire de paquets)

### 🚀 Installation

```sh
# Cloner le projet
git clone https://github.com/ay-ub/ChifaKids.git
cd ChifaKids

# Installer les dépendances et démarrer le client
cd client
pnpm install  # ou npm install
pnpm start

# Installer les dépendances et démarrer le serveur
cd ../server
pnpm install  # ou npm install
pnpm run dev
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour proposer une amélioration :

1. Forker le projet 🍴
2. Créer une branche `feature/ma-fonctionnalite` 🌱
3. Soumettre une pull request 📩

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le partager.
