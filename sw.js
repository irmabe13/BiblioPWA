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

self.addEventListener('fetch', (evt) => {
if(!navigator.onLine) {
    const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
    evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Apllication en mode dégradé. Veuillez vous connecter</div>', headers));
}
});

const cacheName = 'biblio' + '1.1';

self.addEventListener('install', (evt) => {

    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);

    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);       

    const cachePromise = caches.open(cacheName).then(cache => {

        return cache.addAll([

            'index.html',

            'main.js',

            'style.css',

            'add_book.html',

            'add_book.js',
            
            'contact.html',
            
            'contact.js'
        ])

        .then(console.log('cache initialisé'))

        .catch(console.err);

    });

    self.addEventListener('activate', evt => {
        console.log('activate evt', evt);
      });


    evt.waitUntil(cachePromise);


});

self.addEventListener('fetch', evt => {
    if(!navigator.onLine) {
      const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'}};
      evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Application en mode dégradé. Veuillez vous connecter</div>', headers));
    }
    console.log('fetch event sur url ',evt.request.url);
  
    // stratégie de cache only with network fallback
    evt.respondWith(
      caches.match(evt.request).then (res => {
          if(res) {
             
              return res;
            }
            return fetch(evt.request). then(newResponse => {
                   
              caches.open(cacheName). then (cache => cache.put(evt.request, newResponse));
        
              return newResponse.clone();
            })
          })
      );
  });