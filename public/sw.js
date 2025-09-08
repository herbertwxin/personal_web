// Simple service worker for asset caching
const CACHE_NAME = 'academic-portfolio-v1'
const STATIC_ASSETS = [
  '/',
  '/favicon.svg',
  '/favicon.png',
  '/asset-manifest.json',
]

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return (
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            // Cache successful responses
            if (fetchResponse.ok) {
              const responseClone = fetchResponse.clone()
              caches
                .open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone))
            }
            return fetchResponse
          })
          .catch(() => {
            // Return offline fallback for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/')
            }
          })
      )
    })
  )
})
