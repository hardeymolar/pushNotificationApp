const publicVapidKey = "BHP6m8uPMSyAOvo1tMqkxfOIIzom-hBeT81mwOGqnpQzE-gXNLSA6EY6LXySTv_u1-5bIwDlo8H5jB7WZEMqJFI";

// check for service worker
if("serviceWorker" in navigator){
    send().catch(err=>console.error(err));
}


// Register service worker, push , and send push

async function send(){
    // registering service worker
console.log("registering service worker...");
const register = await navigator.serviceWorker.register("/worker.js",{
    scope: "/"
});
console.log("service worker registered");

// registering  push
console.log("registring push");
const subscription = await register.pushManager.subscribe({
    userVisibleOnly:true,
    applicationServerKey: base64UrlToUint8Array(publicVapidKey)
})
console.log("push registered");

// send push notification
console.log("sending push");
await fetch("/subscribe",{
    method:"POST",
    body: JSON.stringify(subscription),
    headers:{
        'content-type': "application/json"
    }
});
console.log("push sent");
}

function base64UrlToUint8Array(base64UrlData) {
    const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
    const base64 = (base64UrlData + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const buffer = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      buffer[i] = rawData.charCodeAt(i);
    }
    return buffer;
  }