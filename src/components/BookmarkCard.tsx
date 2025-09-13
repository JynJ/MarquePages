import { ExternalLink, Star, Edit, Trash2, Calendar } from 'lucide-react';
import { Bookmark, Category } from '../types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  category: Category | undefined;
  onToggleFavorite: (id: string) => void;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
}

export const BookmarkCard = ({ bookmark, category, onToggleFavorite, onEdit, onDelete }: BookmarkCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {bookmark.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.icon} {category.name}
                </span>
              )}
              {bookmark.favorite && (
                <Star size={14} className="text-yellow-500 fill-current" />
              )}
            </div>
          </div>
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => onToggleFavorite(bookmark.id)}
              className="p-1 text-gray-400 hover:text-yellow-500"
              title={bookmark.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Star size={16} className={bookmark.favorite ? 'fill-current text-yellow-500' : ''} />
            </button>
            <button
              onClick={() => onEdit(bookmark)}
              className="p-1 text-gray-400 hover:text-blue-500"
              title="Modifier"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(bookmark.id)}
              className="p-1 text-gray-400 hover:text-red-500"
              title="Supprimer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {bookmark.description || bookmark.url}
        </p>

        <div className="flex items-center justify-between">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
          >
            <ExternalLink size={14} />
            Ouvrir le lien
          </a>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            {formatDate(bookmark.updatedAt)}
          </div>
        </div>

        {bookmark.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
