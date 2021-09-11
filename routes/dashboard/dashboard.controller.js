const express = require("express");
const router = express.Router();
const { dashboard } = require("./dashboard.service");
const loginChecker = require("../../tools/loginChecker");
router.get("/", loginChecker, dashboard);

module.exports = router;
