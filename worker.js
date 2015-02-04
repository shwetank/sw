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
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

/*self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-static-v4').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request.clone()).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});*/

/*self.addEventListener ('fetch', function(event){
	//console.log("fetch request for: "+event.request+"");
	event.waitUntill(
		caches.match(event.request)
		.then(function(response){
			return response || fetch(event.request);
		})
	);
});*/




/*

self.onfetch = function(event){
  console.log("fetch request for: "+event.request+"");
  event.waitUntill(
    caches.match(event.request)
    .then(function(response){
      return response || fetch(event.request);
    })
  );
}



self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['myCache-V1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});*/

