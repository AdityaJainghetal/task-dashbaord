const express = require("express");
const verifyToken =  require("../middleware/authMiddleware")
const router = express.Router();
const authorizeRole = require("../middleware/roleMiddleware")
router.get("/admin",verifyToken,authorizeRole("admin") ,(req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/user",authorizeRole("admin", "user") , verifyToken,(req, res) => {
  res.json({ message: "Welcome user" });
});

module.exports = router;
