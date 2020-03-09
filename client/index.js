function check() {
  if (!('serviceWorker' in navigator))
    throw new Error('No Service Worker support');

  if (!('PushManager' in window))
    throw new Error('No Push API Support');
}

// register the service worker
async function registerServiceWorker() {
  let register;
  register = await navigator.serviceWorker.register('service.js');

  return register;
}

// request for permission
async function requestPermission() {
  const permission = await window.Notification.requestPermission();
  if(permission != 'granted')
    throw new Error('Permission denied');
}

// function notification(title, body, registeredWorker) {
//   const option = {
//     body
//   }

//   registeredWorker.showNotification(title, option);
// }


// main method
async function main() {
  check();
  const registeredWorker = await registerServiceWorker();
  await requestPermission();
  // notification('Push Notif', 'The message', registeredWorker);
}

main();
