const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/private", auth, (req, res) => {
  res.json("You are authorized");
});

module.exports = router;
