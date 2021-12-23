const path = require("path");
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");

module.exports = function (app) {
  const filePath = path.join(__dirname, "../../apis.yaml");
  const swaggerDoc = yaml.load(filePath);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
