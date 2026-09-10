// ==========================================
// Service Worker - Gestionador de Mensajes
// Versión del caché
// ==========================================

const CACHE = "gestionador-v2";

// Archivos que se guardarán para usar sin Internet
const ARCHIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./LogoGDM.png",
    "./Contactos.html",
    "./formularios.html",
    "./css/estilos.css",
    "./Mensajes Pitch.html",
];

// ==========================================
// Instalación
// ==========================================

self.addEventListener("install", event => {

    console.log("Service Worker instalado.");

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE)

        .then(cache => {

            return cache.addAll(ARCHIVOS);

        })

    );

});

// ==========================================
// Activación
// Elimina cachés antiguas
// ==========================================

self.addEventListener("activate", event => {

    console.log("Service Worker activado.");

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE) {
                        console.log("Eliminando caché:", key);
                        return caches.delete(key);
                    }

                })

            );

        })

    );

    self.clients.claim();

});

// ==========================================
// Peticiones
// Busca primero en caché.
// Si no existe, va a Internet.
// ==========================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            if (response) {
                return response;
            }

            return fetch(event.request);

        })

    );

});