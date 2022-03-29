const rateLimit = require('express-rate-limit');
const dotenv = require("dotenv");

//env config 
dotenv.config();

module.exports.rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min windows size in miliseconds
  max: parseInt(process.env.REQUEST_LIMIT_PER_MIN),
  message: 'You have exceeded the no of requests allowed per minute!', 
  headers: true,
});