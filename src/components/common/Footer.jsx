import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Contact info column */}
          <div className="footer-col">
            <h4>Contacto</h4>
            <p>Dirección del colegio: Av. Educación 1234, Ciudad del Saber</p>
            <p>Teléfono: +51 (01) 555-0199 | Correo: contacto@colegio.edu</p>
          </div>

          {/* Quick links column */}
          <div className="footer-col" style={{ textAlign: 'left' }}>
            <h4>Enlaces rápidos</h4>
            <div className="footer-links">
              <button 
                onClick={() => onNavigate('home')} 
                style={{ color: '#64748b', fontSize: '0.9rem' }}
              >
                Inicio
              </button>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <button 
                onClick={() => onNavigate('catalog')} 
                style={{ color: '#64748b', fontSize: '0.9rem' }}
              >
                Temas / Blog
              </button>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <button 
                onClick={() => onNavigate('about')} 
                style={{ color: '#64748b', fontSize: '0.9rem' }}
              >
                Sobre nosotros
              </button>
            </div>
          </div>
        </div>

        {/* Copyright notice matching wireframe */}
        <div className="footer-bottom">
          <p>© 2026 Colegio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
