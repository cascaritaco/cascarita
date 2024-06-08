"use strict";

const util = require("util");

if (typeof TextEncoder === "undefined") {
  global.TextEncoder = util.TextEncoder;
}

if (typeof TextDecoder === "undefined") {
  global.TextDecoder = util.TextDecoder;
}
