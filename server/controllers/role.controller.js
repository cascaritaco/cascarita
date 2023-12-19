"use strict";
const  { Role } = require("../models");

const RoleController = function(){

    var createRole = async function(req, res){

        const newRole  = {
            role_type: req.body.role_type,
        }

        const result = await Role.create(newRole);

        return res.status(201).json({
            success: true,
            data: result
        })
    }

    return{
        createRole,
    }
}

module.exports = RoleController();
