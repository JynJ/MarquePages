import { useState, useEffect, useCallback } from 'react';
import { Category } from '../types';
import { storage } from '../utils/storage';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedCategories = storage.getCategories();
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      storage.saveCategories(categories);
    }
  }, [categories]);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
    };
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...updates } : category
      )
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }, []);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
