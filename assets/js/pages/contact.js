// =============================
// Validación de Formulario de Contacto
// =============================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contacto-form');
    const submitBtn = document.querySelector('.btn-enviar');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    // Manejo del envío del formulario
    form.addEventListener('submit', handleSubmit);

    // Función para validar un campo específico
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + '-error');

        // Limpiar error previo
        clearFieldError(field);

        // Validaciones específicas por campo
        switch(fieldName) {
            case 'nombre':
                if (value.length < 2) {
                    showFieldError(field, 'El nombre debe tener al menos 2 caracteres');
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    showFieldError(field, 'El nombre solo puede contener letras');
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Ingresa un email válido');
                }
                break;

            case 'telefono':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    showFieldError(field, 'Ingresa un teléfono válido');
                }
                break;

            case 'servicio':
                if (!value) {
                    showFieldError(field, 'Selecciona un servicio');
                }
                break;

            case 'mensaje':
                if (value.length < 10) {
                    showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
                } else if (value.length > 1000) {
                    showFieldError(field, 'El mensaje no puede exceder 1000 caracteres');
                }
                break;

            case 'privacidad':
                if (!field.checked) {
                    showFieldError(field, 'Debes aceptar la política de privacidad');
                }
                break;
        }
    }

    // Función para mostrar error en un campo
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Función para limpiar error de un campo
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Función para limpiar error al escribir
    function clearError(e) {
        const field = e.target;
        if (field.classList.contains('error')) {
            clearFieldError(field);
        }
    }

    // Función para validar todo el formulario
    function validateForm() {
        let isValid = true;
        
        // Validar todos los campos requeridos
        inputs.forEach(input => {
            if (input.hasAttribute('required')) {
                const event = { target: input };
                validateField(event);
                if (input.classList.contains('error')) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // Función para manejar el envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();

        // Validar formulario
        if (!validateForm()) {
            showMessage('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        // Mostrar estado de carga
        setLoadingState(true);

        try {
            // Simular envío (reemplazar con tu endpoint real)
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Aquí puedes usar fetch para enviar a tu servidor
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });

            // Simulación de respuesta exitosa
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar mensaje de éxito
            showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            form.reset();
            
            // Tracking de Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'contact_form_success'
                });
            }

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showMessage('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            
            // Tracking de error
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_error', {
                    'event_category': 'engagement',
                    'event_label': 'contact_form_error'
                });
            }
        } finally {
            setLoadingState(false);
        }
    }

    // Función para mostrar mensajes
    function showMessage(message, type) {
        // Remover mensajes previos
        const existingMessages = document.querySelectorAll('.mensaje-exito, .mensaje-error');
        existingMessages.forEach(msg => msg.remove());

        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'mensaje-exito' : 'mensaje-error';
        if (type === 'success') {
            messageDiv.innerHTML = `<svg width='18' height='18' viewBox='0 0 24 24' fill='none' style='vertical-align:middle;margin-right:0.5em;'><circle cx='12' cy='12' r='12' fill='#27ae60'/><path d='M7 13l3 3 7-7' stroke='#fff' stroke-width='2' fill='none'/></svg>` + message;
        } else {
            messageDiv.innerHTML = `<svg width='18' height='18' viewBox='0 0 24 24' fill='none' style='vertical-align:middle;margin-right:0.5em;'><circle cx='12' cy='12' r='12' fill='#e74c3c'/><path d='M8 8l8 8M16 8l-8 8' stroke='#fff' stroke-width='2' fill='none'/></svg>` + message;
        }

        // Insertar antes del formulario
        const formContainer = document.querySelector('.formulario-container');
        formContainer.insertBefore(messageDiv, formContainer.firstChild);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Función para manejar estado de carga
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    }

    // Validación de caracteres especiales en tiempo real
    const nombreInput = document.getElementById('nombre');
    if (nombreInput) {
        nombreInput.addEventListener('input', function(e) {
            // Permitir solo letras, espacios y caracteres acentuados
            this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        });
    }

    // Validación de email en tiempo real
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            // Limpiar espacios al inicio y final
            this.value = this.value.trim();
        });
    }

    // Contador de caracteres para el mensaje
    const mensajeTextarea = document.getElementById('mensaje');
    if (mensajeTextarea) {
        mensajeTextarea.addEventListener('input', function(e) {
            const maxLength = 1000;
            const currentLength = this.value.length;
            
            // Crear o actualizar contador
            let counter = document.getElementById('mensaje-counter');
            if (!counter) {
                counter = document.createElement('div');
                counter.id = 'mensaje-counter';
                counter.style.fontSize = '0.8rem';
                counter.style.color = '#666';
                counter.style.textAlign = 'right';
                counter.style.marginTop = '5px';
                this.parentNode.appendChild(counter);
            }
            
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Cambiar color si se excede
            if (currentLength > maxLength) {
                counter.style.color = '#e74c3c';
            } else {
                counter.style.color = '#666';
            }
        });
    }
}); 