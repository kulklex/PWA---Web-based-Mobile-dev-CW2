let cacheName = "lessons-v1";
let cacheFiles = [
    "index.html",
];

self.addEventListener("install", function (e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (cachedFile) {
            // If the file is in the cache, retrieve it from there
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                return cachedFile;
            } else {
                // If the file is not in the cache, download the file
                return fetch(e.request).then(function (response) {
                    // Check if the response can be cloned
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response and cache it
                    var responseToCache = response.clone();
                    caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, responseToCache);
                    });

                    console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                        e.request.url);
                    return response;
                }).catch(function(error) {
                    console.error("[Service Worker] Fetch error:", error);
                });
            }
        })
    );
});
