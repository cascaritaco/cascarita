"use strict";

require("dotenv").config();
const express = require("express");
const AccountController = require("../controllers/account.controller");
const router = express.Router();

/**
 * @swagger
 * /api/accounts/connect:
 *   post:
 *     summary: Create a Stripe account connection
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               email:
 *                 type: string
 *               platform_account_name:
 *                 type: string
 *               platform_account_description:
 *                 type: string
 *               account_email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account connection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/connect", AccountController.createAccountConnection);
/**
 * @swagger
 * /api/accounts/{account_id}/paymentIntent:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               fee:
 *                 type: number
 *               form_id:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Payment intent created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/:account_id/paymentIntent", AccountController.createPaymentIntent);
/**
 * @swagger
 * /api/accounts/{account_id}/paymentIntent/{paymentIntentId}:
 *   get:
 *     summary: Get client secret for a payment intent
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client secret retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:account_id/paymentIntent/:paymentIntentId",
  AccountController.getClientSecret,
);
/**
 * @swagger
 * /api/accounts/{group_id}:
 *   get:
 *     summary: Get all accounts by group ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Accounts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserStripeAccounts'
 *       500:
 *         description: Internal server error
 */
router.get("/:group_id", AccountController.getAllAccountsByGroupId);
/**
 * @swagger
 * /api/accounts/key/publishable:
 *   get:
 *     summary: Get Stripe publishable key
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Publishable key retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get("/key/publishable", AccountController.getPublishableKey);

module.exports = router;
