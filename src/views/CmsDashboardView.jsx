import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import CmsStats from '../components/cms/CmsStats';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

export default function CmsDashboardView({ onNavigateEditor, onNavigateDetail }) {
  const { topics, deleteTopic } = useContent();

  const [topicToDelete, setTopicToDelete] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const filteredTopics = topics.filter((t) => {
    const q = filterQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    );
  });

  const confirmDelete = () => {
    if (topicToDelete) {
      deleteTopic(topicToDelete.id);
      setTopicToDelete(null);
    }
  };

  return (
    <div>
      {/* Top Bar matching wireframe: Gestión de contenido + "+ Nuevo Tema" */}
      <div className="cms-topbar">
        <h1>Gestión de contenido</h1>
        <button
          className="btn btn-primary"
          onClick={() => onNavigateEditor(null)}
          style={{ padding: '0.7rem 1.4rem' }}
        >
          <Plus size={18} />
          <span>+ Nuevo Tema</span>
        </button>
      </div>

      {/* 3 Metric Cards matching wireframe */}
      <CmsStats />

      {/* Search / Filter in CMS */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Filtrar por título, materia o estado..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          style={{ maxWidth: '380px' }}
        />
        <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
          {filteredTopics.length} {filteredTopics.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {/* Content Management Table matching wireframe */}
      <div className="cms-table-wrapper">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Título del tema</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((item) => (
              <tr key={item.id}>
                <td className="table-topic-title">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 500, color: '#334155' }}>
                    {item.category}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      item.status === 'Publicado'
                        ? 'status-publicado'
                        : 'status-borrador'
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {item.date}
                </td>
                <td>
                  <div className="cms-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    {item.status === 'Publicado' && (
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                        onClick={() => onNavigateDetail(item.id)}
                        title="Ver vista pública"
                      >
                        <Eye size={15} />
                      </button>
                    )}
                    <button
                      className="btn btn-action-edit"
                      onClick={() => onNavigateEditor(item.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-action-delete"
                      onClick={() => setTopicToDelete(item)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredTopics.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  No se encontraron temas en la base de datos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(topicToDelete)}
        title="¿Eliminar este tema?"
        message={`Estás a punto de eliminar "${topicToDelete?.title}". Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setTopicToDelete(null)}
      />
    </div>
  );
}
