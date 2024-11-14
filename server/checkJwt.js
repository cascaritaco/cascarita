const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const checkJwt = auth({
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuerBaseURL: process.env.REACT_APP_AUTH0_PROVIDER,
  algorithms: ["RS256"], // Ensure you're using RS256
});

module.exports = checkJwt;
