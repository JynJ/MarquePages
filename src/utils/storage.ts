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
  { id: '1', name: 'Action', color: '#EF4444', icon: '⚔️' },
  { id: '2', name: 'Adventure', color: '#F59E0B', icon: '🗺️' },
  { id: '3', name: 'Comedy', color: '#FBBF24', icon: '😂' },
  { id: '4', name: 'Drama', color: '#8B5CF6', icon: '🎭' },
  { id: '5', name: 'Fantasy', color: '#A855F7', icon: '🧙‍♂️' },
  { id: '6', name: 'Boys\' Love (BL)', color: '#EC4899', icon: '💕' },
  { id: '7', name: 'Cooking', color: '#F97316', icon: '🍳' },
  { id: '8', name: 'Crime', color: '#374151', icon: '🔍' },
  { id: '9', name: 'Demons', color: '#7C2D12', icon: '👹' },
  { id: '10', name: 'Ecchi', color: '#DC2626', icon: '😏' },
  { id: '11', name: 'Harem', color: '#DB2777', icon: '👥' },
  { id: '12', name: 'Historical', color: '#92400E', icon: '🏛️' },
  { id: '13', name: 'Horror', color: '#1F2937', icon: '👻' },
  { id: '14', name: 'Isekai', color: '#059669', icon: '🌍' },
  { id: '15', name: 'Josei', color: '#BE185D', icon: '👩' },
  { id: '16', name: 'Magic', color: '#7C3AED', icon: '✨' },
  { id: '17', name: 'Martial Arts', color: '#D97706', icon: '🥋' },
  { id: '18', name: 'Mystery', color: '#4B5563', icon: '🔍' },
  { id: '19', name: 'Overpowered', color: '#DC2626', icon: '💪' },
  { id: '20', name: 'Reincarnation', color: '#059669', icon: '🔄' },
  { id: '21', name: 'Revenge', color: '#7F1D1D', icon: '⚡' },
  { id: '22', name: 'Romance', color: '#EC4899', icon: '💖' },
  { id: '23', name: 'School Life', color: '#3B82F6', icon: '🎒' },
  { id: '24', name: 'Sci-Fi (Science Fiction)', color: '#06B6D4', icon: '🚀' },
  { id: '25', name: 'Psychological', color: '#6B7280', icon: '🧠' },
];