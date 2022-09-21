'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "b45657aa03a39daeebc872d71f1d0113",
"assets/dogs/162816-dog-face-free-png-hq%20(1).png": "dfc446fd8074c3f7ec7c5d95ce61b15c",
"assets/dogs/162816-dog-face-free-png-hq.png": "dfc446fd8074c3f7ec7c5d95ce61b15c",
"assets/dogs/580b57fbd9996e24bc43bbdd.png": "bd0a3bda11374df376dfaff55559319a",
"assets/dogs/580b57fbd9996e24bc43bbe0.png": "e6747af493a173c2c916de86377c9eb5",
"assets/dogs/5a005216092a74e5b928e76b.png": "a1e4167efdc0e34b26481fc5362f9702",
"assets/dogs/77-771235_dog-face-png-transparent-png.png": "e14b13bb9b46bcb4310d7264598d0bb8",
"assets/dogs/dog-png-30.png": "ec36c64e1c82c45f370ac37f577b1dd6",
"assets/dogs/png-clipart-cute-dog-product-kind-cute-puppies-thumbnail.png": "e2d2f02d29067e71619de1132870cfbf",
"assets/FontManifest.json": "3008d0ef0a945a098d64397a7a6415ad",
"assets/fonts/Comfortaa-Bold.ttf": "7695aeab83089e2ceacc05dfa159a17f",
"assets/fonts/Comfortaa-Light.ttf": "866333be226453f3a24c2ff09b665702",
"assets/fonts/Comfortaa-Regular.ttf": "d350ce249a30596db0ed98838873a907",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/gif/7211975.gif": "f2f88e8b1a7d678e57414a3e74c484a1",
"assets/gif/7403022.gif": "937f753660cfde779bfc8eb37bacb3f5",
"assets/gif/7742970.gif": "e8aed905c43d9c0d0071a9c54dc29cef",
"assets/gif/7994384.gif": "fc644494377f31017373de47d8c97176",
"assets/icons/80106-telegram-icon.json": "a55caebdc328ac869832937f31b8eaf4",
"assets/NOTICES": "73a323887a626b7cc22766826154265b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/web/assets/dogs/162816-dog-face-free-png-hq%2520(1).png": "dfc446fd8074c3f7ec7c5d95ce61b15c",
"assets/web/assets/dogs/162816-dog-face-free-png-hq.png": "dfc446fd8074c3f7ec7c5d95ce61b15c",
"assets/web/assets/dogs/580b57fbd9996e24bc43bbdd.png": "bd0a3bda11374df376dfaff55559319a",
"assets/web/assets/dogs/580b57fbd9996e24bc43bbe0.png": "e6747af493a173c2c916de86377c9eb5",
"assets/web/assets/dogs/5a005216092a74e5b928e76b.png": "a1e4167efdc0e34b26481fc5362f9702",
"assets/web/assets/dogs/77-771235_dog-face-png-transparent-png.png": "e14b13bb9b46bcb4310d7264598d0bb8",
"assets/web/assets/dogs/dog-png-30.png": "ec36c64e1c82c45f370ac37f577b1dd6",
"assets/web/assets/dogs/png-clipart-cute-dog-product-kind-cute-puppies-thumbnail.png": "e2d2f02d29067e71619de1132870cfbf",
"assets/web/assets/gif/7211975.gif": "f2f88e8b1a7d678e57414a3e74c484a1",
"assets/web/assets/gif/7403022.gif": "937f753660cfde779bfc8eb37bacb3f5",
"assets/web/assets/gif/7742970.gif": "e8aed905c43d9c0d0071a9c54dc29cef",
"assets/web/assets/gif/7994384.gif": "fc644494377f31017373de47d8c97176",
"assets/web/assets/icons/80106-telegram-icon.json": "a55caebdc328ac869832937f31b8eaf4",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/animation_500_l7qu23dl.gif": "c8b660737111105d169674fdb0e15ba6",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "961d94b9f5dd9b16016a1129bedb3fd2",
"/": "961d94b9f5dd9b16016a1129bedb3fd2",
"main.dart.js": "56d5ffc2e8cb1c181473905283789808",
"manifest.json": "6a4e9cd324d72a32feda6867df80bbf5",
"styles.css": "36de02a4e5001400b1030e57a6ca07e5",
"version.json": "08587b001ef0011ab9281d68b7e48a99"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
