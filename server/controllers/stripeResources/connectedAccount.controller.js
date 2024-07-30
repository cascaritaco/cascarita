"use strict";
const Stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);

const ConnectAccountController = function () {
  const endpointSecret = process.env.STRIPE_CONNECTED_ACCOUNTS_WEBHOOK_SECRET;

  var verifyRequest = function (rawPayload, signature, endpointSecret) {
    try {
      return Stripe.webhooks.constructEvent(
        rawPayload,
        signature,
        endpointSecret,
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  var handleEvent = async function (req, res) {
    try {
      let event = verifyRequest(
        req.body,
        req.headers["stripe-signature"],
        endpointSecret,
      );

      // sample event types. TODO : use connect account type of events
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      return res.status(200).json({ message: "event handled !" });
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  };

  return {
    handleEvent,
  };
};

module.exports = ConnectAccountController();
