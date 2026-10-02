const CACHE_NAME="bsis1a-v12";
const APP_SHELL=["./","./index.html","./roster.html","./roster-data.js","./motion.css","./manifest.webmanifest","./bsis1a-home-icon.svg","./bsis1a-home-icon-maskable.svg","./ChatGPT%20Image%20Aug%209,%202026,%2004_55_02%20PM.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{const req=event.request;if(req.method!=="GET")return;const url=new URL(req.url);
if(url.origin===location.origin){event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>caches.match("./index.html"))))}
else if(url.hostname==="unpkg.com"){event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res})))}
});