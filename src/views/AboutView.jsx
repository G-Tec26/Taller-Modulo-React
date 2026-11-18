import React from 'react';
import { Award, Users, BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function AboutView({ onNavigate }) {
  const teachers = [
    {
      name: 'Prof. Carlos Mendoza',
      role: 'Coordinador de Ciencias y Tecnología',
      subject: 'Matemáticas y Computación',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Especialista en didáctica matemática y robótica educativa con más de 12 años guiando proyectos escolares innovadores.'
    },
    {
      name: 'Prof. Elena Rostova',
      role: 'Docente Titular de Ciencias Naturales',
      subject: 'Biología, Química y Ecología',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Bióloga y educadora comprometida con el aprendizaje experimental y la divulgación científica para jóvenes.'
    },
    {
      name: 'Prof. Marcos Valdivia',
      role: 'Docente Titular de Humanidades',
      subject: 'Historia Universal y Ciudadanía',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Historiador enfocado en el pensamiento crítico, la memoria histórica y la comprensión del mundo contemporáneo.'
    }
  ];

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Sobre nosotros
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>
          Somos una comunidad educativa dedicada a inspirar la curiosidad intelectual, fomentar el pensamiento analítico y formar ciudadanos con sólidos valores éticos.
        </p>
      </div>

      {/* Pillars / Values Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '5rem'
      }}>
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: 50,
            height: 50,
            borderRadius: '12px',
            backgroundColor: '#dbeafe',
            color: '#1d4ed8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <Award size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem', color: '#0f172a' }}>
            Nuestra Filosofía
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Creemos que cada estudiante posee un potencial ilimitado. Nuestro portal CMS permite a los educadores compartir lecciones vivas, enriquecidas con recursos multimedia y ejercicios interactivos.
          </p>
        </div>

        <div style={{
          background: '#ffffff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: 50,
            height: 50,
            borderRadius: '12px',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem', color: '#0f172a' }}>
            Innovación en el Aula
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Integramos metodologías ágiles de enseñanza, talleres prácticos y herramientas digitales seguras para potenciar la resolución colaborativa de problemas del mundo real.
          </p>
        </div>

        <div style={{
          background: '#ffffff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: 50,
            height: 50,
            borderRadius: '12px',
            backgroundColor: '#f3e8ff',
            color: '#7e22ce',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <Heart size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem', color: '#0f172a' }}>
            Comunidad & Acompañamiento
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Acompañamos de manera personalizada a cada alumno y a sus familias, propiciando un ambiente escolar empático, inclusivo y seguro.
          </p>
        </div>
      </div>

      {/* Teachers / Docentes Team */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          Equipo de Docentes y Autores
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem'
        }}>
          {teachers.map((t) => (
            <div
              key={t.name}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.subject}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0.4rem 0 0.2rem', color: '#0f172a' }}>
                  {t.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem', fontWeight: 500 }}>
                  {t.role}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                  {t.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Box */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1.5px solid #bfdbfe',
        borderRadius: '20px',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.75rem' }}>
          ¿Listo para explorar nuestros contenidos educativos?
        </h3>
        <p style={{ color: '#3b82f6', fontSize: '1.05rem', marginBottom: '1.75rem', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
          Descubre todas las lecciones, guías didácticas y proyectos preparados por nuestros docentes.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('catalog')}
          style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
        >
          Explorar Catálogo de Temas
        </button>
      </div>
    </div>
  );
}
