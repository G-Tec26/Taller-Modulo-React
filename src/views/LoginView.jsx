import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertCircle, CheckCircle2, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginView({ onNavigate, onLoginSuccess }) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  // Login fields
  const [email, setEmail] = useState('admin@colegio.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('Docente');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Alerts
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.');
      return;
    }

    const result = login(email, password, rememberMe);
    if (result.success) {
      onLoginSuccess();
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMessage('Por favor completa todos los campos para el registro.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Inténtalo nuevamente.');
      return;
    }

    const result = register({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole
    });

    if (result.success) {
      setSuccessMessage('¡Usuario registrado con éxito en el sistema!');
      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    } else {
      setErrorMessage(result.error);
    }
  };

  // Quick fill helper for teacher / evaluation
  const setQuickUser = (mail, pass) => {
    setEmail(mail);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="login-view-wrapper">
      <div className="login-card">
        {/* Logo box matching wireframe */}
        <div className="login-logo-box">
          <span>Logo</span>
        </div>

        {/* Title matching wireframe */}
        <h2 className="login-title">Acceso al Panel de Control</h2>

        {/* Tab switcher: Iniciar Sesión / Registrarse */}
        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`login-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
          >
            Registrarse (JS)
          </button>
        </div>

        {/* Error Alert Box matching wireframe: Credenciales incorrectas (alerta de error) */}
        {errorMessage && (
          <div className="alert-error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="alert-success">
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                placeholder="correo@colegio.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="btn-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>

            {/* Checkbox matching wireframe: Recordar sesión */}
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="rememberMeCheckbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMeCheckbox" style={{ cursor: 'pointer' }}>
                Recordar sesión
              </label>
            </div>

            {/* Submit button matching wireframe: Ingresar */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
            >
              <LogIn size={18} />
              <span>Ingresar</span>
            </button>

            {/* Quick Demo Credentials */}
            <div className="quick-credentials-box">
              <p style={{ fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                Credenciales de prueba rápida:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setQuickUser('admin@colegio.edu', 'password123')}
                >
                  Admin: admin@colegio.edu
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setQuickUser('docente@colegio.edu', 'password123')}
                >
                  Docente: docente@colegio.edu
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* REGISTRATION FORM (Guarda usuarios en JS / LocalStorage) */
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                placeholder="Prof. Juan Pérez"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Correo institucional</label>
              <input
                type="email"
                placeholder="juan.perez@colegio.edu"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rol en la institución</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
              >
                <option value="Docente">Docente</option>
                <option value="Administrador">Administrador</option>
                <option value="Estudiante">Estudiante</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              <UserPlus size={18} />
              <span>Registrar y Guardar Usuario</span>
            </button>
          </form>
        )}

        {/* Back Link matching wireframe: ← Volver a la página principal */}
        <div>
          <button
            type="button"
            className="btn-back-home"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft size={16} />
            <span>Volver a la página principal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
