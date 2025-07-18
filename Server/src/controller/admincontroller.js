const asyncHandler = require("express-async-handler");
const User = require("../models/userModule");
const Checkout = require("../models/CheckoutModule");
const Admin = require("../models/adminModule");

// @desc Get all checkout pages assigned to admins
// @route GET /api/checkout-pages
// @access Private/Admin
const getCheckoutPages = asyncHandler(async (req, res) => {
  const checkoutPages = await Checkout.find({});
  res.status(200).json(checkoutPages);
  console.log(checkoutPages,"checkoutPages")
});

// @desc Update a specific checkout page
// @route PUT /api/checkout-pages/:id
// @access Private/Admin
const updateCheckoutPage = asyncHandler(async (req, res) => {
  const checkoutPage = await Checkout.findById(req.params.id);

  if (!checkoutPage) {
    res.status(404);
    throw new Error("Checkout page not found");
  }

  const {
    title,
    product,
    buttonText,
    colors,
    font,
    formFields,
    utmParameters,
  } = req.body;

  // Update fields
  if (title) checkoutPage.title = title;
  if (buttonText) checkoutPage.buttonText = buttonText;
  if (colors) checkoutPage.colors = colors;
  if (font) checkoutPage.font = font;
  if (formFields) checkoutPage.formFields = formFields;
  if (utmParameters) checkoutPage.utmParameters = utmParameters;

  if (product) {
    if (product.name) checkoutPage.product.name = product.name;
    if (product.price) checkoutPage.product.price = product.price;
    if (product.images) checkoutPage.product.images = product.images;
  }

  const updatedCheckoutPage = await checkoutPage.save();
  res.status(200).json(updatedCheckoutPage);
});

// @desc Delete a checkout page
// @route DELETE /api/checkout-pages/:id
// @access Private/Admin
const deleteCheckoutPage = asyncHandler(async (req, res) => {
  const checkoutPage = await Checkout.findByIdAndDelete(req.params.id);

  if (!checkoutPage) {
    res.status(404);
    throw new Error("Checkout page not found");
  }

  res.status(200).json({ message: "Checkout page removed" });
});

module.exports = {
  getCheckoutPages,
  updateCheckoutPage,
  deleteCheckoutPage,
};
