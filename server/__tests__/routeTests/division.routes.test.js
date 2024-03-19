"use strict";

const request = require("supertest");
const express = require("express");
const divisionController = require("../controllers/division.controller");
const divisionRoutes = require("../routes/division.routes");
const app = express();
app.use(express.json());
app.use("/divisions", divisionRoutes);

jest.mock("../controllers/division.controller", () => ({
    create: jest.fn(),
    update: jest.fn(),
    archiveByGroupId: jest.fn(),
    getByGroupId: jest.fn(),
    getDeletedDivisionsByGroupId: jest.fn(),
    delete: jest.fn(),
}));

describe("Division Routes", () => {
    it("should handle POST / to create a new division", async () => {
        divisionController.create.mockImplementation((req, res) => {
            res.status(201).json({ success: true, data: { name: "TestDivision" } });
        });

        const response = await request(app)
        .post("/divisions")
        .send({ group_id: 1, name: "TestDivision" });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            success: true,
            data: { name: "TestDivision" },
        });
    });
    it("should handle PUT /:id to update a division", async () => {
        divisionController.update.mockImplementation((req, res) => {
            res.status(200).json({ success: true, data: { id: 1, name: "UpdatedDivision" } });
        });

        const response = await request(app)
            .put("/divisions/1")
            .send({ group_id: 1, name: "UpdatedDivision" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            data: { id: 1, name: "UpdatedDivision" },
        });
    });

    it("should handle PUT /archive/:groupId to archive divisions by GroupID", async () => {
        divisionController.archiveByGroupId.mockImplementation((req, res) => {
            res.status(200).json({ message: "Division archived successfully" });
        });

        const response = await request(app).put("/divisions/archive/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Division archived successfully" });
    });

    it("should handle GET /group/:groupId to get divisions by GroupID", async () => {
        divisionController.getByGroupId.mockImplementation((req, res) => {
            res.status(200).json([{ id: 1, name: "Division1" }]);
        });

        const response = await request(app).get("/divisions/group/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, name: "Division1" }]);
    });

    it("should handle GET /history/group/:groupId to get deleted divisions by GroupID from DivisionsHistory", async () => {
        divisionController.getDeletedDivisionsByGroupId.mockImplementation((req, res) => {
            res.status(200).json([{ division_id: 1, archived_at: new Date() }]);
        });

        const response = await request(app).get("/divisions/history/group/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ division_id: 1, archived_at: expect.any(String) }]);
    });

    it("should handle DELETE /:id to delete a division by ID", async () => {
        divisionController.delete.mockImplementation((req, res) => {
            res.status(200).json({ message: "Division deleted successfully" });
        });

        const response = await request(app).delete("/divisions/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Division deleted successfully" });
    });

});
