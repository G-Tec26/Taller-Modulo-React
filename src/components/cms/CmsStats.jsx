import React from 'react';
import { useContent } from '../../context/ContentContext';

export default function CmsStats() {
  const { stats } = useContent();

  return (
    <div className="cms-stats-grid">
      <div className="cms-stat-card">
        <div className="cms-stat-number">{stats.totalPublished}</div>
        <div className="cms-stat-label">Total de temas publicados</div>
      </div>

      <div className="cms-stat-card">
        <div className="cms-stat-number">{stats.totalDrafts}</div>
        <div className="cms-stat-label">Borradores guardados</div>
      </div>

      <div className="cms-stat-card">
        <div className="cms-stat-number">{stats.totalCategories}</div>
        <div className="cms-stat-label">Categorías activas</div>
      </div>
    </div>
  );
}
