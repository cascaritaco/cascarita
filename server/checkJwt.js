const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: "https://dev-2vszya8j41e1n3fe.us.auth0.com/api/v2/", // Ensure this matches the value in your Auth0 application
  issuerBaseURL: "https://dev-2vszya8j41e1n3fe.us.auth0.com/",
  algorithms: ["RS256"], // Ensure you're using RS256
});

module.exports = checkJwt;
