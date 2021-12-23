const Logger = require("../common/logger");

module.exports.heartbeat = (req, res) => {
  Logger.info("Invoked heartbeat API");
  res.status(200).json({
    timestamp: new Date().toISOString(),
    status: "UP",
  });
};
