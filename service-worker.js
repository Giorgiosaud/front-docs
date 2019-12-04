/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "3351351b0dcbad40884e982c4a7040ff"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "2ab816c8b15d5373dd5f706ffc9a13c5"
  },
  {
    "url": "android-chrome-384x384.png",
    "revision": "bb86717ad93de0c95f8ebcd08dbab6bf"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "b68b837eaabffaeeb3c9ddfbce9054c5"
  },
  {
    "url": "assets/css/0.styles.cffa09db.css",
    "revision": "dd68fdcf60a49629b181eba3ca83f156"
  },
  {
    "url": "assets/img/hero.jpg",
    "revision": "1d43ed19faa95a4725472c4c16eddb86"
  },
  {
    "url": "assets/img/i.png",
    "revision": "145a13e43b698a593f5300592354630a"
  },
  {
    "url": "assets/img/layout.png",
    "revision": "62488205b32c359498eeec455acf966b"
  },
  {
    "url": "assets/img/m.png",
    "revision": "0543c2f3238378e22fb78072cada4230"
  },
  {
    "url": "assets/img/modyo-rounded.png",
    "revision": "a32339701841b492837025110a55d5b4"
  },
  {
    "url": "assets/img/modyo.png",
    "revision": "c2bbcdd1bea9502a22ef6de494155777"
  },
  {
    "url": "assets/img/omnichannel.png",
    "revision": "8f438ba7412e0e8725823dbc1e1c1213"
  },
  {
    "url": "assets/img/orchestrate.png",
    "revision": "6bc6505db260b92afa0c29feb5436950"
  },
  {
    "url": "assets/img/people.png",
    "revision": "f26ae3948645431b7ff95f311c72b525"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/security.png",
    "revision": "dee3c434cdcdc27188183986051500f8"
  },
  {
    "url": "assets/img/speed.png",
    "revision": "db330632e0e8dfc980ec09b68b312ce9"
  },
  {
    "url": "assets/img/teamwork.png",
    "revision": "998906b040902fdbf5dbda93872d7930"
  },
  {
    "url": "assets/js/10.859d7413.js",
    "revision": "5af0929492e2569f5fb0cf1c4ae8226c"
  },
  {
    "url": "assets/js/11.67e6ef20.js",
    "revision": "4d5ac3b4a6030ebb6d835bf92b59af52"
  },
  {
    "url": "assets/js/12.be0db37d.js",
    "revision": "27f0c16158e10e30171e834975743842"
  },
  {
    "url": "assets/js/2.226b94a9.js",
    "revision": "36843e78cdc21d81850a71fb574ba3c0"
  },
  {
    "url": "assets/js/3.ba9692b5.js",
    "revision": "2c05fa5e0586bcb3bbe80a5a7bb60620"
  },
  {
    "url": "assets/js/4.a2c14b78.js",
    "revision": "d3b15a9469a87b1dd24d826f02100339"
  },
  {
    "url": "assets/js/5.b6669fe2.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.177c9f7d.js",
    "revision": "acbff292b1424d5a020f85eade1dcefa"
  },
  {
    "url": "assets/js/7.456495d1.js",
    "revision": "addf372c70b30999dc13e17d35d82ac8"
  },
  {
    "url": "assets/js/8.dc40ea9d.js",
    "revision": "0b7ba7a7f5afa4d0778f44330d48b3e8"
  },
  {
    "url": "assets/js/9.4eba9b75.js",
    "revision": "a3e30f502d1940b8437068c6cd3d24cc"
  },
  {
    "url": "assets/js/app.d90afac4.js",
    "revision": "2d731cee3a133083a3d389040ba822a1"
  },
  {
    "url": "en/index.html",
    "revision": "30c8e32f940ceb9244c628524362cdda"
  },
  {
    "url": "en/integrations/index.html",
    "revision": "8a548c1d561edc446e9cca4f05c251cd"
  },
  {
    "url": "en/integrations/OIDC/index.html",
    "revision": "e4cecf84f1ff9b531d85a44514caa1b3"
  },
  {
    "url": "enhanceAppFile.js",
    "revision": "2e42975a64e4c1cb0c2b6a3f5cf9d4e6"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "42c0ded330c927706b662dbd49f77e28"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "48701f1188f79093ba9be882e5752f30"
  },
  {
    "url": "index.html",
    "revision": "e995f1bc5ff05b0af96253d6c00e6566"
  },
  {
    "url": "integrations/index.html",
    "revision": "7a162fea2f5d23b5b3c33c0cd8548775"
  },
  {
    "url": "integrations/OIDC/index.html",
    "revision": "2e983bfd2b6ab74a47b8d866b942ffd8"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "7f63588e6ec7cbdc51b002e02c2b3e18"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "739443725e4d9d6fd210f5de7b4fb21d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
