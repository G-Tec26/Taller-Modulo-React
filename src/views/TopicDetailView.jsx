import React from 'react';
import { useContent } from '../context/ContentContext';
import CategoryBadge from '../components/common/CategoryBadge';
import { ArrowLeft, Download, ExternalLink, Calendar, User } from 'lucide-react';

export default function TopicDetailView({ topicId, onNavigate }) {
  const { getTopic, getRelatedTopics } = useContent();

  const topic = getTopic(topicId);

  if (!topic) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Tema no encontrado</h2>
        <p style={{ color: '#64748b', margin: '1rem 0 2rem' }}>El tema solicitado no existe o ha sido retirado.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('catalog')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  const relatedTopics = getRelatedTopics(topic.id, topic.category);

  const handleResourceClick = () => {
    if (topic.resourceLink && topic.resourceLink.startsWith('http')) {
      window.open(topic.resourceLink, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Descargando recurso educativo:\n"${topic.resourceText || 'Guía didáctica en PDF'}"`);
    }
  };

  return (
    <article className="detail-view">
      <div className="container-narrow">
        {/* Back Button matching wireframe: ← Volver a temas */}
        <button className="btn-back" onClick={() => onNavigate('catalog')}>
          <ArrowLeft size={16} />
          <span>Volver a temas</span>
        </button>

        {/* Title and metadata matching wireframe */}
        <header className="detail-header">
          <h1 className="detail-title">{topic.title}</h1>

          <div className="detail-meta-row">
            <CategoryBadge category={topic.category} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} />
              <span>Publicado: {topic.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} />
              <span>Autor: {topic.author || 'Prof. Docente Titular'}</span>
            </div>
          </div>
        </header>

        {/* Featured Image Box matching wireframe */}
        <div className="detail-hero-box">
          <img
            src={topic.imageUrl}
            alt={topic.title}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </div>

        {/* Subtitle 1 & Paragraph matching wireframe */}
        <section className="detail-content-section">
          <h2 className="detail-subtitle">{topic.subtitle1 || 'Subtítulo 1: Fundamentos conceptuales'}</h2>
          <p className="detail-paragraph">
            {topic.content1 || 'Párrafo de contenido del tema. Aquí se desarrolla la explicación con texto estructurado, ejemplos y definiciones para el estudiante, en varias líneas de lectura cómoda y amena.'}
          </p>
        </section>

        {/* Subtitle 2 & List/Paragraph matching wireframe */}
        <section className="detail-content-section">
          <h2 className="detail-subtitle">{topic.subtitle2 || 'Subtítulo 2: Aplicaciones prácticas y metodología'}</h2>
          <p className="detail-paragraph">
            {topic.content2 || 'Segundo párrafo con listas, pasos o conceptos clave. Puede incluir negritas, cursivas y viñetas según el contenido redactado en el editor por el profesor titular de la materia.'}
          </p>
        </section>

        {/* Resource download box matching wireframe: Recursos: archivo descargable o enlace externo */}
        <div className="detail-resource-box" onClick={handleResourceClick}>
          <Download size={20} />
          <span>{topic.resourceText || 'Recursos: archivo descargable o enlace externo'}</span>
          <ExternalLink size={16} style={{ marginLeft: 'auto', opacity: 0.6 }} />
        </div>

        {/* Temas relacionados matching wireframe */}
        {relatedTopics.length > 0 && (
          <section className="related-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Temas relacionados</h2>

            <div className="related-grid">
              {relatedTopics.map((rel) => (
                <div key={rel.id} className="related-card">
                  <div className="related-card-thumb">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                  <div className="related-card-content">
                    <CategoryBadge category={rel.category} />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.5rem 0', color: '#0f172a' }}>
                      {rel.title}
                    </h3>
                    <button
                      className="btn btn-read-more"
                      onClick={() => {
                        onNavigate('detail', rel.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Leer más
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
