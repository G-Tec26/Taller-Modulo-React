import React from 'react';

export default function CategoryBadge({ category, className = '' }) {
  const getBadgeClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'matemáticas':
      case 'matematicas':
        return 'badge-matematicas';
      case 'ciencias':
        return 'badge-ciencias';
      case 'historia':
        return 'badge-historia';
      case 'tecnología':
      case 'tecnologia':
        return 'badge-tecnologia';
      case 'lenguaje':
        return 'badge-lenguaje';
      default:
        return 'badge-default';
    }
  };

  return (
    <span className={`badge ${getBadgeClass(category)} ${className}`}>
      {category || 'General'}
    </span>
  );
}
