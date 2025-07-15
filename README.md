# 🚀 webXpert - Sitio Web Profesional

**Sitio web corporativo para servicios de diseño web, SEO, marketing digital y administración de bases de datos.**

## 📋 Descripción

webXpert es una agencia digital que ofrece servicios profesionales de:
- 🎨 **Diseño Web** - Sitios web modernos y responsivos
- 🔍 **SEO** - Optimización para motores de búsqueda
- 📱 **Redes Sociales** - Gestión de presencia en redes sociales
- 🗄️ **Administración de Bases de Datos** - Auditoría, mantenimiento y backup
- 🔧 **Auditoría Web** - Análisis y optimización de sitios web

## 🏗️ Estructura del Proyecto

```
webXpert/
├── 📄 index.html                    # Página principal
├── 📁 pages/                        # Todas las páginas HTML
│   ├── 📄 contacto.html             # Página de contacto
│   ├── 📄 nosotros.html             # Página "Quiénes Somos"
│   ├── 📁 legal/                    # Páginas legales
│   │   ├── 📄 privacidad.html       # Política de privacidad
│   │   └── 📄 terminos.html         # Términos de servicio
│   └── 📁 servicios/                # Páginas de servicios
│       ├── 📄 diseno-web.html       # Servicio de diseño web
│       ├── 📄 seo.html              # Servicio de SEO
│       ├── 📄 social-media.html     # Servicio de redes sociales
│       └── 📄 database-admin.html   # Servicio de BD
├── 📁 assets/                       # Recursos estáticos
│   ├── 📁 css/                      # Hojas de estilo
│   │   ├── 📁 base/                 # Estilos base
│   │   │   └── 📄 variables.css     # Variables CSS
│   │   ├── 📁 components/           # Componentes reutilizables
│   │   ├── 📁 layouts/              # Layouts y estructura
│   │   └── 📁 pages/                # Estilos específicos por página
│   │       ├── 📄 home.css          # Estilos página principal
│   │       ├── 📄 contact.css       # Estilos página contacto
│   │       ├── 📄 about.css         # Estilos página nosotros
│   │       ├── 📄 legal.css         # Estilos páginas legales
│   │       ├── 📄 services.css      # Estilos páginas servicios
│   │       ├── 📄 seo.css           # Estilos página SEO
│   │       └── 📄 social.css        # Estilos página redes sociales
│   ├── 📁 js/                       # Scripts JavaScript
│   │   ├── 📁 utils/                # Utilidades y helpers
│   │   ├── 📁 components/           # Componentes JS
│   │   │   └── 📄 modal.js          # Componente modal
│   │   └── 📁 pages/                # Scripts específicos por página
│   │       └── 📄 contact.js        # Validación formulario contacto
│   └── 📁 images/                   # Imágenes y recursos gráficos
│       ├── 📁 logos/                # Logos de la empresa
│       ├── 📁 icons/                # Iconos y elementos gráficos
│       ├── 📁 backgrounds/          # Imágenes de fondo
│       └── 📁 services/             # Imágenes relacionadas con servicios
├── 📁 config/                       # Archivos de configuración
│   ├── 📄 manifest.json             # Manifest para PWA
│   ├── 📄 robots.txt                # Configuración para crawlers
│   ├── 📄 sitemap.xml               # Sitemap para SEO
│   └── 📄 sw.js                     # Service Worker
└── 📄 README.md                     # Documentación del proyecto
```

## 🚀 Características

### ✅ **SEO Optimizado**
- Meta tags completos para todas las páginas
- Open Graph y Twitter Cards
- Sitemap.xml y robots.txt
- Estructura semántica HTML
- URLs amigables

### ✅ **PWA (Progressive Web App)**
- Service Worker para cache inteligente
- Manifest.json configurado
- Funcionalidad offline básica
- Instalable como app nativa

### ✅ **Formulario de Contacto Profesional**
- Validación en tiempo real
- Feedback visual y mensajes de error/éxito
- Integración con Google Analytics
- Campos para presupuesto y tipo de servicio

### ✅ **Diseño Responsive**
- Adaptable a todos los dispositivos
- Breakpoints optimizados
- Experiencia consistente

### ✅ **Performance Optimizado**
- Preload de recursos críticos
- Service Worker para cache
- Optimización de imágenes
- Carga rápida

### ✅ **Accesibilidad**
- Navegación por teclado
- Focus styles
- Estructura semántica
- Screen reader friendly

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript (ES6+)** - Interactividad
- **Service Worker** - Funcionalidad offline
- **PWA** - Progressive Web App
- **Google Analytics** - Tracking y analytics

## 📱 Servicios Ofrecidos

### 🎨 **Diseño Web**
- Landing Pages optimizadas para conversión
- Sitios corporativos profesionales
- Tiendas online (e-commerce)
- Aplicaciones web personalizadas

### 🔍 **SEO (Search Engine Optimization)**
- Auditoría SEO completa
- Optimización on-page y off-page
- Investigación de palabras clave
- Monitoreo de rankings

### 📱 **Gestión de Redes Sociales**
- Estrategias de contenido
- Gestión de comunidades
- Publicidad en redes sociales
- Análisis de métricas

### 🗄️ **Administración de Bases de Datos**
- Auditoría de rendimiento
- Mantenimiento preventivo
- Backup y recuperación
- Migración y actualización

## 🚀 Instalación y Uso

### **Requisitos**
- Navegador web moderno
- Servidor web (para desarrollo local)

### **Instalación Local**
1. Clona el repositorio:
```bash
git clone https://github.com/japintos/webxpert.git
cd webxpert
```

2. Abre el archivo `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

3. Visita `http://localhost:8000` en tu navegador

## 📊 Analytics y Tracking

El sitio incluye Google Analytics para:
- Tracking de visitantes
- Análisis de comportamiento
- Medición de conversiones
- Eventos personalizados

**Nota:** Reemplaza `GA_MEASUREMENT_ID` con tu ID real de Google Analytics.

## 🔧 Configuración

### **Google Analytics**
1. Crea una cuenta en [Google Analytics](https://analytics.google.com/)
2. Obtén tu ID de medición
3. Reemplaza `GA_MEASUREMENT_ID` en todos los archivos HTML

### **Formulario de Contacto**
1. Configura [Formspree](https://formspree.io/) o tu propio backend
2. Actualiza la URL del formulario en `pages/contacto.html`

### **Service Worker**
- El Service Worker está configurado para cachear recursos estáticos
- Se actualiza automáticamente cuando cambias la versión en `CACHE_NAME`

## 📈 SEO y Marketing

### **Meta Tags Optimizados**
- Títulos únicos y descriptivos
- Descripciones atractivas
- Palabras clave relevantes
- Open Graph para redes sociales

### **Sitemap y Robots**
- Sitemap.xml actualizado automáticamente
- Robots.txt configurado para SEO
- URLs amigables y estructuradas

## 🔒 Seguridad y Privacidad

- Política de privacidad completa
- Términos de servicio detallados
- Cumplimiento GDPR básico
- Validación de formularios robusta

## 📞 Contacto

- **Email:** julioapintos1@gmail.com
- **Teléfono:** +54 9 3764724207
- **Ubicación:** Posadas, Misiones, Argentina

## 📄 Licencia

Este proyecto es propiedad de webXpert. Todos los derechos reservados.

## 🤝 Contribuciones

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Changelog

### v1.0.0 (2025-01-27)
- ✅ Reorganización completa del proyecto
- ✅ Implementación de PWA
- ✅ Formulario de contacto profesional
- ✅ SEO optimizado
- ✅ Páginas legales completas
- ✅ Nuevo servicio de administración de BD
- ✅ Estructura de carpetas profesional

---

**Desarrollado con ❤️ por webXpert**

## Archivos de configuración

Asegúrate de que los siguientes archivos estén en la raíz del proyecto para un funcionamiento óptimo:

- `sitemap.xml`
- `robots.txt`
- `sw.js`
- `manifest.json`

## Accesibilidad
- Todas las imágenes deben tener atributos `alt` descriptivos.
- Los colores deben cumplir con los estándares de contraste WCAG.

## SEO
- Cada página debe tener etiquetas `<title>` y `<meta name="description">` únicas y descriptivas.
- Agrega etiquetas Open Graph si es posible.

## Cookies y RGPD
- Si usas Google Analytics o cookies, incluye un aviso de cookies y solicita consentimiento al usuario. 