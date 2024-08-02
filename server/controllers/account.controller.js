"use strict";

require("dotenv").config();
const Stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);
const { UserStripeAccounts, FormPaymentIntents } = require("../models");

const AccountController = function () {
  var createAccountConnection = async function (req, res, next) {
    try {
      const user = req.body;
      let account;
      let accountId;

      const existingStripeAccount = await UserStripeAccounts.findOne({
        where: {
          user_id: user.id,
        },
      });

      if (existingStripeAccount) {
        accountId = existingStripeAccount.stripe_account_id;
      } else {
        account = await Stripe.accounts.create({
          country: "US",
          email: user.email,
          type: "standard",
        });

        accountId = account.id;
      }

      const accountLink = await Stripe.accountLinks.create({
        account: accountId,
        refresh_url: "http://localhost:3000/forms",
        return_url: "http://localhost:3000/home",
        type: "account_onboarding",
      });

      if (!existingStripeAccount) {
        await UserStripeAccounts.create({
          user_id: user.id,
          stripe_account_id: accountId,
        });
      }

      res.status(201).json({ url: accountLink.url });
    } catch (error) {
      next(error);
    }
  };

  var createPaymentIntent = async function (req, res, next) {
    try {
      const productObj = req.body;
      const stripeAccountId = await getStripeAccountId(
        req.params["account_id"],
      );

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
          stripeAccount: stripeAccountId,
        },
      );

      await FormPaymentIntents.create({
        payment_intent_id: paymentIntent.id,
        form_id: productObj.form_id,
        user_stripe_account_id: req.params["account_id"],
      });

      res.status(201).json(paymentIntent);
    } catch (error) {
      next(error);
    }
  };

  var getStripeAccountId = async function (accountId) {
    const stripeAccount = await UserStripeAccounts.findByPk(accountId);
    return stripeAccount.stripe_account_id;
  };

  var getClientSecret = async function (req, res, next) {
    try {
      const paymentIntentId = req.params["paymentIntentId"];
      const stripeAccountId = await getStripeAccountId(
        req.params["account_id"],
      );

      let paymentIntentIdStr = paymentIntentId.toString();
      const paymentIntent = await Stripe.paymentIntents.retrieve(
        paymentIntentIdStr,
        {
          stripeAccount: stripeAccountId,
        },
      );

      res.status(200).json({ cleintSecret: paymentIntent.client_secret });
    } catch (error) {
      next(error);
    }
  };

  return {
    createAccountConnection,
    createPaymentIntent,
    getStripeAccountId,
    getClientSecret,
  };
};

module.exports = AccountController();
