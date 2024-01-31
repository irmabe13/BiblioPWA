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