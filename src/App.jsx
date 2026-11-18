import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import HomeView from './views/HomeView';
import CatalogView from './views/CatalogView';
import TopicDetailView from './views/TopicDetailView';
import LoginView from './views/LoginView';
import CmsSidebar from './components/cms/CmsSidebar';
import CmsDashboardView from './views/CmsDashboardView';
import CmsEditorView from './views/CmsEditorView';
import AboutView from './views/AboutView';

export default function App() {
  const { isAuthenticated, isAdminOrTeacher } = useAuth();

  // Navigation state: 'home' | 'catalog' | 'detail' | 'about' | 'login' | 'cms'
  const [currentView, setCurrentView] = useState('home');
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // CMS internal tabs: 'list' | 'create' | 'edit'
  const [cmsTab, setCmsTab] = useState('list');
  const [editTopicId, setEditTopicId] = useState(null);

  // Global toast message
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3500);
  };

  const handleNavigate = (view, topicId = null) => {
    if (view === 'cms') {
      if (!isAuthenticated || !isAdminOrTeacher) {
        showToast('Debes iniciar sesión con rol de Administrador o Docente.', 'error');
        setCurrentView('login');
        return;
      }
      setCmsTab('list');
      setEditTopicId(null);
    }

    if (view === 'detail' && topicId) {
      setSelectedTopicId(topicId);
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CMS navigation helpers
  const handleOpenEditor = (topicId = null) => {
    setEditTopicId(topicId);
    setCmsTab(topicId ? 'edit' : 'create');
  };

  const handleEditorCancel = () => {
    setCmsTab('list');
    setEditTopicId(null);
  };

  const handleEditorSaveSuccess = (message) => {
    setCmsTab('list');
    setEditTopicId(null);
    showToast(message, 'success');
  };

  const handleLoginSuccess = () => {
    showToast('¡Sesión iniciada correctamente!', 'success');
    setCurrentView('cms');
    setCmsTab('list');
  };

  // If user logs out while in CMS, navigate to home
  useEffect(() => {
    if (currentView === 'cms' && !isAuthenticated) {
      setCurrentView('home');
    }
  }, [isAuthenticated, currentView]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* CMS View has its own dedicated dashboard layout with wireframe sidebar */}
      {currentView === 'cms' ? (
        <div className="cms-layout">
          <CmsSidebar
            activeTab={cmsTab}
            onSelectTab={(tab) => {
              if (tab === 'create') {
                handleOpenEditor(null);
              } else {
                setCmsTab('list');
                setEditTopicId(null);
              }
            }}
            onNavigatePublic={() => handleNavigate('catalog')}
          />
          <main className="cms-main">
            {cmsTab === 'list' && (
              <CmsDashboardView
                onNavigateEditor={handleOpenEditor}
                onNavigateDetail={(id) => handleNavigate('detail', id)}
              />
            )}
            {(cmsTab === 'create' || cmsTab === 'edit') && (
              <CmsEditorView
                editTopicId={editTopicId}
                onCancel={handleEditorCancel}
                onSaveSuccess={handleEditorSaveSuccess}
              />
            )}
          </main>
        </div>
      ) : (
        /* Public Portal Views (Home, Catalog, Detail, About, Login) */
        <>
          <Navbar currentView={currentView} onNavigate={handleNavigate} />

          <main style={{ flex: 1 }}>
            {currentView === 'home' && (
              <HomeView onNavigate={handleNavigate} />
            )}

            {currentView === 'catalog' && (
              <CatalogView onNavigate={handleNavigate} />
            )}

            {currentView === 'detail' && (
              <TopicDetailView
                topicId={selectedTopicId}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'about' && (
              <AboutView onNavigate={handleNavigate} />
            )}

            {currentView === 'login' && (
              <LoginView
                onNavigate={handleNavigate}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
          </main>

          {currentView !== 'login' && (
            <Footer onNavigate={handleNavigate} />
          )}
        </>
      )}

      {/* Global Toast */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}
    </div>
  );
}
