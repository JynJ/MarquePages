import { Bookmark, Category } from '../types';
import { Bookmark as BookmarkIcon, Star, Tag, Calendar } from 'lucide-react';

interface StatsPanelProps {
  bookmarks: Bookmark[];
  categories: Category[];
}

export const StatsPanel = ({ bookmarks, categories }: StatsPanelProps) => {
  const totalBookmarks = bookmarks.length;
  const favoriteBookmarks = bookmarks.filter(b => b.favorite).length;
  const totalTags = [...new Set(bookmarks.flatMap(b => b.tags))].length;
  
  const categoryStats = categories.map(category => ({
    ...category,
    count: bookmarks.filter(b => b.category === category.id).count
  }));

  const recentBookmarks = bookmarks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
            <BookmarkIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalBookmarks}</div>
          <div className="text-sm text-gray-500">Marques-pages</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{favoriteBookmarks}</div>
          <div className="text-sm text-gray-500">Favoris</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
            <Tag className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalTags}</div>
          <div className="text-sm text-gray-500">Tags uniques</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
          <div className="text-sm text-gray-500">Catégories</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Par catégorie</h3>
          <div className="space-y-2">
            {categoryStats.map(category => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ color: category.color }}>{category.icon}</span>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {recentBookmarks.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Récents</h3>
            <div className="space-y-2">
              {recentBookmarks.map(bookmark => (
                <div key={bookmark.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 truncate">{bookmark.title}</span>
                  <span className="text-gray-500">
                    {new Date(bookmark.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
