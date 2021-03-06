// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray;
}

self.addEventListener('activate', async function () {
  try {
    const applicationServerKey = urlB64ToUint8Array('BCiPr01YuFgY0WRpiVxe5QRAsfxpH0H03GIP2-RP7g8SrpDAiTVTWslLFswbI5d6eFGklOB15bcV224quRRGf8E');

    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    console.log(JSON.stringify(subscription));
  } catch (error) {
    console.log('Error', error);
  }
});

// saveSubscription saves the subscription to the backend
async function saveSubscription(subscription) {
  const SERVER_URL = 'http://localhost:4000/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  })
  return response.json();
}

self.addEventListener('push', function (event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text())
  } else {
    console.log('Push event but no data')
  }
})

// self.addEventListener('activate', async function() {
//   // This will be called only once when the service worker is activated.
//   const subscribe = 
// });