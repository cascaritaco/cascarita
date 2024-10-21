"use strict";

window.setImmediate = window.setTimeout;

const request = require("supertest");
const express = require("express");

const { errorHandler } = require("../../middlewares.js");
const SeasonRoutes = require("../../routes/season.routes");
const { Group, League, Season, sequelize } = require("../../models");

const app = express();
app.use(express.json());
const dummyCheckJwt = (req, res, next) => next();
app.use("/seasons", SeasonRoutes(dummyCheckJwt));
app.use(errorHandler);

describe("Season routes", () => {
  beforeEach(async () => {
    await Group.sync();
    await League.sync();
    await Season.sync();
  });
  afterEach(async () => {
    await Season.destroy({ where: {} });
    await League.destroy({ where: {} });
    await Group.destroy({ where: {} });
  });

  describe("GET /seasons", () => {
    it("Should return list of seasons", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      await Season.bulkCreate([
        {
          name: "Spring 2024",
          start_date: "2024-03-15 00:00:00",
          end_date: "2025-06-01 11:59:00",
          is_active: true,
          league_id: league.id,
        },
        {
          name: "Winter 2024",
          start_date: "2024-11-01 00:00:00",
          end_date: "2025-03-14 11:59:00",
          is_active: false,
          league_id: league.id,
        },
        {
          name: "Summer 2025",
          start_date: "2025-07-01 00:00:00",
          end_date: "2025-10-31 11:59:00",
          is_active: false,
          league_id: league.id,
        },
      ]);
      const response = await request(app).get("/seasons");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(3);
    });

    it("Should accept query string", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const juniorLeague = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const adultLeague = await League.create({
        name: "Adult League",
        group_id: group.id,
      });
      await Season.bulkCreate([
        {
          name: "Spring 2024",
          start_date: "2024-03-15 00:00:00",
          end_date: "2025-06-01 11:59:00",
          is_active: true,
          league_id: adultLeague.id,
        },
        {
          name: "Winter 2024",
          start_date: "2024-11-01 00:00:00",
          end_date: "2025-03-14 11:59:00",
          is_active: false,
          league_id: juniorLeague.id,
        },
        {
          name: "Summer 2025",
          start_date: "2025-07-01 00:00:00",
          end_date: "2025-10-31 11:59:00",
          is_active: false,
          league_id: juniorLeague.id,
        },
      ]);

      const query = "name=spr&is_active=true&league=adult";
      const response = await request(app).get(`/seasons?${query}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
    });
  });

  describe("GET /seasons/:id", () => {
    it("Should return a season", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const season = await Season.create({
        name: "Spring 2024",
        start_date: "2024-03-15 00:00:00",
        end_date: "2025-06-01 11:59:00",
        is_active: true,
        league_id: league.id,
      });

      const response = await request(app).get(`/seasons/${season.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ name: season.name });
    });

    it("Should fail if id is non-integer", async () => {
      const response = await request(app).get("/seasons/foo");
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "season id must be an integer",
      });
    });

    it("Should fail if season not found", async () => {
      const id = 23;
      const response = await request(app).get(`/seasons/${id}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        message: `no such season with id ${id}`,
      });
    });
  });

  describe("POST /seasons", () => {
    it("Should create a season", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const form = {
        name: "Winter 2024",
        start_date: "2024-11-01 00:00:00",
        end_date: "2025-03-15 11:59:00",
        is_active: true,
        league_id: league.id,
      };

      const response = await request(app).post("/seasons").send(form);
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({ name: form.name });
    });

    it("Should fail if invalid date range", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const form = {
        name: "Winter 2024",
        end_date: "2025-03-15 11:59:00",
        is_active: true,
        league_id: league.id,
      };

      const response = await request(app).post("/seasons").send(form);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "notNull Violation: Season.start_date cannot be null",
      });
    });

    it("Should fail if season name already exists within league", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const name = "Winter 2024";
      await Season.create({
        name: name,
        start_date: "2024-03-15 11:59:00",
        end_date: "2025-03-15 11:59:00",
        is_active: true,
        league_id: league.id,
      });

      const form = {
        name: name,
        start_date: "2024-09-15 10:59:00",
        end_date: "2025-03-15 11:59:00",
        is_active: false,
        league_id: league.id,
      };

      const response = await request(app).post("/seasons").send(form);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "name is not unique",
      });
    });
  });

  describe("PATCH /seasons/:id", () => {
    it("Should update a season", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const season = await Season.create({
        name: "Spring 2024",
        start_date: "2024-03-15 00:00:00",
        end_date: "2025-06-01 11:59:00",
        is_active: true,
        league_id: league.id,
      });
      const form = { name: "Foo" };

      const response = await request(app)
        .patch(`/seasons/${season.id}`)
        .send(form);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ name: form.name });
    });

    it("Should fail if season not found", async () => {
      const id = 23;
      const form = { name: "Spr 24" };

      const response = await request(app).patch(`/seasons/${id}`).send(form);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /seasons/:id", () => {
    it("Should delete a season", async () => {
      const group = await Group.create({
        name: "Soledad Soccer",
        street_address: "499 Front Street",
        city: "Soledad",
        state: "CA",
        zip_code: "93960",
      });
      const league = await League.create({
        name: "Junior League",
        group_id: group.id,
      });
      const season = await Season.create({
        name: "Spring 2024",
        start_date: "2024-03-15 00:00:00",
        end_date: "2025-06-01 11:59:00",
        is_active: true,
        league_id: league.id,
      });
      const response = await request(app).delete(`/seasons/${season.id}`);
      expect(response.statusCode).toBe(204);
    });
    it("Should fail if season not found", async () => {
      const id = 23;
      const response = await request(app).delete(`/seasons/${id}`);
      expect(response.statusCode).toBe(404);
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
