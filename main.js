console.log('test depuis main');

const livresDiv = document.querySelector('#livres');


function loadBooks() {

    fetch('http://localhost:3001/livres')

        .then(response => {

            response.json()

              .then(livres => {

                 const allBooks = livres.map(t => `<div><b>${t.titre} : </b> ${t.resume} - ${t.isbn} </div>`)

                    .join('');


                 livresDiv.innerHTML = allBooks;

               });

        })

        .catch(console.error);

}


loadBooks();

if(navigator.serviceWorker) {

  navigator.serviceWorker

      .register('sw.js')
      navigator.serviceWorker.ready.then(function(swRegistration) {

        return swRegistration.sync.register('foo');
      
      })
      .catch(err => console.error('service worker NON enregistré', err));

}

if (window.Notification && window.Notification !== 'denied') {

  Notification.requestPermission(perm => {

      if(perm === 'granted') {
        /*const options = {

          body: 'Je suis le body de la notification',

          icon: 'Images/icons/icon-72x72.png'

      }

          const notif = new Notification('Hello notification',options);*/

      } else {

          console.log('autorisation de recevoir des notification réfusée');

      }

  })

}

self.addEventListener('push', evt =>  {

  console.log(evt);

  console.log('data envoyée par la push notification des dev tools : ', evt.data.text())

  var title = evt.data.text();

  evt.waitUntil(self.registration.showNotification(title, { body: 'ça marche :)', image: 'Images/icons/icon-152x152.png'}));

});
/*if(window.caches) {
  caches.open('biblio-1.0');
  caches.keys().then(console.log);
}
caches.open('biblio-1.0').then(cache => {
  // cache.add('index.html');
  cache.addAll([
      'index.html',
      'main.js'
  ]);
});
*/