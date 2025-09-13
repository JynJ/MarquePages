import { BookmarkCard } from './BookmarkCard';
import { Bookmark, Category } from '../types';

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  categories: Category[];
  onToggleFavorite: (id: string) => void;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
}

export const BookmarkGrid = ({ bookmarks, categories, onToggleFavorite, onEdit, onDelete }: BookmarkGridProps) => {
  const getCategory = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun marque-page trouvé</h3>
        <p className="text-gray-500">Commencez par ajouter votre premier marque-page !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          category={getCategory(bookmark.category)}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
