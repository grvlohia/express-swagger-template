const path = require('path')
const OpenApiValidator = require('express-openapi-validator')

const specFile = path.join(__dirname, '../../apis.yaml');

module.exports.openApiValidatorMiddleware = OpenApiValidator.middleware({
    apiSpec: specFile,
    validateRequests: true,
    validateResponses: false,
    unknownFormats: ['string']
})