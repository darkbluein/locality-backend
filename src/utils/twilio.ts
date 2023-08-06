require("dotenv").config();

import config from "../config";

const twclient = require("twilio")(config.twilio.sid, config.twilio.token);

export default twclient;
