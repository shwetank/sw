importScripts('serviceworker-cache-polyfill.js');

var theCacheName = "mysite-static-v4";
var URLS_to_cache = [
	'/sw/sw.html',
	'/sw/image1.jpg',
	'/sw/image2.jpg',
	'/sw/image3.jpg'
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v4').then(function(cache) {
      return cache.addAll(URLS_to_cache);
    })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open('mysite-static-v4').then(function(cache) {
			return fetch(event.request.clone()).then(function(response) {
				cache.put(event.request, response.clone());
				return response;
			});
		})
	);
});

/*self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response){

				if (response) return response;
				var fetchRequest = event.request.clone();
				return fetch(fetchRequest)
				.then(function(response){
					if(!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}
						var responseToCache = response.clone();

						caches.open(theCacheName)
							.then(function(cache) {
								var cacheRequest = event.request.clone();
								cache.put(cacheRequest, responseToCache);
							});

						return response;
				})
			})
	);
});*/

/*self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});*/
