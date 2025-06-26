// =============================
// Service Worker para webXpert PWA
// =============================

const CACHE_NAME = 'webxpert-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/pages/contacto.html',
    '/pages/nosotros.html',
    '/pages/legal/privacidad.html',
    '/pages/legal/terminos.html',
    '/pages/servicios/diseno-web.html',
    '/pages/servicios/seo.html',
    '/pages/servicios/social-media.html',
    '/pages/servicios/database-admin.html',
    '/assets/css/base/variables.css',
    '/assets/css/pages/home.css',
    '/assets/css/pages/contact.css',
    '/assets/css/pages/about.css',
    '/assets/css/pages/legal.css',
    '/assets/css/pages/services.css',
    '/assets/css/pages/seo.css',
    '/assets/css/pages/social.css',
    '/assets/js/components/modal.js',
    '/assets/js/pages/contact.js',
    '/assets/images/logos/logo_solito.jpg',
    '/assets/images/logos/logo_grafico.jpg',
    '/assets/images/backgrounds/web services.avif'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache abierto');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Recursos cacheados');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error al cachear recursos', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando cache antiguo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activado');
            return self.clients.claim();
        })
    );
});

// Interceptación de peticiones
self.addEventListener('fetch', event => {
    // Solo manejar peticiones GET
    if (event.request.method !== 'GET') {
        return;
    }

    // Excluir peticiones a APIs externas
    if (event.request.url.includes('google-analytics') || 
        event.request.url.includes('formspree') ||
        event.request.url.includes('fontawesome')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en cache, devolverlo
                if (response) {
                    console.log('Service Worker: Sirviendo desde cache', event.request.url);
                    return response;
                }

                // Si no está en cache, hacer fetch y cachear
                return fetch(event.request)
                    .then(response => {
                        // Verificar que la respuesta sea válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar la respuesta para cachearla
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                                console.log('Service Worker: Nuevo recurso cacheado', event.request.url);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.error('Service Worker: Error en fetch', error);
                        
                        // Para páginas HTML, devolver página offline
                        if (event.request.destination === 'document') {
                            return caches.match('/offline.html');
                        }
                        
                        // Para otros recursos, devolver respuesta vacía
                        return new Response('', {
                            status: 408,
                            statusText: 'Request timeout'
                        });
                    });
            })
    );
});

// Manejo de mensajes del cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Manejo de push notifications (futuro)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/logos/logo_solito.jpg',
            badge: '/assets/images/logos/logo_solito.jpg',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver más',
                    icon: '/assets/images/logos/logo_solito.jpg'
                },
                {
                    action: 'close',
                    title: 'Cerrar',
                    icon: '/assets/images/logos/logo_solito.jpg'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 