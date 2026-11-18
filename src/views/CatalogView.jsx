import React, { useState, useMemo } from 'react';
import { useContent } from '../context/ContentContext';
import CategoryBadge from '../components/common/CategoryBadge';
import { Search, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function CatalogView({ onNavigate }) {
  const { publishedTopics, categories } = useContent();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter topics based on active category & search query
  const filteredTopics = useMemo(() => {
    return publishedTopics.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'Todas' ||
        topic.category.toLowerCase() === selectedCategory.toLowerCase();

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        topic.title.toLowerCase().includes(term) ||
        (topic.content1 && topic.content1.toLowerCase().includes(term)) ||
        (topic.category && topic.category.toLowerCase().includes(term)) ||
        (topic.author && topic.author.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [publishedTopics, selectedCategory, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage) || 1;
  const currentTopics = filteredTopics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSearchInput('');
    setSelectedCategory('Todas');
    setCurrentPage(1);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>
        Catálogo de temas
      </h1>

      {/* Search Bar matching wireframe (input + Buscar button) */}
      <form onSubmit={handleSearchSubmit} className="catalog-search-bar">
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Buscar por palabra clave..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              // Also live search if user types
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
          <Search size={18} />
          <span>Buscar</span>
        </button>
      </form>

      {/* Category Pills matching wireframe */}
      <div className="category-pills-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      {currentTopics.length > 0 ? (
        <div className="topic-grid">
          {currentTopics.map((topic) => (
            <article key={topic.id} className="topic-card">
              <div className="topic-card-thumb">
                <img
                  src={topic.imageUrl}
                  alt={topic.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="topic-card-body">
                <CategoryBadge category={topic.category} />
                <h3 className="topic-card-title">{topic.title}</h3>
                <div className="topic-card-meta">{topic.date}</div>
                <button
                  className="btn btn-read-more"
                  onClick={() => onNavigate('detail', topic.id)}
                >
                  Leer más
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1.5px dashed #cbd5e1',
          margin: '2rem 0'
        }}>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1.25rem' }}>
            No se encontraron temas publicados para el criterio seleccionado.
          </p>
          <button className="btn btn-outline" onClick={handleResetFilters}>
            <RotateCcw size={16} />
            <span>Restablecer filtros</span>
          </button>
        </div>
      )}

      {/* Pagination row matching wireframe: < [1] [2] [3] > */}
      {totalPages > 1 && (
        <div className="pagination-row">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            title="Página anterior"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            title="Página siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
