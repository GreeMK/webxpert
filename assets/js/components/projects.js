/**
 * Componente de Proyectos Reutilizable
 * Autor: Julio Alberto Pintos
 */

class ProjectsSection {
    constructor(containerId, projectsData) {
        this.containerId = containerId;
        this.projectsData = projectsData || this.getDefaultProjects();
        this.init();
    }

    getDefaultProjects() {
        return [
            {
                id: 'ecommerce',
                title: 'E-commerce Premium',
                description: 'Tienda online completa con pasarelas de pago, gestión de inventario y panel administrativo personalizado.',
                status: 'desarrollo',
                progress: 75,
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
            },
            {
                id: 'erp',
                title: 'Sistema de Gestión ERP',
                description: 'Plataforma integral para gestión empresarial con módulos de recursos humanos, contabilidad y logística.',
                status: 'planeacion',
                progress: 25,
                technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
                icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 12H4v-4h11v4zm0-5H4V9h11v2zm5 5h-4V9h4v7z'
            },
            {
                id: 'delivery',
                title: 'App de Delivery',
                description: 'Aplicación móvil para delivery de alimentos con geolocalización, tracking en tiempo real y sistema de pagos.',
                status: 'finalizado',
                progress: 100,
                technologies: ['React Native', 'Firebase', 'Google Maps API', 'Redux'],
                icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
            }
        ];
    }

    init() {
        this.render();
        this.setupAnimations();
    }

    getStatusText(status) {
        const statusMap = {
            'desarrollo': 'En Desarrollo',
            'planeacion': 'En Planeación',
            'finalizado': 'Finalizado'
        };
        return statusMap[status] || status;
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container con ID "${this.containerId}" no encontrado`);
            return;
        }

        container.innerHTML = `
            <section class="proyectos" id="proyectos">
                <h2>Proyectos en Desarrollo</h2>
                <p class="proyectos-intro">Descubre cómo llevamos las ideas a la realidad digital</p>
                <div class="proyectos-grid">
                    ${this.projectsData.map(project => this.renderProjectCard(project)).join('')}
                </div>
            </section>
        `;
    }

    renderProjectCard(project) {
        return `
            <div class="proyecto-card" data-project-id="${project.id}">
                <div class="proyecto-header">
                    <div class="proyecto-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="${project.icon}"/>
                        </svg>
                    </div>
                    <div class="proyecto-status ${project.status}">${this.getStatusText(project.status)}</div>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tecnologias">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="proyecto-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <span class="progress-text">${project.progress}% Completado</span>
                </div>
            </div>
        `;
    }

    setupAnimations() {
        // Las animaciones se manejan a través del archivo animations.js
        // Aquí puedes agregar animaciones específicas si es necesario
    }

    // Método para agregar un nuevo proyecto dinámicamente
    addProject(projectData) {
        this.projectsData.push(projectData);
        this.render();
    }

    // Método para actualizar el progreso de un proyecto
    updateProgress(projectId, newProgress) {
        const project = this.projectsData.find(p => p.id === projectId);
        if (project) {
            project.progress = newProgress;
            // Actualizar solo la barra de progreso específica
            const progressFill = document.querySelector(`[data-project-id="${projectId}"] .progress-fill`);
            const progressText = document.querySelector(`[data-project-id="${projectId}"] .progress-text`);
            
            if (progressFill && progressText) {
                progressFill.style.width = `${newProgress}%`;
                progressText.textContent = `${newProgress}% Completado`;
            }
        }
    }
}

// Función global para inicializar la sección de proyectos desde cualquier página
window.initProjectsSection = function(containerId, projectsData) {
    return new ProjectsSection(containerId, projectsData);
};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsSection };
}
