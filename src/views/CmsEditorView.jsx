import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import RichToolbar from '../components/cms/RichToolbar';
import { IMAGE_PRESETS, FALLBACK_IMAGE } from '../data/imagePresets';
import { Image as ImageIcon, Save, Check, X } from 'lucide-react';

export default function CmsEditorView({ editTopicId, onCancel, onSaveSuccess }) {
  const { getTopic, addTopic, updateTopic, categories } = useContent();
  const { currentUser } = useAuth();

  const isEditing = Boolean(editTopicId);
  const existing = editTopicId ? getTopic(editTopicId) : null;

  // Form states
  const [title, setTitle] = useState(existing?.title || '');
  const [category, setCategory] = useState(existing?.category || 'Matemáticas');
  const [imageUrl, setImageUrl] = useState(
    existing?.imageUrl ||
    IMAGE_PRESETS.find((p) => p.category === 'Matemáticas')?.url ||
    FALLBACK_IMAGE
  );
  const [subtitle1, setSubtitle1] = useState(existing?.subtitle1 || 'Subtítulo 1');
  const [content1, setContent1] = useState(
    existing?.content1 ||
    'Redacta aquí el contenido del tema. Aquí se desarrolla la explicación con texto estructurado, ejemplos y definiciones para el estudiante.'
  );
  const [subtitle2, setSubtitle2] = useState(existing?.subtitle2 || 'Subtítulo 2');
  const [content2, setContent2] = useState(
    existing?.content2 ||
    'Segundo párrafo con listas, pasos o conceptos clave. Puede incluir negritas, cursivas y viñetas según el contenido redactado en el editor.'
  );
  const [resourceText, setResourceText] = useState(
    existing?.resourceText || 'Recursos: archivo descargable o enlace externo'
  );
  const [resourceLink, setResourceLink] = useState(existing?.resourceLink || '#recurso');

  const [imageError, setImageError] = useState(false);
  const textareaRef = useRef(null);

  // Sync category presets if creating new topic
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (!isEditing) {
      const match = IMAGE_PRESETS.find((p) => p.category.toLowerCase() === newCat.toLowerCase());
      if (match) {
        setImageUrl(match.url);
        setImageError(false);
      }
    }
  };

  // Insert formatting from RichToolbar
  const handleInsertFormat = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content1.substring(start, end);
    const replacement = `${prefix}${selectedText || 'texto'}${suffix}`;

    const newContent =
      content1.substring(0, start) + replacement + content1.substring(end);
    setContent1(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 5)
      );
    }, 50);
  };

  // Save handler for draft or published
  const handleSave = (status) => {
    if (!title.trim()) {
      alert('Por favor ingresa un título para el tema.');
      return;
    }

    const payload = {
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim() || FALLBACK_IMAGE,
      subtitle1: subtitle1.trim(),
      content1: content1.trim(),
      subtitle2: subtitle2.trim(),
      content2: content2.trim(),
      resourceText: resourceText.trim(),
      resourceLink: resourceLink.trim(),
      status: status, // 'Publicado' | 'Borrador'
      author: currentUser?.name || 'Prof. Administrador'
    };

    if (isEditing) {
      updateTopic(editTopicId, payload);
    } else {
      addTopic(payload);
    }

    onSaveSuccess(`Tema ${status === 'Publicado' ? 'publicado' : 'guardado como borrador'} exitosamente.`);
  };

  return (
    <div>
      {/* Header matching wireframe: Crear / Editar Tema + [Cancelar] [Guardar Borrador] [Publicar Tema] */}
      <div className="editor-header">
        <h1>{isEditing ? 'Editar Tema' : 'Crear / Editar Tema'}</h1>

        <div className="editor-actions-top">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancelar
          </button>
          <button
            className="btn btn-secondary-light"
            onClick={() => handleSave('Borrador')}
          >
            Guardar Borrador
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSave('Publicado')}
          >
            Publicar Tema
          </button>
        </div>
      </div>

      {/* Form Body */}
      <div>
        {/* Título del tema matching wireframe */}
        <div className="form-group" style={{ marginBottom: '1.75rem' }}>
          <label className="form-label" style={{ fontSize: '1rem' }}>
            Título del tema
          </label>
          <input
            type="text"
            placeholder="Escribe el título del tema"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontSize: '1.05rem', fontWeight: 600 }}
          />
        </div>

        {/* 2 Columns: Categoría / Materia (Left) & URL de imagen + Previsualización (Right) */}
        <div className="editor-grid-fields">
          {/* Left Column */}
          <div>
            <div className="form-group">
              <label className="form-label">Categoría / Materia</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories
                  .filter((c) => c !== 'Todas')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
              <p className="helper-text">
                La previsualización se actualiza al pegar la URL de la imagen.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Subtítulo 1</label>
              <input
                type="text"
                value={subtitle1}
                onChange={(e) => setSubtitle1(e.target.value)}
                placeholder="Subtítulo de la primera sección"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subtítulo 2</label>
              <input
                type="text"
                value={subtitle2}
                onChange={(e) => setSubtitle2(e.target.value)}
                placeholder="Subtítulo de la segunda sección"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Recurso descargable o enlace externo</label>
              <input
                type="text"
                value={resourceText}
                onChange={(e) => setResourceText(e.target.value)}
                placeholder="Ej: Guía de trabajo semanal (PDF - 1.2 MB)"
              />
            </div>
          </div>

          {/* Right Column: URL de imagen de portada + Previsualización de portada */}
          <div>
            <div className="form-group">
              <label className="form-label">URL de imagen de portada</label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageError(false);
                }}
              />
              
              {/* Educational Presets quick-picker */}
              <div style={{ marginTop: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                  Imágenes sugeridas de alta resolución:
                </span>
                <div className="presets-row">
                  {IMAGE_PRESETS.slice(0, 5).map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      className="preset-chip"
                      onClick={() => {
                        setImageUrl(preset.url);
                        setImageError(false);
                      }}
                    >
                      {preset.category}: {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Box: Previsualización de portada matching wireframe */}
            <div className="image-preview-container">
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt="Previsualización de portada"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                  <ImageIcon size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.6 }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Previsualización de portada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido del tema con Rich Toolbar matching wireframe */}
        <div className="form-group">
          <label className="form-label" style={{ fontSize: '1rem' }}>
            Contenido del tema
          </label>
          <RichToolbar onInsertFormat={handleInsertFormat} />
          <textarea
            ref={textareaRef}
            className="editor-textarea"
            placeholder="Redacta aquí el contenido del tema..."
            value={content1}
            onChange={(e) => setContent1(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Párrafo complementario / Lista de conceptos (Sección 2)</label>
          <textarea
            className="editor-textarea"
            style={{ minHeight: '130px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
            placeholder="Redacta la segunda sección o lista de conceptos..."
            value={content2}
            onChange={(e) => setContent2(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
