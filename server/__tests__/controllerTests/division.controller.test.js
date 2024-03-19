"use strict";

const DivisionController = require("../../controllers/division.controller");
const { Division, DivisionHistory } = require("../../models");
const validator = require("validator");

jest.mock("../../models", () => ({
    Division: {
        findOne: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        findAll: jest.fn(),
    },
        DivisionHistory: {
        findAll: jest.fn(),
    },
}));

jest.mock("validator", () => ({
    isInt: jest.fn(),
    isLength: jest.fn(),
}));

describe("Division Controller", () => {
    describe("createDivision", () => {
        it("should create a new division with valid data", async () => {
            const req = {
                body: {
                    group_id: 1,
                    name: "Test Division",
                    },
                };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            Division.findOne.mockResolvedValueOnce(null);
            Division.create.mockResolvedValueOnce({
                id: 1,
                group_id: 1,
                name: "Test Division",
            });

            validator.isInt.mockReturnValueOnce(true);
            validator.isLength.mockReturnValueOnce(true);

            await DivisionController.create(req, res);

            expect(validator.isInt).toHaveBeenCalledWith(1, { min: 1 });
            expect(validator.isLength).toHaveBeenCalledWith("Test Division", { min: 1, max: 100 });
            expect(Division.findOne).toHaveBeenCalledWith({ where: { group_id: 1, name: "Test Division" } });
            expect(Division.create).toHaveBeenCalledWith({ group_id: 1, name: "Test Division" });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, group_id: 1, name: "Test Division" });
        });
        it("should handle validation error for division name length", async () => {
            const req = {
                body: {
                    group_id: 1,
                    name: "", // Empty name
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            validator.isInt.mockReturnValueOnce(true);
            validator.isLength.mockReturnValueOnce(false);

            await DivisionController.create(req, res);

            expect(validator.isLength).toHaveBeenCalledWith("", { min: 1, max: 100 });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Division name must be between 1 and 100 characters' });
        });

        it("should handle error when division name is already taken", async () => {
            const req = {
                body: {
                    group_id: 1,
                    name: "Existing Division",
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            validator.isInt.mockReturnValueOnce(true);
            validator.isLength.mockReturnValueOnce(true);

            Division.findOne.mockResolvedValueOnce({ id: 1, group_id: 1, name: "Existing Division" });

            await DivisionController.create(req, res);

            expect(Division.findOne).toHaveBeenCalledWith({ where: { group_id: 1, name: "Existing Division" } });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Division name is already taken.' });
        });
    });  

    describe("archiveByGroupId", () => {
        it("should archive divisions by GroupID", async () => {
            const req = {
                params: {
                    groupId: 1,
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            Division.findAll.mockResolvedValueOnce([
                { id: 1, group_id: 1, name: "Division 1" },
                { id: 2, group_id: 1, name: "Division 2" },
            ]);

            DivisionHistory.create.mockResolvedValueOnce();

            await DivisionController.archiveByGroupId(req, res);

            expect(Division.findAll).toHaveBeenCalledWith({ where: { group_id: 1 } });
            expect(DivisionHistory.create).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Division archived successfully' });
        });
    });

    describe("updateDivision", () => {
        it("should update a division with valid data", async () => {
            const req = {
                params: { id: 1 },
                body: { group_id: 1, name: "New Division Name" }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock Division.findByPk to return a division
            Division.findByPk = jest.fn().mockResolvedValueOnce({
                id: 1,
                group_id: 1,
                name: "Old Division Name",
                update: jest.fn().mockResolvedValueOnce({ id: 1, group_id: 1, name: "New Division Name" })
            });
    
            // Call the controller function
            await divisionController.update(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, group_id: 1, name: "New Division Name" });
        });
    
        it("should handle validation error for invalid group ID during update", async () => {
            // Mock request and response objects with invalid group ID
            const req = {
                params: { id: 1 },
                body: { group_id: -1, name: "New Division Name" }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Call the controller function
            await divisionController.update(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid group ID' });
        });
    
        it("should handle validation error for division name length during update", async () => {
            // Mock request and response objects with invalid division name length
            const req = {
                params: { id: 1 },
                body: { group_id: 1, name: "" }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Call the controller function
            await divisionController.update(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Division name must be between 1 and 100 characters' });
        });
    
        it("should handle error when division not found during update", async () => {
            // Mock request and response objects with non-existing division ID
            const req = {
                params: { id: 999 },
                body: { group_id: 1, name: "New Division Name" }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Call the controller function
            await divisionController.update(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Division not found' });
        });
    
        it("should handle error when updated division name is already taken", async () => {
            // Mock request and response objects with conflicting division name
            const req = {
                params: { id: 1 },
                body: { group_id: 1, name: "Existing Division Name" }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock Division.findByPk to return the existing division
            Division.findByPk = jest.fn().mockResolvedValueOnce({
                id: 1,
                group_id: 1,
                name: "Existing Division Name"
            });
    
            // Call the controller function
            await divisionController.update(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Division name is already taken.' });
        });
    });

    describe("getDivisionsByGroupId", () => {
        it("should get divisions by group ID", async () => {
            const req = {
                params: { groupId: 1 }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            Division.findAll = jest.fn().mockResolvedValueOnce([
                { id: 1, group_id: 1, name: "Division 1" },
                { id: 2, group_id: 1, name: "Division 2" }
            ]);
    
            // Call the controller function
            await divisionController.getByGroupId(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, group_id: 1, name: "Division 1" },
                { id: 2, group_id: 1, name: "Division 2" }
            ]);
        });
    
        it("should handle error when getting divisions by group ID", async () => {
            const req = {
                params: { groupId: 999 } // Invalid group ID
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock Division.findAll to throw an error
            Division.findAll = jest.fn().mockRejectedValueOnce(new Error("Database error"));
    
            // Call the controller function
            await divisionController.getByGroupId(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });

    describe("deleteDivision", () => {
        it("should delete a division", async () => {
            // Mock request and response objects
            const req = {
                params: { id: 1 } // Existing division ID
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock Division.findByPk to return a division
            Division.findByPk = jest.fn().mockResolvedValueOnce({ id: 1, group_id: 1, name: "Division 1" });
    
            // Mock Division.update and DivisionHistory.create to return resolved promises
            Division.update = jest.fn().mockResolvedValueOnce();
            DivisionHistory.create = jest.fn().mockResolvedValueOnce();
    
            // Mock Division.destroy to return a resolved promise
            Division.destroy = jest.fn().mockResolvedValueOnce();
    
            // Call the controller function
            await divisionController.delete(req, res);
    
            // Assertions
            expect(Division.findByPk).toHaveBeenCalledWith(1);
            expect(Division.update).toHaveBeenCalledWith({ archived: true });
            expect(DivisionHistory.create).toHaveBeenCalledWith({ division_id: 1, archived_at: expect.any(Date) });
            expect(Division.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Division deleted successfully' });
        });
    
        it("should handle error when division not found during deletion", async () => {
            // Mock request and response objects
            const req = {
                params: { id: 999 } // Non-existing division ID
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock Division.findByPk to return null (division not found)
            Division.findByPk = jest.fn().mockResolvedValueOnce(null);
    
            // Call the controller function
            await divisionController.delete(req, res);
    
            // Assertions
            expect(Division.findByPk).toHaveBeenCalledWith(999);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Division not found' });
        });
    
        it("should handle error when archiving division fails during deletion", async () => {
            // Mock request and response objects
            const req = {
                params: { id: 1 } // Existing division ID
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock Division.findByPk to return a division
            Division.findByPk = jest.fn().mockResolvedValueOnce({ id: 1, group_id: 1, name: "Division 1" });
    
            // Mock Division.update to throw an error
            Division.update = jest.fn().mockRejectedValueOnce(new Error("Database error"));
    
            // Call the controller function
            await divisionController.delete(req, res);
    
            // Assertions
            expect(Division.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
    describe("getDeletedDivisionsByGroupId", () => {
        it("should get deleted divisions by group ID", async () => {
            const req = {
                params: { groupId: 1 }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            DivisionHistory.findAll = jest.fn().mockResolvedValueOnce([
                { id: 1, group_id: 1, name: "Division 1", archived_at: new Date() },
                { id: 2, group_id: 1, name: "Division 2", archived_at: new Date() }
            ]);
    
            // Call the controller function
            await divisionController.getDeletedDivisionsByGroupId(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { id: 1, group_id: 1, name: "Division 1", archived_at: expect.any(Date) },
                { id: 2, group_id: 1, name: "Division 2", archived_at: expect.any(Date) }
            ]);
        });
    
        it("should handle error when getting deleted divisions by group ID", async () => {
            const req = {
                params: { groupId: 999 } // Invalid group ID
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
    
            // Mock DivisionHistory.findAll to throw an error
            DivisionHistory.findAll = jest.fn().mockRejectedValueOnce(new Error("Database error"));
    
            // Call the controller function
            await divisionController.getDeletedDivisionsByGroupId(req, res);
    
            // Assertions
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
});