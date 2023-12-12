"use strict";
const  { User } = require("./../models");

const UserController = function(){

    var registerUser = async function(req, res){

        const newUser  = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            groupId: req.body.groupId,
            roleId: req.body.roleId,
        }

        const result = await User.create(newUser);
        
        return res.status(201).json({
            success: true,
            data: result
        })
    }

    return{
        registerUser,
    }
}

module.exports = UserController();