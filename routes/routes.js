const express = require("express");
const router = express.Router();
const { signin, signup } = require("../controllers/user")

router.post("/signup", signup);

router.post("/login", signin);


module.exports = router;