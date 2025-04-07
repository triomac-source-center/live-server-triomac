import express from "express";
import bodyParser from "body-parser";
import { Webhook } from "svix";

const clerkWebhook = express.Router();

clerkWebhook.post(
  "/clerk",
  // Parse raw body for signature verification
  bodyParser.raw({ type: "application/json" }),

  async (req, res) => {
    const SIGNING_SECRET = process.env.WEBHOOK_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env");
    }

    // Create Svix instance
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers and raw body
    const headers = req.headers;
    const payload = req.body;

    // Extract svix headers
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Error: Missing svix headers",
      });
    }

    let evt;

    // Try to verify the webhook
    try {
      evt = wh.verify(payload.toString("utf8"), {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error: Could not verify webhook:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Handle the event
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
        //code here...
        console.log('User was created Successfully')
      }

    console.log(`✅ Received webhook with ID ${id} and event type of ${eventType}`);
    console.log("📦 Webhook payload:", evt.data);

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  }
);


export default clerkWebhook;