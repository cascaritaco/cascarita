"use strict";
const  { Group } = require("./../models");

const GroupController = function(){

    var createGroup = async function(req, res){

        const newGroup  = {
            name: req.body.name,
        }

        const result = await Group.create(newGroup);
        
        return res.status(201).json({
            success: true,
            data: result
        })
    }

    return{
        createGroup,
    }
}

module.exports = GroupController();