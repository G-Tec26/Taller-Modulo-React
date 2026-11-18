import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogIn, LayoutDashboard, LogOut, Menu, X, BookOpen } from 'lucide-react';

export default function Navbar({ currentView, onNavigate }) {
  const { currentUser, isAuthenticated, isAdminOrTeacher, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view, topicId = null) => {
    onNavigate(view, topicId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand / Logo */}
        <div 
          className="navbar-brand" 
          onClick={() => handleNav('home')} 
          style={{ cursor: 'pointer' }}
          title="Ir al inicio"
        >
          <div className="logo-badge">
            <span>Logo</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#0f172a' }}>
            EduPortal
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="navbar-nav">
            <li>
              <button
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNav('home')}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentView === 'catalog' || currentView === 'detail' ? 'active' : ''}`}
                onClick={() => handleNav('catalog')}
              >
                Temas / Blog
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
                onClick={() => handleNav('about')}
              >
                Sobre nosotros
              </button>
            </li>
          </ul>
        </nav>

        {/* Actions (Login / User Profile / CMS Access) */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isAdminOrTeacher && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleNav('cms')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', padding: '0.55rem 1rem' }}
                >
                  <LayoutDashboard size={16} />
                  <span>Panel CMS</span>
                </button>
              )}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  background: '#f1f5f9', 
                  padding: '0.35rem 0.75rem', 
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155'
                }}
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span>{currentUser.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={logout}
                title="Cerrar sesión"
                style={{ color: '#64748b', padding: '0.4rem', borderRadius: '8px' }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => handleNav('login')}
            >
              Iniciar Sesión
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', padding: '0.4rem', color: '#334155' }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
          >
            Inicio
          </button>
          <button
            className={`nav-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNav('catalog')}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
          >
            Temas / Blog
          </button>
          <button
            className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
            style={{ textAlign: 'left', padding: '0.5rem 0' }}
          >
            Sobre nosotros
          </button>
        </div>
      )}
    </header>
  );
}
