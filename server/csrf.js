const { doubleCsrf } = require("csrf-csrf");
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => "secret",
});

module.exports = { generateToken, doubleCsrfProtection };
