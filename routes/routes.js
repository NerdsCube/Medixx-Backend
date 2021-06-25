const express = require("express");
const router = express.Router();
const { signin, signup, getUsers, getUser } = require("../controllers/user")

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;