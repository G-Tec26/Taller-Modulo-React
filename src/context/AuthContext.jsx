import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/initialUsers';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load registered users from localStorage with JS
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('edu_cms_users');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading users from localStorage:', e);
    }
    return INITIAL_USERS;
  });

  // Load current session from localStorage or sessionStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const localSession = localStorage.getItem('edu_cms_session');
      if (localSession) return JSON.parse(localSession);
      const sessionSession = sessionStorage.getItem('edu_cms_session');
      if (sessionSession) return JSON.parse(sessionSession);
    } catch (e) {
      console.error('Error reading session:', e);
    }
    return null;
  });

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edu_cms_users', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage:', e);
    }
  }, [users]);

  // Login handler
  const login = (email, password, rememberMe = true) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!found) {
      return {
        success: false,
        error: 'Credenciales incorrectas (alerta de error)'
      };
    }

    const sessionData = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      avatar: found.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    setCurrentUser(sessionData);

    try {
      if (rememberMe) {
        localStorage.setItem('edu_cms_session', JSON.stringify(sessionData));
        sessionStorage.removeItem('edu_cms_session');
      } else {
        sessionStorage.setItem('edu_cms_session', JSON.stringify(sessionData));
        localStorage.removeItem('edu_cms_session');
      }
    } catch (e) {
      console.error('Error writing session:', e);
    }

    return { success: true, user: sessionData };
  };

  // Register handler - JavaScript persistence in localStorage
  const register = ({ name, email, password, role = 'Docente' }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, error: 'Por favor completa todos los campos requeridos.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'La contraseña debe contener al menos 6 caracteres.' };
    }

    const emailExists = users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (emailExists) {
      return { success: false, error: 'El correo electrónico ya se encuentra registrado.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      role: role,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Auto login registered user
    const sessionData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    };

    setCurrentUser(sessionData);
    localStorage.setItem('edu_cms_session', JSON.stringify(sessionData));

    return { success: true, user: sessionData };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('edu_cms_session');
      sessionStorage.removeItem('edu_cms_session');
    } catch (e) {
      console.error('Error removing session:', e);
    }
  };

  const isAuthenticated = Boolean(currentUser);
  const isAdminOrTeacher = currentUser && (currentUser.role === 'Administrador' || currentUser.role === 'Docente');

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuthenticated,
        isAdminOrTeacher,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
