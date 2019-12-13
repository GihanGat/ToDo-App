importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute([
    '/index.htm',
    '/js/index.js',
    '/img/add.svg',
    '/img/edit.svg',
    '/img/remove.svg'
]);

workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "todoApp-js-cache",
    })
);

workbox.routing.registerRoute(
    /\.htm(l?)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "todoApp-html-cache",
    })
);

workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "todoApp-css-cache",
    })
);

