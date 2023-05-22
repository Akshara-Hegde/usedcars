const express = require("express");

console.log("auth");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controller/userController");
console.log("auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
const validateToken = require("../middlewares/validatetoken");

router.get("/current", validateToken, currentUser);

module.exports = router;
