const imagekit = require("../config/imageKit");
const CheckoutPage = require("../models/CheckoutModule");
const User = require("../models/userModule");
const asyncHandler = require("express-async-handler");


const createCheckoutPage = asyncHandler(async (req, res) => {
  const {
    title,
    product,
    buttonText,
    colors,
    font,
    formFields,
    utmParameters,
    productimage,
  } = req.body;

  
  if (!product || !product.name || !product.price) {
    return res.status(400).json({ message: "Product name and price are required" });
  }

  let uploadedImages = [];
  

  if (productimage && Array.isArray(productimage)) {
    try {
    
      for (const image of productimage) {
        
        if (image.startsWith('data:image')) {
          const result = await imagekit.upload({
            file: image,
            fileName: `${Date.now()}_${product.name.replace(/\s+/g, '_')}.jpg`,
            folder: "/checkout_pages/products",
          });
          uploadedImages.push(result.url);
        } else {
          
          uploadedImages.push(image);
        }
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return res.status(500).json({ message: "Error uploading product images" });
    }
  }

  const checkoutPage = await CheckoutPage.create({
    owner: req.user.id,
    title,
    product: {
      name: product.name,
      price: product.price,
      image: uploadedImages.length > 0 ? uploadedImages : undefined,
    },
    buttonText: buttonText || "Buy Now",
    colors: colors || {
      primary: "#4f46e5",
      secondary: "#ffffff",
    },
    font: font || "Arial",
    formFields: formFields || {
      name: true,
      email: true,
      phone: true,
      address: false,
    },
    utmParameters: utmParameters || {},
  });

  res.status(201).json(checkoutPage);
});














const getCheckoutPageById = async (req, res) => {
  try {
    const checkouts = await CheckoutPage.find({ owner: req.params.userId }).populate("owner");
    if (!checkouts.length) {
      return res.status(404).json({ message: "No checkout pages found for user" });
    }
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




const getCheckoutPage = asyncHandler(async (req, res) => {
  
  if (!req.params.id) {
    res.status(400);
    throw new Error("Checkout page ID is required");
  }


  if (req.params.id === 'undefined' || req.params.id === 'null') {
    res.status(400);
    throw new Error("Invalid checkout page ID");
  }

  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const checkoutPage = await CheckoutPage.findOne({
    _id: req.params._id,
    owner: req.user.id,
  }).select('-__v');

  if (!checkoutPage) {
    res.status(404);
    throw new Error("Checkout page not found or you don't have permission");
  }

  res.status(200).json({
    success: true,
    data: checkoutPage
  });
});




const updateCheckoutPage = asyncHandler(async (req, res) => {
  let checkoutPage = await CheckoutPage.findOne({
    _id: req.params.id,
    owner: req.user.id,
  });

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
    productimage, 
  } = req.body;

  let uploadedImages = [];
  
  if (productimage && Array.isArray(productimage)) {
    try {
      // Upload each new image to ImageKit
      for (const image of productimage) {
        if (image.startsWith('data:image')) {
          const result = await imagekit.upload({
            file: image,
            fileName: `${Date.now()}_${product?.name?.replace(/\s+/g, '_') || 'product'}.jpg`,
            folder: "/checkout_pages/products",
          });
          uploadedImages.push(result.url);
        } else {
          uploadedImages.push(image);
        }
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return res.status(500).json({ message: "Error uploading product images" });
    }
  }

  if (title) checkoutPage.title = title;
  if (buttonText) checkoutPage.buttonText = buttonText;
  if (colors) checkoutPage.colors = colors;
  if (font) checkoutPage.font = font;
  if (formFields) checkoutPage.formFields = formFields;
  if (utmParameters) checkoutPage.utmParameters = utmParameters;

  // Update product fields if they exist
  if (product) {
    if (product.name) checkoutPage.product.name = product.name;
    if (product.price) checkoutPage.product.price = product.price;
    // Only update images if new ones were uploaded
    if (uploadedImages.length > 0) {
      checkoutPage.product.image = uploadedImages;
    }
  }
  checkoutPage.updatedAt = Date.now();

  const updatedCheckoutPage = await checkoutPage.save();

  res.status(200).json(updatedCheckoutPage);
});

const deleteCheckoutPage = asyncHandler(async (req, res) => {
  const checkoutPage = await CheckoutPage.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id,
  });

  if (!checkoutPage) {
    res.status(404);
    throw new Error("Checkout page not found");
  }

  res.status(200).json({ message: "Checkout page removed" });
});

module.exports = {
  createCheckoutPage,
  getCheckoutPageById,
  getCheckoutPage,
  updateCheckoutPage,
  deleteCheckoutPage,
};