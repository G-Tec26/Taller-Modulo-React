import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TOPICS, CATEGORIES } from '../data/initialData';
import { FALLBACK_IMAGE } from '../data/imagePresets';

const ContentContext = createContext();

// Format date into Spanish wireframe style (e.g., "12 mar 2026")
export function formatWireframeDate(dateObj = new Date()) {
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
}

export function ContentProvider({ children }) {
  const [topics, setTopics] = useState(() => {
    try {
      const stored = localStorage.getItem('edu_cms_topics');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading topics from localStorage:', e);
    }
    return INITIAL_TOPICS;
  });

  const [categories, setCategories] = useState(CATEGORIES);

  // Sync topics to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edu_cms_topics', JSON.stringify(topics));
    } catch (e) {
      console.error('Error saving topics to localStorage:', e);
    }
  }, [topics]);

  // Create a new topic
  const addTopic = (topicData) => {
    const newTopic = {
      id: `top-${Date.now()}`,
      title: topicData.title || 'Tema sin título',
      subtitle1: topicData.subtitle1 || 'Subtítulo 1',
      content1: topicData.content1 || '',
      subtitle2: topicData.subtitle2 || 'Subtítulo 2',
      content2: topicData.content2 || '',
      category: topicData.category || 'Ciencias',
      status: topicData.status || 'Publicado', // 'Publicado' or 'Borrador'
      date: formatWireframeDate(),
      author: topicData.author || 'Prof. Administrador',
      imageUrl: topicData.imageUrl?.trim() || FALLBACK_IMAGE,
      resourceText: topicData.resourceText || 'Recursos: archivo descargable o enlace externo',
      resourceLink: topicData.resourceLink || '#',
      views: 0,
      featured: Boolean(topicData.featured)
    };

    setTopics((prev) => [newTopic, ...prev]);
    return newTopic;
  };

  // Update existing topic
  const updateTopic = (id, updatedFields) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...updatedFields,
            imageUrl: updatedFields.imageUrl?.trim() || t.imageUrl || FALLBACK_IMAGE
          };
        }
        return t;
      })
    );
  };

  // Delete topic
  const deleteTopic = (id) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  // Get single topic
  const getTopic = (id) => {
    return topics.find((t) => t.id === id) || null;
  };

  // Filter published only for public facing views
  const publishedTopics = topics.filter((t) => t.status === 'Publicado');

  // Related topics for detail view
  const getRelatedTopics = (currentTopicId, category) => {
    const fromSameCategory = publishedTopics.filter(
      (t) => t.id !== currentTopicId && t.category === category
    );
    if (fromSameCategory.length >= 2) {
      return fromSameCategory.slice(0, 2);
    }
    const others = publishedTopics.filter(
      (t) => t.id !== currentTopicId && t.category !== category
    );
    return [...fromSameCategory, ...others].slice(0, 2);
  };

  // Metrics for CMS dashboard (wireframe page 3: Total publicados, Borradores, Categorías)
  const stats = {
    totalPublished: publishedTopics.length,
    totalDrafts: topics.filter((t) => t.status === 'Borrador').length,
    totalCategories: categories.filter((c) => c !== 'Todas').length
  };

  return (
    <ContentContext.Provider
      value={{
        topics,
        publishedTopics,
        categories,
        stats,
        addTopic,
        updateTopic,
        deleteTopic,
        getTopic,
        getRelatedTopics
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
