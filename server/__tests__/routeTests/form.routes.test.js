"use strict";

const request = require("supertest");
const express = require("express");
const Middlewares = require("../../middlewares.js");
const FormRoutes = require("../../routes/form.routes");
const Movie = require("../../mongoModel/movie");
const mongoDbHelper = require("../helpers/mongodbTestSetUp.js");
const app = express();
app.use(express.json());
app.use("/", FormRoutes);
app.use(Middlewares.errorHandler);

describe("Integration Tests", () => {
  beforeAll(async () => {
    await mongoDbHelper.connect();
  });

  afterAll(async () => {
    await mongoDbHelper.disconnect();
  });

  it("should create a new movie", async () => {
    const newMovie = { name: "Inception", release_year: 2010 };

    const response = await request(app).post("/mov").send(newMovie).expect(201);

    expect(response.body).toHaveProperty("_id");

    const movie = await Movie.findById(response.body._id);
    expect(movie).toMatchObject(newMovie);
  });
});
