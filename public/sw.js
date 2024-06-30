const cacheVersion = 'cache_v1';

const precacheResources = ['/', '/index.html'];

const fromCache = (request) => {
	return caches
		.open(cacheVersion)
		.then((cache) =>
			cache.match(request).then((matching) => matching || Promise.reject('no-match')),
		);
};

const update = (request) => {
	return caches
		.open(cacheVersion)
		.then((cache) =>
			fetch(request).then((response) =>
				cache.put(request, response.clone()).then(() => response),
			),
		);
};

self.addEventListener('install', (event) => {
	console.log('we are in install event');
	event.waitUntil(
		caches
			.open(cacheVersion)
			.then((cache) => cache.addAll(precacheResources))
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener('fetch', async (event) => {
	if (!event.request.url.startsWith('http')) {
		return;
	}

	event.respondWith(
		fetch(event.request)
			.then((response) => (response.ok ? response : fromCache(event.request)))
			.catch(() => fromCache(event.request)),
	);

	event.waitUntil(update(event.request));
});
