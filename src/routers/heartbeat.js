const router = require("express").Router();
const { heartbeat } = require("../controllers/heartbeat");

router.get("/", heartbeat);

module.exports = router;