var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=>{
  res.redirect('/auth/signin')
})
router.use("/auth", require("./user/user.controller"));
router.use("/dashboard", require("./dashboard/dashboard.controller"));

module.exports = router;
