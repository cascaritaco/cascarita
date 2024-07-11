"use strict";

require("dotenv").config();
const Stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);
const { Group, UserStripeAccounts, FormPaymentIntents } = require("../models");

const AccountController = function () {
  var createAccountConnection = async function (req, res, next) {
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

      await UserStripeAccounts.create({
        user_id: user.id,
        stripe_account_id: account.id,
      });

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

      console.log(stripeAccountId);
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
