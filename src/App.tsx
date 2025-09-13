import { useState } from 'react';
import { Plus, BarChart3, Grid, List } from 'lucide-react';
import { AddBookmarkForm } from './components/AddBookmarkForm';
import { FilterBar } from './components/FilterBar';
import { BookmarkGrid } from './components/BookmarkGrid';
import { StatsPanel } from './components/StatsPanel';
import { useBookmarks } from './hooks/useBookmarks';
import { useCategories } from './hooks/useCategories';
import { Bookmark } from './types';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  const { categories } = useCategories();
  const {
    bookmarks,
    allBookmarks,
    filters,
    setFilters,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    toggleFavorite,
  } = useBookmarks();

  const allTags = [...new Set(allBookmarks.flatMap(bookmark => bookmark.tags))];

  const handleAddBookmark = (bookmarkData: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingBookmark) {
      updateBookmark(editingBookmark.id, bookmarkData);
      setEditingBookmark(null);
    } else {
      addBookmark(bookmarkData);
    }
  };

  const handleEditBookmark = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleDeleteBookmark = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce marque-page ?')) {
      deleteBookmark(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">📚 Gestionnaire de Marques-pages</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-500 hover:text-gray-700"
                title={viewMode === 'grid' ? 'Vue liste' : 'Vue grille'}
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Statistiques"
              >
                <BarChart3 size={20} />
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={20} />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec statistiques */}
          {showStats && (
            <div className="lg:col-span-1">
              <StatsPanel bookmarks={allBookmarks} categories={categories} />
            </div>
          )}

          {/* Contenu principal */}
          <div className={showStats ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              allTags={allTags}
            />

            <BookmarkGrid
              bookmarks={bookmarks}
              categories={categories}
              onToggleFavorite={toggleFavorite}
              onEdit={handleEditBookmark}
              onDelete={handleDeleteBookmark}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddBookmarkForm
        isOpen={showAddForm || editingBookmark !== null}
        onClose={() => {
          setShowAddForm(false);
          setEditingBookmark(null);
        }}
        onAdd={handleAddBookmark}
        categories={categories}
        editingBookmark={editingBookmark}
      />
    </div>
  );
}

export default App;
