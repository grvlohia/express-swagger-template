require("dotenv").config();

const express = require("express");

const useSwaggerUi = require("./config/configSwaggerUi");
const logger = require("./common/logger");
const {
  logHttpRequest,
  logHttpResponse,
} = require("./middlewares/morganMiddleware");
const {
  openApiValidatorMiddleware,
} = require("./middlewares/openApiValidator");
const Logger = require("./common/logger");

const app = express();
const port = process.env.SERVICE_PORT || 5000;

// log HTTP request
app.use(logHttpRequest);
app.use(logHttpResponse);

// add body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add swagger and openapi-validator
useSwaggerUi(app);
app.use(openApiValidatorMiddleware);

// routes
app.use("/livenessProbe", require("./routers/heartbeat"));
app.use("/readinessProbe", require("./routers/heartbeat"));

// error handler
app.use((err, req, res, next) => {
  Logger.error(err.message);
  res.status(500).send();
});

app.listen(port, () => {
  logger.info("Server started on port: " + port);
});
