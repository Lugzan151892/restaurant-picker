const cacheVersion = 'cache_v1';

self.addEventListener('install', (event) => {
	console.log('we are in install event');
	event.waitUntil(caches.open(cacheVersion).then((cache) => cache.addAll(['/img/background'])));
});

self.addEventListener('message', (event) => {
	if (event.data.type === 'CACHE_URLS') {
		event.waitUntil(
			caches.open(cacheVersion).then((cache) => {
				return cache.addAll(event.data.payload);
			}),
		);
	}
});

self.addEventListener('fetch', (event) => {
	// Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
	event.respondWith(fromCache(event.request));
	event.waitUntil(
		update(event.request)
			// В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
			.then(refresh),
	);
});

function fromCache(request) {
	return caches
		.open(cacheVersion)
		.then((cache) =>
			cache.match(request).then((matching) => matching || Promise.reject('no-match')),
		);
}

function update(request) {
	return caches
		.open(cacheVersion)
		.then((cache) =>
			fetch(request).then((response) =>
				cache.put(request, response.clone()).then(() => response),
			),
		);
}

// Шлём сообщения об обновлении данных всем клиентам.
function refresh(response) {
	return self.clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			// Подробнее про ETag можно прочитать тут
			// https://en.wikipedia.org/wiki/HTTP_ETag
			const message = {
				type: 'refresh',
				url: response.url,
				eTag: response.headers.get('ETag'),
			};
			// Уведомляем клиент об обновлении данных.
			client.postMessage(JSON.stringify(message));
		});
	});
}
