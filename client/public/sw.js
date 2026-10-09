/* Minimal service worker for the camping guide PWA.
 * Chrome requires a fetch-event handler for installability; this one
 * intentionally passes requests through untouched (no offline caching),
 * so app behavior (Supabase auth, API calls) is unchanged.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // passthrough: no interception
});
