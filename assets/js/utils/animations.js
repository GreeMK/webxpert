/**
 * Animaciones y funcionalidades interactivas para webXpert
 * Autor: Julio Alberto Pintos
 */

// Configuración de animaciones
const ANIMATION_CONFIG = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    duration: 600
};

// Clase para manejar animaciones de entrada
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupObserver();
        this.observeElements();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, ANIMATION_CONFIG);
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.item, .proyecto-card, .testimonio');
        animatedElements.forEach(el => {
            this.setInitialState(el);
            this.observer.observe(el);
        });
    }

    setInitialState(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity ${ANIMATION_CONFIG.duration}ms ease, transform ${ANIMATION_CONFIG.duration}ms ease`;
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// Clase para navegación mejorada
class SmoothNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupKeyboardNavigation();
    }

    setupSmoothScroll() {
        // Scroll suave para navegación interna
        window.scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Clase para microinteracciones
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupButtonEffects();
        this.setupCardHoverEffects();
        this.setupProgressBars();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn-diseño');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createRippleEffect(button);
            });
        });
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.item, .proyecto-card, .testimonio');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardGlow(card);
            });
        });
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            this.animateProgressBar(bar);
        });
    }

    createRippleEffect(button) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addCardGlow(card) {
        card.style.boxShadow = '0 16px 48px rgba(78, 35, 252, 0.3)';
        card.style.transform = 'translateY(-8px) scale(1.02)';
    }

    removeCardGlow(card) {
        card.style.boxShadow = '';
        card.style.transform = '';
    }

    animateProgressBar(bar) {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 100);
    }
}

// Clase para accesibilidad
class Accessibility {
    constructor() {
        this.init();
    }

    init() {
        this.setupSkipLinks();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.classList.add('skip-link');
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        document.body.insertBefore(skipLink, document.body.firstChild);

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
    }

    setupFocusManagement() {
        // Mejorar focus para modales y overlays
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Log para debugging
                console.log('Keyboard navigation detected');
            }
        });
    }

    setupAriaLabels() {
        // Agregar aria-labels dinámicamente donde sea necesario
        const buttons = document.querySelectorAll('.btn-diseño');
        buttons.forEach((button, index) => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                button.setAttribute('aria-label', text);
            }
        });
    }
}

// Clase principal que coordina todas las funcionalidades
class WebXpertApp {
    constructor() {
        this.scrollAnimations = null;
        this.smoothNavigation = null;
        this.microInteractions = null;
        this.accessibility = null;
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.startApp();
            });
        } else {
            this.startApp();
        }
    }

    startApp() {
        console.log('🚀 Iniciando webXpert App...');
        
        try {
            this.scrollAnimations = new ScrollAnimations();
            this.smoothNavigation = new SmoothNavigation();
            this.microInteractions = new MicroInteractions();
            this.accessibility = new Accessibility();
            
            console.log('✅ webXpert App inicializada correctamente');
        } catch (error) {
            console.error('❌ Error al inicializar webXpert App:', error);
        }
    }
}

// Inicializar la aplicación cuando se carga el script
const webXpertApp = new WebXpertApp();

// Exportar para uso en otros archivos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WebXpertApp };
}
