# 📚 Gestionnaire de Marques-pages

Une application moderne de gestion de marques-pages avec React, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

- **Gestion complète des marques-pages** : Ajout, modification, suppression
- **Catégorisation** : Organisez vos marques-pages par catégories personnalisables
- **Système de tags** : Étiquetez vos marques-pages pour un meilleur classement
- **Recherche avancée** : Recherchez par titre, URL ou description
- **Filtres multiples** : Filtrez par catégorie, tags, favoris
- **Tri flexible** : Triez par titre, date de création, date de modification, URL
- **Favoris** : Marquez vos marques-pages préférés
- **Statistiques** : Visualisez vos données avec des graphiques
- **Interface responsive** : Fonctionne sur tous les appareils
- **Stockage local** : Vos données sont sauvegardées dans le navigateur

## 🚀 Installation et utilisation

1. **Installer les dépendances** :

   ```bash
   npm install
   ```

2. **Lancer l'application en mode développement** :

   ```bash
   npm run dev
   ```

3. **Construire l'application pour la production** :

   ```bash
   npm run build
   ```

4. **Prévisualiser la version de production** :
   ```bash
   npm run preview
   ```

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **LocalStorage** - Persistance des données

## 📱 Fonctionnalités détaillées

### Gestion des marques-pages

- Ajout de nouveaux marques-pages avec titre, URL, description
- Modification et suppression des marques-pages existants
- Système de favoris pour marquer les marques-pages importants

### Organisation

- **Catégories prédéfinies** : Travail, Personnel, Éducation, Divertissement, Technologie, Autres
- **Tags personnalisés** : Ajoutez vos propres étiquettes
- **Tri multiple** : Par titre, date de création, date de modification, URL
- **Ordre de tri** : Croissant ou décroissant

### Recherche et filtres

- **Recherche textuelle** : Dans le titre, URL et description
- **Filtrage par catégorie** : Affichez seulement certaines catégories
- **Filtrage par tags** : Sélectionnez des tags spécifiques
- **Filtre favoris** : Affichez seulement les marques-pages favoris

### Interface utilisateur

- **Design moderne** : Interface claire et intuitive
- **Responsive** : S'adapte à tous les écrans
- **Vue grille/liste** : Basculez entre les deux modes d'affichage
- **Statistiques** : Panneau de statistiques optionnel
- **Animations** : Transitions fluides

## 🎨 Personnalisation

### Catégories

Les catégories par défaut peuvent être modifiées dans `src/utils/storage.ts` :

```typescript
const getDefaultCategories = (): Category[] => [
  { id: "1", name: "Travail", color: "#3B82F6", icon: "💼" },
  { id: "2", name: "Personnel", color: "#10B981", icon: "🏠" },
  // ... autres catégories
];
```

### Couleurs et thème

Le thème peut être personnalisé via Tailwind CSS dans `tailwind.config.js` et `src/index.css`.

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── AddBookmarkForm.tsx
│   ├── BookmarkCard.tsx
│   ├── BookmarkGrid.tsx
│   ├── FilterBar.tsx
│   └── StatsPanel.tsx
├── hooks/              # Hooks personnalisés
│   ├── useBookmarks.ts
│   └── useCategories.ts
├── types/              # Types TypeScript
│   └── index.ts
├── utils/              # Utilitaires
│   └── storage.ts
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 🔧 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 📝 Utilisation

1. **Ajouter un marque-page** : Cliquez sur le bouton "Ajouter" et remplissez le formulaire
2. **Rechercher** : Utilisez la barre de recherche pour trouver des marques-pages
3. **Filtrer** : Utilisez les filtres par catégorie, tags ou favoris
4. **Trier** : Choisissez le critère de tri et l'ordre
5. **Modifier** : Cliquez sur l'icône d'édition d'un marque-page
6. **Supprimer** : Cliquez sur l'icône de suppression (avec confirmation)
7. **Favoris** : Cliquez sur l'étoile pour marquer/démarquer un favori

## 🚀 Déploiement

L'application peut être déployée sur n'importe quel service d'hébergement statique :

- Vercel
- Netlify
- GitHub Pages
- Surge.sh

Après avoir construit l'application avec `npm run build`, les fichiers de production se trouvent dans le dossier `dist/`.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Optimiser les performances

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**Profitez de votre nouvelle application de gestion de marques-pages ! 🎉**
