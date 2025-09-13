import { Bookmark, Category } from '../types';

const STORAGE_KEYS = {
  BOOKMARKS: 'bookmark-manager-bookmarks',
  CATEGORIES: 'bookmark-manager-categories',
} as const;

export const storage = {
  // Bookmarks
  getBookmarks: (): Bookmark[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveBookmarks: (bookmarks: Bookmark[]): void => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  },

  // Categories
  getCategories: (): Category[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : getDefaultCategories();
    } catch {
      return getDefaultCategories();
    }
  },

  saveCategories: (categories: Category[]): void => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },
};

const getDefaultCategories = (): Category[] => [
  { id: '1', name: 'Technologie', color: '#3B82F6', icon: '💻' },
  { id: '2', name: 'Éducation', color: '#10B981', icon: '🎓' },
  { id: '3', name: 'Divertissement', color: '#F59E0B', icon: '🎮' },
  { id: '4', name: 'Actualités', color: '#EF4444', icon: '📰' },
  { id: '5', name: 'Référence', color: '#8B5CF6', icon: '📚' },
  { id: '6', name: 'Réseaux sociaux', color: '#EC4899', icon: '📱' },
  { id: '7', name: 'Productivité', color: '#22C55E', icon: '✅' },
  { id: '8', name: 'Shopping', color: '#F97316', icon: '🛒' },
  { id: '9', name: 'Voyage', color: '#06B6D4', icon: '✈️' },
  { id: '10', name: 'Autres', color: '#6B7280', icon: '📦' },
];