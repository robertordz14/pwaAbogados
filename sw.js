self.addEventListener('install', e =>{
  const cacheProm = caches.open('cache-v1')
      .then(cache => {
          return cache.addAll([
            "./", 
            "/css/style.css", 
            '/main.js',
            "/images/facebook.png",
            "/images/instagram.png",
            "/images/twiter.png",
            "/images/git.png",
            "/images/img1.png",
            "/images/img2.png",
            "/images/img3.png",
            "/images/logo.png",
            "/images/landscape.jpg",
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
          ])
          
      });
  e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
  //cache with network fallback
  const respuesta = caches.match( e.request )
      .then ( res => {
          if ( res ) return res;
          //no existe el archivo
          //tengo que ir a la web
          console.log('No existe', e.request.url);
          return fetch( e.request ).then ( newResp => {
              caches.open('cache-v1')
                  .then( cache => {
                      cache.put( e.request, newResp);
                  }

                  )
              return newResp.clone;
          });
      });
      e.respondWith(respuesta);
  //only cache
  //e.respondWith( caches.match(e.request));
});