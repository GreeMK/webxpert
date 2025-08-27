/**
 * ===== SECCIÓN DE PROYECTOS - FUNCIONALIDAD REUTILIZABLE =====
 * 
 * Este archivo maneja toda la funcionalidad de la sección de proyectos,
 * incluyendo animaciones, interacciones y carga dinámica de datos.
 * 
 * @author Julio Alberto Pintos - WebXpert
 * @version 1.0
 */

class ProjectsSectionManager {
    constructor() {
        this.container = null;
        this.projects = [];
        this.isInitialized = false;
        this.init();
    }

    /**
     * Inicializa la sección de proyectos
     */
    init() {
        this.container = document.querySelector('.proyectos-grid');
        if (!this.container) {
            console.warn('ProjectsSection: No se encontró el contenedor de proyectos');
            return;
        }

        this.setupEventListeners();
        this.setupAnimations();
        this.isInitialized = true;
        
        // Log de inicialización
        console.log('✅ ProjectsSection: Sección inicializada correctamente');
    }

    /**
     * Configura los event listeners para las tarjetas
     */
    setupEventListeners() {
        // Click en tarjetas de proyecto
        this.container.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.proyecto-card');
            if (projectCard) {
                this.handleProjectClick(projectCard);
            }
        });

        // Hover effects mejorados
        this.container.addEventListener('mouseenter', (e) => {
            const projectCard = e.target.closest('.proyecto-card');
            if (projectCard) {
                this.handleProjectHover(projectCard, 'enter');
            }
        });

        this.container.addEventListener('mouseleave', (e) => {
            const projectCard = e.target.closest('.proyecto-card');
            if (projectCard) {
                this.handleProjectHover(projectCard, 'leave');
            }
        });

        // Navegación por teclado
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectCard = e.target.closest('.proyecto-card');
                if (projectCard) {
                    this.handleProjectClick(projectCard);
                }
            }
        });
    }

    /**
     * Maneja el click en una tarjeta de proyecto
     */
    handleProjectClick(projectCard) {
        const projectId = projectCard.dataset.projectId;
        const projectName = projectCard.querySelector('h3').textContent;
        
        // Efecto de ripple
        this.createRippleEffect(projectCard, event);
        
        // Log del proyecto seleccionado
        console.log(`🎯 Proyecto seleccionado: ${projectName} (ID: ${projectId})`);
        
        // Aquí puedes agregar la lógica para mostrar más detalles
        // Por ejemplo, abrir un modal o navegar a una página específica
        this.showProjectDetails(projectId);
    }

    /**
     * Maneja los efectos hover en las tarjetas
     */
    handleProjectHover(projectCard, action) {
        const icon = projectCard.querySelector('.proyecto-icon');
        const progressFill = projectCard.querySelector('.progress-fill');
        
        if (action === 'enter') {
            // Animación de entrada
            projectCard.style.transform = 'translateY(-8px) scale(1.02)';
            if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
            if (progressFill) progressFill.style.transform = 'scaleX(1.05)';
        } else {
            // Animación de salida
            projectCard.style.transform = 'translateY(0) scale(1)';
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
            if (progressFill) progressFill.style.transform = 'scaleX(1)';
        }
    }

    /**
     * Crea efecto ripple en las tarjetas
     */
    createRippleEffect(projectCard, event) {
        const ripple = document.createElement('span');
        const rect = projectCard.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        projectCard.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Muestra detalles del proyecto (placeholder para futuras implementaciones)
     */
    showProjectDetails(projectId) {
        // Aquí puedes implementar la lógica para mostrar más detalles
        // Por ejemplo, abrir un modal con información extendida
        
        const projects = {
            ecommerce: {
                name: 'E-commerce Premium',
                description: 'Tienda online completa con pasarelas de pago, gestión de inventario y panel administrativo personalizado.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                progress: 75,
                features: ['Carrito de compras', 'Pasarela de pagos', 'Panel administrativo', 'Gestión de inventario']
            },
            erp: {
                name: 'Sistema de Gestión ERP',
                description: 'Plataforma integral para gestión empresarial con módulos de recursos humanos, contabilidad y logística.',
                technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
                progress: 25,
                features: ['Módulo RH', 'Contabilidad', 'Logística', 'Reportes']
            },
            delivery: {
                name: 'App de Delivery',
                description: 'Aplicación móvil para delivery de alimentos con geolocalización, tracking en tiempo real y sistema de pagos.',
                technologies: ['React Native', 'Firebase', 'Google Maps API', 'Redux'],
                progress: 100,
                features: ['Geolocalización', 'Tracking en tiempo real', 'Sistema de pagos', 'Notificaciones push']
            }
        };

        const project = projects[projectId];
        if (project) {
            console.log(`📋 Detalles del proyecto:`, project);
            // Aquí puedes agregar la lógica para mostrar un modal o navegar a una página
        }
    }

    /**
     * Configura las animaciones de entrada
     */
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observar todas las tarjetas de proyecto
        const projectCards = this.container.querySelectorAll('.proyecto-card');
        projectCards.forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Actualiza el progreso de un proyecto
     */
    updateProjectProgress(projectId, newProgress) {
        const projectCard = this.container.querySelector(`[data-project-id="${projectId}"]`);
        if (!projectCard) return;

        const progressFill = projectCard.querySelector('.progress-fill');
        const progressText = projectCard.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${newProgress}%`;
            progressText.textContent = `${newProgress}% Completado`;
            
            // Animación suave del progreso
            progressFill.style.transition = 'width 0.8s ease';
        }
    }

    /**
     * Agrega un nuevo proyecto dinámicamente
     */
    addProject(projectData) {
        if (!this.isInitialized) {
            console.warn('ProjectsSection: La sección no está inicializada');
            return;
        }

        const projectCard = this.createProjectCard(projectData);
        this.container.appendChild(projectCard);
        
        // Aplicar animación de entrada
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            projectCard.style.transition = 'all 0.6s ease';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, 100);
    }

    /**
     * Crea una tarjeta de proyecto desde datos
     */
    createProjectCard(projectData) {
        const card = document.createElement('div');
        card.className = 'proyecto-card';
        card.dataset.projectId = projectData.id;
        
        card.innerHTML = `
            <div class="proyecto-header">
                <div class="proyecto-icon">
                    ${projectData.icon || this.getDefaultIcon()}
                </div>
                <div class="proyecto-status ${projectData.status}">${projectData.statusText}</div>
            </div>
            <h3>${projectData.name}</h3>
            <p>${projectData.description}</p>
            <div class="tecnologias">
                ${projectData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="proyecto-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${projectData.progress}%"></div>
                </div>
                <span class="progress-text">${projectData.progress}% Completado</span>
            </div>
        `;
        
        return card;
    }

    /**
     * Retorna un icono SVG por defecto
     */
    getDefaultIcon() {
        return `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`;
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global
    window.projectsSection = new ProjectsSectionManager();
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsSectionManager;
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Función para actualizar el progreso de un proyecto desde el exterior
 */
window.updateProjectProgress = function(projectId, newProgress) {
    if (window.projectsSection) {
        window.projectsSection.updateProjectProgress(projectId, newProgress);
    }
};

/**
 * Función para agregar un nuevo proyecto desde el exterior
 */
window.addNewProject = function(projectData) {
    if (window.projectsSection) {
        window.projectsSection.addProject(projectData);
    }
};
