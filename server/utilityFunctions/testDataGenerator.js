"use strict";

const TestDb = require("../models");

const testDataGenerator = function () {

    const createDummyGroup = async function(groupName){
        let newGroupData = {
        name: groupName,
        street_address: "123 Main Street",
        city: "Sample City",
        state: "CA",
        zip_code: "12345",
        logo_url: "https://example.com/logo",
        }
        const sampleGroup = await TestDb.Group.create(newGroupData);
        return sampleGroup;
    };

    return {
        createDummyGroup
    }

};

module.exports = testDataGenerator();