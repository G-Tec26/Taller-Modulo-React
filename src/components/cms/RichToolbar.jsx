import React from 'react';

export default function RichToolbar({ onInsertFormat }) {
  const handleAction = (type) => {
    switch (type) {
      case 'bold':
        onInsertFormat('**', '**');
        break;
      case 'italic':
        onInsertFormat('*', '*');
        break;
      case 'bullet':
        onInsertFormat('\n• ', '');
        break;
      case 'numbered':
        onInsertFormat('\n1. ', '');
        break;
      case 'h2':
        onInsertFormat('\n## ', '\n');
        break;
      case 'h3':
        onInsertFormat('\n### ', '\n');
        break;
      default:
        break;
    }
  };

  return (
    <div className="rich-toolbar">
      <button
        type="button"
        className="toolbar-btn"
        onClick={() => handleAction('bold')}
        title="Texto en negrita"
      >
        <strong>B</strong>
      </button>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => handleAction('italic')}
        title="Texto en cursiva"
      >
        <em>I</em>
      </button>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => handleAction('bullet')}
        title="Lista con viñetas"
      >
        • Lista
      </button>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => handleAction('numbered')}
        title="Lista numerada"
      >
        1. Lista
      </button>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => handleAction('h2')}
        title="Subtítulo nivel 2"
      >
        Subtítulo H2
      </button>

      <button
        type="button"
        className="toolbar-btn"
        onClick={() => handleAction('h3')}
        title="Subtítulo nivel 3"
      >
        Subtítulo H3
      </button>
    </div>
  );
}
