const { doubleCsrf } = require("csrf-csrf");
require("dotenv").config();

const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
});

module.exports = { generateToken, doubleCsrfProtection };
