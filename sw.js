// Service Worker for Parent Architect PWA
// Updated: 2026-01-22 - Vercel deployment with Capacitor fixes
const CACHE_NAME = 'parent-architect-v8.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/audio.js',
    '/js/storage.js',
    '/js/state.js',
    '/js/activities.js',
    '/js/scripts.js',
    '/js/templates.js',
    '/js/birdsamples.js',
    '/js/orchestra.js',
    '/js/brightness.js',
    '/js/wasmbridge.js',
    '/js/slowwake.js',
    '/js/views.js',
    '/js/effects.js',
    '/js/gestures.js',
    '/js/actions.js',
    '/js/app.js',
    // WASM audio engine (professional synthesis)
    '/wasm/parent_architect_audio.js',
    '/wasm/parent_architect_audio_bg.wasm',
    // Bird audio samples (cached for offline use - optional)
    '/audio/birds/robin-1.mp3',
    '/audio/birds/gull-1.mp3',
    '/audio/birds/cardinal-1.mp3',
    '/audio/birds/cardinal-2.mp3',
    '/audio/birds/chickadee-1.mp3',
    '/audio/birds/warbler-1.mp3'
    // Classical music recordings (will be cached dynamically when available)
    // '/audio/classical/mozart-peaceful-1.mp3',
    // '/audio/classical/debussy-clair-1.mp3',
    // '/audio/classical/mozart-dreamy-1.mp3',
    // '/audio/classical/satie-gentle-1.mp3'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
