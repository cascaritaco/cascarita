"use strict";

require("dotenv").config();
if (process.env.NODE_ENV !== "testing") {
  Stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);
}
const {
  UserStripeAccounts,
  FormPaymentIntents,
  User,
  StripeStatus,
} = require("../models");

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
        const defaultStatus = await StripeStatus.findOne({
          where: {
            status: "Restricted",
          },
        });
        await UserStripeAccounts.create({
          user_id: user.id,
          stripe_account_id: accountId,
          details_submitted: false,
          requires_verification: true,
          charges_enabled: false,
          payouts_enabled: false,
          platform_account_name: user.platform_account_name,
          platform_account_description: user.platform_account_description,
          account_email: user.account_email,
          stripe_status_id: defaultStatus.id,
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

  var getAllAccountsByGroupId = async function (req, res, next) {
    try {
      const groupId = req.params.id;

      const accounts = await UserStripeAccounts.findAll({
        include: [
          {
            model: User,
            as: "User",
            where: {
              group_id: groupId,
            },
            attributes: {
              exclude: ["password", "created_at", "updated_at", "language_id"],
            },
          },
          {
            model: StripeStatus,
            as: "StripeStatus",
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          },
        ],
      });

      let data = accounts.length != 0 ? accounts : [];

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  var calculateStripeStatus = async function (account) {
    let rejectedReasons = [
      "rejected.fraud",
      "rejected.incomplete_verification",
      "rejected.listed",
      "rejected.other",
      "rejected.terms_of_service",
      "platform_paused",
      "under_review",
    ];

    let status = "Restricted";
    if (rejectedReasons.includes(account.requirements.disabled_reason)) {
      status = "Rejected";
    } else if (!account.payouts_enabled || !account.charges_enabled) {
      status = "Restricted";
    } else if (
      account.future_requirements.pending_verification?.length != 0 ||
      account.requirements.pending_verification?.length != 0
    ) {
      status = "Pending";
    } else if (account.current_deadline) {
      status = "Restricted Soon";
    } else if (account.requirements.eventually_due?.length >= 1) {
      status = "Enabled";
    } else {
      status = "Complete";
    }

    const stripeStatusId = await StripeStatus.findOne({
      where: {
        status: status,
      },
    });

    return stripeStatusId.id;
  };

  return {
    createAccountConnection,
    createPaymentIntent,
    getStripeAccountId,
    getClientSecret,
    getAllAccountsByGroupId,
    calculateStripeStatus,
  };
};

module.exports = AccountController();
