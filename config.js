// config.js
const { cleanEnv, str, port } = require("envalid");
const dotenv = require("dotenv");

dotenv.config();

// Validate environment variables
const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT_SERVICE1: port({ default: 3000 }),
  PORT_MONGO: port({ default: 27017 }),
  MONGO_USERNAME: str(),
  MONGO_PASSWORD: str(),
});

module.exports = env;
