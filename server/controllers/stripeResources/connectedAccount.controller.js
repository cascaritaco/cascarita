"use strict";

const ConnectAccountController = function () {
  var handleEvent = async function (req, res, next) {
    return res.status(200).json({ message: "hello world ! " });
  };
  return {
    handleEvent,
  };
};

module.exports = ConnectAccountController();
