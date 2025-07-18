const express = require("express");
const router = express.Router();
const {
  getCheckoutPages,
  updateCheckoutPage,
  deleteCheckoutPage,
} = require("../controller/admincontroller");

router.get("/", getCheckoutPages);
router.get("/checkout/:id", getCheckoutPages);

router.put("/checkout/:id", updateCheckoutPage);
router.delete("/checkout/:id", deleteCheckoutPage);

module.exports = router;
