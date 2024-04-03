"use strict";

const request = require("supertest");
const express = require("express");

const { errorHandler } = require("../../middlewares.js");
const SeasonRoutes = require("../../routes/season.routes");
const { Group, Season, sequelize } = require("../../models");

const app = express();
app.use(express.json());
app.use("/season", SeasonRoutes);
app.use(errorHandler);

describe("Season routes", () => {
  beforeEach(async () => {
    await Group.sync();
    await Season.sync();
  });

  afterEach(async () => {
    await Season.destroy({ where: {} });
    await Group.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /season", () => {
    it("Should return list of seasons", async () => {
      const group = await Group.create({ name: "SOMOS" });
      await Season.bulkCreate([
        {
          name: "Spring 2024",
          start_date: "2024-03-15 00:00:00",
          end_date: "2025-06-01 11:59:00",
          is_active: true,
          group_id: group.id,
        },
        {
          name: "Winter 2024",
          start_date: "2024-11-01 00:00:00",
          end_date: "2025-03-14 11:59:00",
          is_active: false,
          group_id: group.id,
        },
        {
          name: "Summer 2025",
          start_date: "2025-07-01 00:00:00",
          end_date: "2025-10-31 11:59:00",
          is_active: false,
          group_id: group.id,
        },
      ]);

      const response = await request(app).get("/season");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(3);
    });

    it("Should accept query string", async () => {
      const groupA = await Group.create({ name: "Salinas" });
      const groupB = await Group.create({ name: "SOMOS" });
      await Season.bulkCreate([
        {
          name: "Spring 2024",
          start_date: "2024-03-15 00:00:00",
          end_date: "2025-06-01 11:59:00",
          is_active: true,
          group_id: groupA.id,
        },
        {
          name: "Winter 2024",
          start_date: "2024-11-01 00:00:00",
          end_date: "2025-03-14 11:59:00",
          is_active: false,
          group_id: groupB.id,
        },
        {
          name: "Summer 2025",
          start_date: "2025-07-01 00:00:00",
          end_date: "2025-10-31 11:59:00",
          is_active: false,
          group_id: groupB.id,
        },
      ]);

      const query = `is_active=${false}&group_id=${groupB.id}`;
      const response = await request(app).get(`/season?${query}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe("GET /season/:id", () => {
    it("Should return a season", async () => {
      const group = await Group.create({ name: "Salinas" });
      const season = await Season.create({
        name: "Spring 2024",
        start_date: "2024-03-15 00:00:00",
        end_date: "2025-06-01 11:59:00",
        is_active: true,
        group_id: group.id,
      });

      const response = await request(app).get(`/season/${season.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ name: season.name });
    });

    it("Should fail if season not found", async () => {
      const id = 23;
      const response = await request(app).get(`/season/${id}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        message: `no such season with id ${id}`,
      });
    });
  });

  describe("POST /season", () => {
    it("Should create a season", async () => {
      const group = await Group.create({ name: "Salinas" });
      const form = {
        name: "Winter 2024",
        start_date: "2024-11-01 00:00:00",
        end_date: "2025-03-15 11:59:00",
        is_active: true,
        group_id: group.id,
      };

      const response = await request(app).post("/season/create").send(form);
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({ name: form.name });
    });

    it("Should fail if bad request", async () => {
      const group = await Group.create({ name: "SOMOS" });
      const form = {
        name: "Winter 2024",
        end_date: "2025-03-15 11:59:00",
        is_active: true,
        group_id: group.id,
      };

      const response = await request(app).post("/season/create").send(form);
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        message: "notNull Violation: Season.start_date cannot be null",
      });
    });
  });

  describe("PATCH /season/:id", () => {
    it("Should fail if missing id", async () => {
      const group = await Group.create({ name: "Salinas" });
      const season = await Season.create({
        name: "Spring 2024",
        start_date: "2024-03-15 00:00:00",
        end_date: "2025-06-01 11:59:00",
        is_active: true,
        group_id: group.id,
      });
      const form = {
        name: "Spr 24",
      };

      const response = await request(app)
        .patch(`/season/update/${season.id}`)
        .send(form);
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ name: form.name });
    });

    it("Should fail if season not found", async () => {
      const id = 23;
      const form = {
        name: "Spr 24",
      };

      const response = await request(app).patch(`/season/update/${id}`).send(form);
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        message: `no such season with id ${id}`,
      });
    });
  });

  describe("DELETE /season/:id", () => {
    it("Should delete a season", async () => {
      const group = await Group.create({ name: "Salinas" });
      const season = await Season.create({
        name: "Spring 2024",
        start_date: "2024-03-15 00:00:00",
        end_date: "2025-06-01 11:59:00",
        is_active: true,
        group_id: group.id,
      });
      const response = await request(app).delete(`/season/delete/${season.id}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
