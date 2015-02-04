
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('worker.js', {
  	scope: '/sw/'
  }).then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
    html_tag = document.querySelector("html");
    html_tag.setAttribute("manifest", "backup.manifest");
  });
}