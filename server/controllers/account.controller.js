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
        return_url: "http://localhost:3000/forms",
        type: "account_onboarding",
      });

      res.status(201).json({ url: accountLink.url });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AccountController;
