const C='myshadow-v2';
const A=['./','./index.html','./style.css','./core.js','./ibadah.js','./keuangan.js','./app.js','./icon.svg','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&res.type==='basic'){caches.open(C).then(c=>c.put(e.request,res.clone()))}return res})).catch(()=>caches.match('./index.html')))});
