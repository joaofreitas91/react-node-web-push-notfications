import fastify from 'fastify'
import webPush from 'web-push'
import cors from '@fastify/cors'

const app = fastify();
app.register(cors);

// For generating VAPID keys
// const vapidKeys = webPush.generateVAPIDKeys();

const publicKey = 'BKnmqSYITB4prcZHIapTYFcBiO-fPyfgBk7cXNiW9j_x-KFA8E4jVb_l9yeRyfEqA1qCH-86WwqWNd3b06EF7y0'
const privateKey = '82oV68iMwBseQt6kYV88hvSn-xx3ucOSvnP-UoQ9LNY'

webPush.setVapidDetails(
  'https://localhost:3000',
  publicKey,
  privateKey
);

app.get("/push/public_key", (request, reply) => {
  reply.send({ publicKey });
});

app.post("/push/subscribe", (request, reply) => {
  const subscription = request.body;
  console.log(subscription);
  reply.code(201).send({ message: "success" });
});

interface Subscription {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

app.post("/push/send", (request, reply) => {
  const subscription = request.body as Subscription;
  console.log(subscription);

  webPush.sendNotification(subscription, JSON.stringify("Message by backend"));

  reply.code(201).send({ message: "success" });
});

app.listen({ port: 3000 }, () => {
  console.log('server is running!')
});
