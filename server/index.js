const express = require('express');
const cors = require('cors');
const webPush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => res.send('Hello World!'));

const dummyDB = {
  subscription: null
};

async function saveToDataBase(subscription) {
  dummyDB.subscription = subscription;
}

app.post('/save-subscription', async function(req, res) {
  const subscription = req.body;
  await saveToDataBase(subscription);

  res.status(201).json({ message: 'success', data: dummyDB });
});

const vapidKeys = {
  publicKey:
    'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk',
  privateKey: 'ERIZmc5T5uWGeRxedxu92k3HnpVwy_RCnQfgek1x2Y4',
}
//setting our previously generated VAPID keys
webPush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

//route to test send notification
app.get('/send-notification', (_, res) => {
  const subscription = dummyDB.subscription //get subscription from your databse here.
  const message = 'Hello World';
  sendNotification(subscription, message);
  res.status(200).json({ message: 'message sent' });
});

//function to send the notification to the subscribed device
function sendNotification(subscription, dataToSend = '') {
  webPush.sendNotification(subscription, dataToSend);
}

app.listen(port, function() { console.log(`Example app listening on port ${port}!`); });