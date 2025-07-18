// const imagekit = require("../config/imageKit");
// const CheckoutPage = require("../models/CheckoutModule");
// const User = require("../models/userModule");
// const asyncHandler = require("express-async-handler");

// // @desc    Create a new checkout page
// // @route   POST /api/checkout-pages
// // @access  Private
// const createCheckoutPage = asyncHandler(async (req, res) => {
//   const {
//   title,
//   product,
//   buttonText,
//   colors,
//   font,
//   formFields,
//   utmParameters,
//   productimage,
// } = req.body;

// // Validate product fields
// if (!product || !product.name || !product.price) {
//   return res.status(400).json({ message: "Product name and price are required" });
// }




//   // Validate required fields
// //   if (!title || !product || !productname || !productprice) {
// //     res.status(400);
// //     throw new Error("Title, product name, and product price are required");
// //   }

//   // Create the checkout page
//  const checkoutPage = await CheckoutPage.create({
//   owner: req.user.id,
//   title,
//   product,
//   buttonText,
//   colors,
//   font,
//   formFields,
  
//   utmParameters,

   
//     buttonText: buttonText || "Buy Now",
//     colors: colors || {
//       primary: "#4f46e5",
//       secondary: "#ffffff",
//     },
//     font: font || "Arial",
//     formFields: formFields || {
//       name: true,
//       email: true,
//       phone: true,
//       address: false,
//     },
//     utmParameters: utmParameters || {},
//   });

//   res.status(201).json(checkoutPage);
// });







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
    productimage, // This should be an array of base64 encoded images or URLs
  } = req.body;

  // Validate product fields
  if (!product || !product.name || !product.price) {
    return res.status(400).json({ message: "Product name and price are required" });
  }

  let uploadedImages = [];
  
  // If productimage is provided and is an array
  if (productimage && Array.isArray(productimage)) {
    try {
      // Upload each image to ImageKit
      for (const image of productimage) {
        // Check if it's a base64 image or already a URL
        if (image.startsWith('data:image')) {
          const result = await imagekit.upload({
            file: image,
            fileName: `${Date.now()}_${product.name.replace(/\s+/g, '_')}.jpg`,
            folder: "/checkout_pages/products",
          });
          uploadedImages.push(result.url);
        } else {
          // If it's already a URL, just add it to the array
          uploadedImages.push(image);
        }
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return res.status(500).json({ message: "Error uploading product images" });
    }
  }

  // Create the checkout page
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














// @desc    Get all checkout pages for the logged-in user
// @route   GET /api/checkout-pages
// @access  Private
// const getCheckoutPages = asyncHandler(async (req, res) => {
//   const checkoutPages = await CheckoutPage.find({ owner: req.user._id });
//   res.status(200).json(checkoutPages);
// });


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



// @desc    Get a single checkout page by ID
// @route   GET /api/checkout-pages/:id
// @access  Private

const getCheckoutPage = asyncHandler(async (req, res) => {
  
  if (!req.params.id) {
    res.status(400);
    throw new Error("Checkout page ID is required");
  }

  // Validate ID is not 'undefined' or 'null'
  if (req.params.id === 'undefined' || req.params.id === 'null') {
    res.status(400);
    throw new Error("Invalid checkout page ID");
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const checkoutPage = await CheckoutPage.findOne({
    _id: req.params._id,
    owner: req.user.id,
  }).select('-__v'); // Exclude version key

  if (!checkoutPage) {
    res.status(404);
    throw new Error("Checkout page not found or you don't have permission");
  }

  res.status(200).json({
    success: true,
    data: checkoutPage
  });
});


// @desc    Update a checkout page
// @route   PUT /api/checkout-pages/:id
// @access  Private
// const updateCheckoutPage = asyncHandler(async (req, res) => {
//   let checkoutPage = await CheckoutPage.findOne({
//     _id: req.params.id,
//     owner: req.user.id,
//   });

//   if (!checkoutPage) {
//     res.status(404);
//     throw new Error("Checkout page not found");
//   }

//   const {
//     title,
//     product,
//     buttonText,
//     colors,
//     font,
//     formFields,
//     utmParameters,
//   } = req.body;

//   // Update fields if they exist in the request
//   if (title) checkoutPage.title = title;
//   if (buttonText) checkoutPage.buttonText = buttonText;
//   if (colors) checkoutPage.colors = colors;
//   if (font) checkoutPage.font = font;
//   if (formFields) checkoutPage.formFields = formFields;
//   if (utmParameters) checkoutPage.utmParameters = utmParameters;

//   // Update product fields if they exist
//   if (product) {
//     if (product.name) checkoutPage.product.name = product.name;
//     if (product.price) checkoutPage.product.price = product.price;
//     if (product.images) checkoutPage.product.images = product.images;
//   }

//   const updatedCheckoutPage = await checkoutPage.save();

//   res.status(200).json(updatedCheckoutPage);
// });


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
    productimage, // Array of new images (base64 or URLs)
  } = req.body;

  let uploadedImages = [];
  
  // Handle image uploads if new images are provided
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

  // Update fields if they exist in the request
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

  // Update the timestamp
  checkoutPage.updatedAt = Date.now();

  const updatedCheckoutPage = await checkoutPage.save();

  res.status(200).json(updatedCheckoutPage);
});

// @desc    Delete a checkout page
// @route   DELETE /api/checkout-pages/:id
// @access  Private
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