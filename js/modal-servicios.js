// =============================
// Modal de Servicios webXpert
// =============================

// Diccionario con la información de cada servicio
const serviciosInfo = {
    responsivo: {
        titulo: 'Diseño Responsivo',
        descripcion: 'Tu web se adapta perfectamente a cualquier dispositivo (móvil, tablet, PC), garantizando una experiencia óptima y profesional para todos tus visitantes.'
    },
    uxui: {
        titulo: 'Optimización UX/UI',
        descripcion: 'Mejoramos la experiencia de usuario y la interfaz visual de tu sitio, haciendo que navegar sea intuitivo, atractivo y orientado a la conversión.'
    },
    estrategias: {
        titulo: 'Estrategias Digitales',
        descripcion: 'Desarrollamos planes personalizados para potenciar tu presencia online, aumentar tu alcance y conectar con tu público objetivo de manera efectiva.'
    },
    soporte: {
        titulo: 'Soporte Técnico',
        descripcion: 'Te acompañamos con asistencia técnica rápida y profesional, resolviendo problemas y manteniendo tu web siempre actualizada y segura.'
    }
};

// Selecciona todos los botones de servicio
const botones = document.querySelectorAll('.servicio-btn');
// Selecciona el modal y sus elementos internos
const modal = document.getElementById('modal-servicio');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalCerrar = document.querySelector('.modal-cerrar');

// Función para abrir el modal con la info correspondiente
function abrirModal(servicio) {
    // Cambia el contenido del modal según el servicio
    modalTitulo.textContent = serviciosInfo[servicio].titulo;
    modalDescripcion.textContent = serviciosInfo[servicio].descripcion;
    // Muestra el modal
    modal.style.display = 'flex';
    // Evita el scroll del fondo
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Asigna el evento click a cada botón de servicio
botones.forEach(btn => {
    btn.addEventListener('click', function() {
        const servicio = this.getAttribute('data-service');
        abrirModal(servicio);
    });
});

// Evento para cerrar el modal al hacer click en la X
modalCerrar.addEventListener('click', cerrarModal);
// Evento para cerrar el modal al hacer click fuera del contenido
modal.addEventListener('click', function(e) {
    if (e.target === modal) cerrarModal();
});
// Evento para cerrar el modal con la tecla ESC
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') cerrarModal();
}); 