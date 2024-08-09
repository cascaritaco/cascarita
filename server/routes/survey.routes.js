"use strict";

const express = require("express");
const router = express.Router();
require("dotenv").config();

// TODO: Slowly route these to our mongo DB, eventually we will get rid of this file

router.get("/survey/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${req.params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        },
      },
    );

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error fetching form:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/surveys", async (req, res) => {
  try {
    const {
      page = 1,
      page_size = 10,
      search,
      workspace_id,
      sort_by,
      order_by,
    } = req.query;

    const params = new URLSearchParams({
      page,
      page_size,
      ...(search && { search }),
      ...(workspace_id && { workspace_id }),
      ...(sort_by && { sort_by }),
      ...(order_by && { order_by }),
    }).toString();

    const url = `https://api.typeform.com/forms?${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
      },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error fetching forms:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/survey/:id/responses", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${req.params.id}/responses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_API_TOKEN}`,
        },
      },
    );

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error retrieving responses:", responseBody);
      return res.status(response.status).json(responseBody);
    }

    res.json(responseBody);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

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
