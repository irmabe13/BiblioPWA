console.log('Hello depuis le service worker');

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);
});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);    
});

self.addEventListener('fetch', (evt) => {
    console.log('fetch sur url', evt.request.url);
});

const cacheName = 'biblio' + '1.1';

self.addEventListener('install', evt => {
  console.log('install evt', evt);
  caches.open(cacheName).then(cache => {
    cache.addAll([
    'index.html',
    'main.js',
    'style.css',
    'add_book.html',
    'add_book.js',
    ])
  })
});

self.addEventListener('activate', evt => {
  console.log('activate evt', evt);
});

self.addEventListener('fetch', evt => {
  if(!navigator.onLine) {
    const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'}};
    evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Application en mode dégradé. Veuillez vous connecter</div>', headers));
  }
  console.log('fetch event sur url ',evt.request.url);

  self.addEventListener('fetch', evt => {

    evt.respondWith(

        fetch(evt.request).then( res => {

            if (evt.request.url.includes('add_book') ) {


                throw Error('inaccessible');

              

              }

              console.log('${evt.request.url} fetchée depuis le réseau');

            // we add the latest version into the cache

            caches.open(cacheName).then(cache => cache.put(evt.request, res));

            // we clone it as a response can be read only once (it's like a one time read stream)

            return res.clone();

        })

        .catch(err => {

            console.log('${evt.request.url} fetchée depuis le cache');

            caches.match(evt.request);

        })

    );

});
});
