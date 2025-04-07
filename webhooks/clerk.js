// clerkWebhook.js
import express from 'express'
import bodyParser from 'body-parser';
import { Webhook } from 'svix';

const clerkWebhook = express.Router();

// Middleware nécessaire pour avoir le raw body
clerkWebhook.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

clerkWebhook.post("/clerk", async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  const headers = req.headers;
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  const wh = new Webhook(WEBHOOK_SECRET);

  let event;

  try {
    event = wh.verify(req.rawBody, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook Clerk invalide :", err);
    return res.status(400).send("Invalid webhook");
  }

  const { type, data } = event;
  console.log("📦 Clerk Event reçu :", type, data);


  if (type === "user.created") {
    //code here...
    console.log('User was created Successfully')
  }

  res.status(200).send("Webhook reçu avec succès !");
});

export default clerkWebhook;
