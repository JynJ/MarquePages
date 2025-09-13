import { useState, useEffect, useCallback } from 'react';
import { Bookmark, FilterOptions } from '../types';
import { storage } from '../utils/storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    tags: [],
    favoritesOnly: false,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Charger les marques-pages au démarrage
  useEffect(() => {
    const savedBookmarks = storage.getBookmarks();
    setBookmarks(savedBookmarks);
  }, []);

  // Sauvegarder les marques-pages quand ils changent
  useEffect(() => {
    if (bookmarks.length > 0) {
      storage.saveBookmarks(bookmarks);
    }
  }, [bookmarks]);

  // Filtrer et trier les marques-pages
  useEffect(() => {
    let filtered = [...bookmarks];

    // Recherche par titre, URL ou description
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(searchLower) ||
          bookmark.url.toLowerCase().includes(searchLower) ||
          (bookmark.description && bookmark.description.toLowerCase().includes(searchLower))
      );
    }

    // Filtrer par catégorie
    if (filters.category) {
      filtered = filtered.filter((bookmark) => bookmark.category === filters.category);
    }

    // Filtrer par tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter((bookmark) =>
        filters.tags.some((tag) => bookmark.tags.includes(tag))
      );
    }

    // Filtrer les favoris
    if (filters.favoritesOnly) {
      filtered = filtered.filter((bookmark) => bookmark.favorite);
    }

    // Trier
    filtered.sort((a, b) => {
      let aValue: any = a[filters.sortBy];
      let bValue: any = b[filters.sortBy];

      if (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredBookmarks(filtered);
  }, [bookmarks, filters]);

  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBookmarks((prev) => [...prev, newBookmark]);
  }, []);

  const updateBookmark = useCallback((id: string, updates: Partial<Bookmark>) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, ...updates, updatedAt: new Date() }
          : bookmark
      )
    );
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    updateBookmark(id, { favorite: !bookmarks.find((b) => b.id === id)?.favorite });
  }, [bookmarks, updateBookmark]);

  return {
    bookmarks: filteredBookmarks,
    allBookmarks: bookmarks,
    filters,
    setFilters,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    toggleFavorite,
  };
};
