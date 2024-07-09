"use strict";

require("dotenv").config();
const Stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);
const { Group } = require("../models");

const AccountController = {
  async createAccountConnection(req, res, next) {
    try {
      const user = req.body;
      const group = await Group.findByPk(user.group_id);
      const account = await Stripe.accounts.create({
        country: "US",
        email: user.email,
        business_profile: {
          name: group.name,
        },
      });

      const accountLink = await Stripe.accountLinks.create({
        account: account.id,
        refresh_url: "http://localhost:3000/forms",
        return_url: "http://localhost:3000/home",
        type: "account_onboarding",
      });

      // TODO: create a db table to store user id and connected_account_id !

      res.status(201).json({ url: accountLink.url });
    } catch (error) {
      next(error);
    }
  },

  async createPaymentIntent(req, res, next) {
    try {
      const productObj = req.body;
      const connected_account_id = "acct_1Pa1lpQoFQqkG3tl"; // this need to be retried form db, we should be able to find it by user_id
      const paymentIntent = await Stripe.paymentIntents.create(
        {
          amount: productObj.price,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
          application_fee_amount: productObj.fee,
        },
        {
          stripeAccount: connected_account_id,
        },
      );

      const clientSecret = paymentIntent.client_secret;
      const paymentIntentId = paymentIntent.id;
      // TODO: store payment intent id and form id and connected account id.
      // this will tell us which account created what product for what form
      // store here :
    } catch (error) {
      next(error);
    }
  },
  async getClientSecret(req, res, next) {
    try {
      const formid = reg.params["formId"];
      // look up client secrent by form id ?
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AccountController;
