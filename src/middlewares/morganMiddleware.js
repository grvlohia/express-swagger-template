const morgan = require("morgan");
const logger = require("../common/logger");

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// middleware for logging start of request
const logHttpRequest = morgan(
  ":remote-addr - :method :url HTTP/:http-version :referrer :user-agent",
  {
    immediate: true,
    stream,
    skip,
  }
);

const logHttpResponse = morgan(
  ":remote-addr - :method :url :status :res[content-length] :response-time ms :referrer :user-agent",
  {
    stream,
    skip,
  }
);

module.exports = {
  logHttpRequest,
  logHttpResponse,
};
