import React from 'react';
import { useContent } from '../context/ContentContext';
import CategoryBadge from '../components/common/CategoryBadge';
import { BookOpen, GraduationCap, Heart, Cpu, ArrowRight } from 'lucide-react';

export default function HomeView({ onNavigate }) {
  const { publishedTopics } = useContent();

  // Get 3 featured topics or top 3 published
  const featuredTopics = publishedTopics.filter((t) => t.featured).length >= 3
    ? publishedTopics.filter((t) => t.featured).slice(0, 3)
    : publishedTopics.slice(0, 3);

  return (
    <div>
      {/* Hero Section (Wireframe Page 6) */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Aprende, explora y crece con el portal educativo del colegio</h1>
              <p>
                Recursos, lecciones y temas preparados por nuestros docentes, disponibles para todos los estudiantes.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('catalog')}
                style={{ fontSize: '1.05rem', padding: '0.8rem 1.8rem' }}
              >
                <span>Explorar Temas</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="hero-image-box">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Estudiantes en el aula aprendiendo colaborativamente"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="placeholder-label" style={{ display: 'none' }}>
                Imagen hero
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temas Destacados (Wireframe Page 6) */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <h2 className="section-title">Temas destacados</h2>

          <div className="topic-grid">
            {featuredTopics.map((topic) => (
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
                  <p className="topic-card-excerpt">
                    {topic.content1 || 'Extracto breve del tema en dos o tres líneas de texto descriptivo con conceptos y fundamentos.'}
                  </p>
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
        </div>
      </section>

      {/* Nuestra Misión Educativa (Wireframe Page 6) */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-header">
            <h2 className="section-title" style={{ marginBottom: '0.4rem' }}>Nuestra misión educativa</h2>
            <p>Formamos estudiantes curiosos, críticos y comprometidos, con una educación de calidad y acompañamiento cercano.</p>
          </div>

          <div className="pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-item">
              <div className="pillar-icon-circle">
                <GraduationCap size={36} strokeWidth={1.8} />
              </div>
              <h3 className="pillar-title">Excelencia académica</h3>
              <p className="pillar-desc">
                Contenidos pedagógicos rigurosos adaptados a las exigencias curriculares del siglo XXI.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-item">
              <div className="pillar-icon-circle">
                <Heart size={34} strokeWidth={1.8} color="#e11d48" />
              </div>
              <h3 className="pillar-title">Formación en valores</h3>
              <p className="pillar-desc">
                Fomento de la empatía, el trabajo en equipo, la integridad ética y el respeto mutuo.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-item">
              <div className="pillar-icon-circle">
                <Cpu size={34} strokeWidth={1.8} color="#7c3aed" />
              </div>
              <h3 className="pillar-title">Innovación y tecnología</h3>
              <p className="pillar-desc">
                Herramientas interactivas y recursos digitales que potencian el pensamiento creativo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
