const express = require("express");
const router = express.Router();
const {
  createCheckoutPage,
  getCheckoutPageById,
  getCheckoutPage,
  updateCheckoutPage,
  deleteCheckoutPage,
} = require("../controller/checkoutController");
const verifyToken = require("../middleware/authMiddleware");
const {protect } = require("../middleware/checkoutmiddleware")
// Protect all routes with the verifyToken middleware
router.use(verifyToken);


router.post('/', protect,createCheckoutPage);
router.get('/user/:userId',protect, getCheckoutPageById);

router.route("/:id" , protect)
  .get(getCheckoutPage)
  .put(updateCheckoutPage)
  .delete(deleteCheckoutPage);

module.exports = router;