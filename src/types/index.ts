export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  tags: string[];
  favoritesOnly: boolean;
  sortBy: 'title' | 'createdAt' | 'updatedAt' | 'url';
  sortOrder: 'asc' | 'desc';
}
