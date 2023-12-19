"use strict";

const { User } = require("../models");
const passport = require("passport");

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

        try {
            await User.build(newUser).validate();

            const isEmailUnique = await _checkUniqueEmail(newUser.email);
            if (!isEmailUnique) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const result = await User.create(newUser);

        return res.status(201).json({
            success: true,
            data: result
        });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    var logInUser = function(req, res, next){
        passport.authenticate('local', (err, user, info) => {
            if (err) {
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (!user) {
              return res.status(401).json({ error: 'Incorrect Credentials' });
            }
            const welcomeMessage = `Welcome, ${user.firstName} ${user.lastName}`;
            res.json({ message: welcomeMessage });
          })(req, res, next);
    }

    var _checkUniqueEmail = async function (inputEmail) {
        const existingUser = await User.findOne({where: {email: inputEmail}})
        return !existingUser;
    }

    return{
        registerUser,
        logInUser,
        _checkUniqueEmail
    }
}

module.exports = UserController();