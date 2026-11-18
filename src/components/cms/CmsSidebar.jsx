import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, PlusCircle, Globe, LogOut } from 'lucide-react';

export default function CmsSidebar({ activeTab, onSelectTab, onNavigatePublic }) {
  const { currentUser, logout } = useAuth();

  return (
    <aside className="cms-sidebar">
      {/* Admin header profile box */}
      <div className="cms-sidebar-brand">
        <div className="logo-badge" style={{ width: 42, height: 42 }}>
          <span>Logo</span>
        </div>
        <div className="cms-admin-info">
          <h3>{currentUser?.name || 'Administrador'}</h3>
          <span>{currentUser?.role || 'Docente'}</span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="cms-nav-list">
        <button
          className={`cms-nav-item ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => onSelectTab('list')}
        >
          <BookOpen size={18} />
          <span>Todos los Temas</span>
        </button>

        <button
          className={`cms-nav-item ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => onSelectTab('create')}
        >
          <PlusCircle size={18} />
          <span>Crear Nuevo Tema</span>
        </button>

        <button
          className="cms-nav-item"
          onClick={onNavigatePublic}
        >
          <Globe size={18} />
          <span>Ver Sitio Público</span>
        </button>
      </nav>

      {/* Logout button at bottom (wireframe red button "Cerrar Sesión") */}
      <div className="cms-sidebar-footer">
        <button className="btn-cms-logout" onClick={logout}>
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
