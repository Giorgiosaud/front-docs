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
    "revision": "ea9ad78204de959fc0f45d43e4fa4991"
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
    "url": "assets/css/0.styles.1af3bed2.css",
    "revision": "a19e427812992f8a9f340b00037fa07c"
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
    "url": "assets/js/10.b293b33e.js",
    "revision": "cbc3796ab4ef8cd22bfaaef9faa664dd"
  },
  {
    "url": "assets/js/11.2bb7f853.js",
    "revision": "019853c16efc9ecf9edd29f57e20d316"
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
    "url": "assets/js/7.9da92e0e.js",
    "revision": "92c8f814e934c3eb05d5442c8b3638a8"
  },
  {
    "url": "assets/js/8.6b4591a9.js",
    "revision": "ba6c4ea4220370b1824e09be5bdae03e"
  },
  {
    "url": "assets/js/9.0068cd87.js",
    "revision": "a7ebc0a04789ca257eadb9e639785037"
  },
  {
    "url": "assets/js/app.0d1ccf26.js",
    "revision": "14aec46c42025f9c4dbe58ee6a0336bd"
  },
  {
    "url": "en/index.html",
    "revision": "b364386b5a401c3323cc34815966096d"
  },
  {
    "url": "en/integrations/index.html",
    "revision": "9eb718c970ce17e62d7d1e984446d777"
  },
  {
    "url": "en/integrations/OIDC/index.html",
    "revision": "ca37a7652401057dab2825e6f4b7bcb5"
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
    "revision": "138dbe3ab7efccda4e65787b6f29aceb"
  },
  {
    "url": "integrations/index.html",
    "revision": "a91faa8941221c6cc934dffed63ebc91"
  },
  {
    "url": "integrations/OIDC/index.html",
    "revision": "68c16baa569b777e7710a54e8f8afe70"
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
