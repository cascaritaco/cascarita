"use strict";

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/survey", async (req, res) => {
  try {
    const response = await fetch("https://api.typeform.com/forms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error creating survey:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
