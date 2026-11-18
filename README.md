# 🎓 Portal Educativo & Sistema CMS (React + Vite)

Sistema CMS y portal educativo desarrollado en **React** para el taller integrador, diseñado e implementado fielmente a partir del prototipo en wireframe (`My First Board (3).pdf`). Incluye decoración visual moderna, paleta de colores armónica, tipografía clara, imágenes educativas de alta resolución y un sistema de autenticación y registro de usuarios con persistencia en JavaScript (`localStorage`).

---

## 📸 Vistas Implementadas (Fieles al Wireframe)

### 1. 🏠 Página Principal / Inicio (`HomeView.jsx` - Wireframe Página 6)
- **Barra de navegación**: Logo, enlaces (*Inicio*, *Temas / Blog*, *Sobre nosotros*) y botón directo de acción (*Iniciar Sesión* o *Panel CMS*).
- **Hero Section**:
  - Título principal: *"Aprende, explora y crece con el portal educativo del colegio"*.
  - Subtítulo descriptivo y botón de llamada a la acción: *"Explorar Temas"*.
  - Imagen hero destacada en alta resolución.
- **Sección Temas Destacados**:
  - Cuadrícula con 3 tarjetas destacadas que incluyen portada, pill de categoría, título, extracto descriptivo, fecha y botón *"Leer más"*.
- **Sección Nuestra Misión Educativa**:
  - Descripción institucional y 3 pilares con iconos circulares:
    1. *Excelencia académica*
    2. *Formación en valores*
    3. *Innovación y tecnología*
- **Footer Institucional**:
  - Datos de contacto (*Dirección*, *Teléfono*, *Correo*).
  - Enlaces rápidos (*Inicio • Temas / Blog • Sobre nosotros*).
  - Copyright: *© 2026 Colegio. Todos los derechos reservados.*

---

### 2. 📚 Catálogo de Temas / Blog (`CatalogView.jsx` - Wireframe Página 2)
- **Buscador interactivo**: Input *"Buscar por palabra clave..."* con botón *"Buscar"* y filtrado reactivo en tiempo real por título, contenido, autor o categoría.
- **Pills de categorías**: Botones con filtro activo por *Todas*, *Matemáticas*, *Ciencias*, *Historia*, *Tecnología*, *Lenguaje*.
- **Grid de temas**: Tarjetas con imagen de portada, badge de color según la materia, título, fecha y botón *"Leer más"*.
- **Paginación funcional**: Controles de navegación `<` `[ 1 ]` `[ 2 ]` `[ 3 ]` `>` para explorar el catálogo.

---

### 3. 📖 Detalle del Tema (`TopicDetailView.jsx` - Wireframe Página 1)
- **Botón de retorno**: *"← Volver a temas"*.
- **Cabecera**: Título en una o dos líneas, badge de categoría, fecha de publicación (*"Publicado: 12 mar 2026"*) y autor (*"Autor: Prof. Carlos Mendoza"*).
- **Imagen principal destacada**: Portada en alta definición con esquinas redondeadas.
- **Contenido estructurado**:
  - *Subtítulo 1* y párrafos explicativos.
  - *Subtítulo 2* y listas de conceptos/pasos clave.
- **Caja de recurso educativo**:
  - *"Recursos: archivo descargable o enlace externo"* interactivo con icono de descarga y enlace.
- **Temas relacionados**:
  - 2 tarjetas sugeridas con imagen, categoría, título y botón *"Leer más"*.

---

### 4. 🔐 Acceso al Panel de Control & Registro (`LoginView.jsx` - Wireframe Página 4)
- **Modal centrado con logo institucional**:
  - Título: *"Acceso al Panel de Control"*.
  - Pestañas dinámicas: **Iniciar Sesión** y **Registrarse (JS)**.
  - Alerta de error: *"Credenciales incorrectas (alerta de error)"* cuando los datos no coinciden.
  - Campos: Correo electrónico (`correo@colegio.edu`) y Contraseña con botón alternador **Ver / Ocultar**.
  - Casilla de verificación: **Recordar sesión** (`localStorage` / `sessionStorage`).
  - Botón: **Ingresar**.
  - **Registro de usuarios con JavaScript**:
    - Permite dar de alta nuevos usuarios ingresando Nombre, Correo, Rol (*Docente*, *Administrador*, *Estudiante*) y Contraseña.
    - Los usuarios se registran y persisten con JS en `localStorage` bajo la clave `edu_cms_users`.
  - Credenciales rápidas preconfiguradas para pruebas con un solo clic.
  - Enlace: *"← Volver a la página principal"*.

---

### 5. ⚙️ Dashboard del CMS (`CmsDashboardView.jsx` - Wireframe Página 3)
- **Barra lateral (Sidebar)**:
  - Identificador con avatar, nombre del administrador y rol.
  - Navegación: *Todos los Temas*, *Crear Nuevo Tema*, *Ver Sitio Público*.
  - Botón inferior destacado: **Cerrar Sesión** en color rojo.
- **Encabezado superior**: Título *"Gestión de contenido"* y botón **+ Nuevo Tema**.
- **Tarjetas de métricas (KPIs)**:
  - *Total de temas publicados* (con conteo reactivo).
  - *Borradores guardados* (con conteo reactivo).
  - *Categorías activas* (con conteo reactivo).
- **Tabla de gestión de temas**:
  - Columnas: *Título del tema*, *Categoría*, *Estado*, *Fecha*, *Acciones*.
  - Pills de estado: **Publicado** (verde suave) y **Borrador** (amarillo suave).
  - Botones de acción: **Editar** (azul suave) y **Eliminar** (rojo suave con modal de confirmación).

---

### 6. ✍️ Crear / Editar Tema (`CmsEditorView.jsx` - Wireframe Página 5)
- **Encabezado**: Título *"Crear / Editar Tema"* y botones de acción superior:
  - *Cancelar*
  - *Guardar Borrador* (asigna estado "Borrador")
  - *Publicar Tema* (asigna estado "Publicado")
- **Campos del formulario**:
  - *Título del tema*.
  - *Categoría / Materia* (selector con aviso: *"La previsualización se actualiza al pegar la URL de la imagen"*).
  - *URL de imagen de portada* + botones de imágenes educativas sugeridas.
  - *Previsualización de portada* en tiempo real.
  - *Contenido del tema* con **Rich Toolbar** que incluye botones funcionales:
    `[ B ]` `[ I ]` `[ • Lista ]` `[ 1. Lista ]` `[ Subtítulo H2 ]` `[ Subtítulo H3 ]`.
  - Campos para Subtítulo 1, Subtítulo 2 y recursos descargables.

---

### 7. ℹ️ Vista Sobre Nosotros (`AboutView.jsx`)
- Filosofía pedagógica, innovación educativa y acompañamiento estudiantil.
- Presentación del equipo docente con fotografías, especialidades y biografías.
- Llamado a la acción para explorar los contenidos.

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **React 19** (Componentes funcionales, Hooks: `useState`, `useEffect`, `useContext`, `useMemo`, `useRef`).
- **Vite 8** (Bundler ultrarrápido con HMR y soporte ES Modules).
- **Lucide React** (Iconografía limpia y moderna).
- **Context API**:
  - `AuthContext`: Autenticación, registro de nuevos usuarios, persistencia en `localStorage` y control de acceso.
  - `ContentContext`: CRUD completo de temas, filtrado de publicados/borradores, cálculo de estadísticas y categorías.
- **CSS3 Moderno**: Variables CSS para colores semánticos, diseño responsive (Grid y Flexbox), animaciones suaves y tipografía *Plus Jakarta Sans* / *Inter*.

---

## 🚀 Cómo Ejecutar el Proyecto

1. Abrir una terminal en la carpeta del proyecto:
   ```bash
   cd Taller-React
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en tu navegador la URL indicada (usualmente `http://localhost:5173`).

4. Para compilar la versión optimizada de producción:
   ```bash
   npm run build
   ```

---

## 🔑 Cuentas de Acceso de Prueba

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@colegio.edu` | `password123` |
| **Docente** | `docente@colegio.edu` | `password123` |
| **Estudiante** | `estudiante@colegio.edu` | `password123` |

*También puedes hacer clic en la pestaña **Registrarse (JS)** en la pantalla de inicio de sesión para crear cualquier usuario nuevo, el cual quedará automáticamente almacenado en tu navegador.*
