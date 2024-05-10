import prisma from "../prisma/client.js";
import crypto from "crypto";
import { configDotenv } from "dotenv";
configDotenv();


const webhook = async (req, res) => {
  // Extracting the 'signature' header from the HTTP request
  const signature = req.get("signature");
  // Getting the raw payload from the request body
  const payload = JSON.stringify(req.body);
  console.log(payload);

  // If there is no signature, ignore the request
  if (!signature) {
    return res.sendStatus(400);
  }

  // Calculate the signature
  const computedSignature = crypto
    .createHmac("sha256", process.env.CHARGILY_SECRET_KEY)
    .update(payload)
    .digest("hex");

  // If the calculated signature doesn't match the received signature, ignore the request
  if (computedSignature !== signature) {
    return res.sendStatus(403);
  }
  console.log("signature is correct")
  // If the signatures match, proceed to decode the JSON payload
  const event = req.body;

  

  // Switch based on the event type
  switch (event.type) {
    case "checkout.paid":
      const checkout = event.data;
      console.log("im here");
      const reservationId = checkout.metadata[0].reservationId;

      const updatedreservation = await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "paid",
        },
      });

      break;
    case "checkout.failed":
      const failedCheckout = event.data;
      console.log(failedCheckout);
      break;

    case "checkout.expired":
      const expiredCheckout = event.data;
      console.log(expiredCheckout);
      // Handle the expired payment.
      break;
    default:
      console.log("Unknown event type");
  }
  res.sendStatus(200);
};

export default webhook;