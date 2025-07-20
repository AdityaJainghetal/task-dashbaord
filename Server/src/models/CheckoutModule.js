// const mongoose = require("mongoose");

// const checkoutPageSchema = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//   },
//   title: {
//     type: String,
//   },

//   productname: {
//     type: String,
//   },
//   productprice: {
//     type: Number,
//   },
//   productimage: {
//     type: [String], // Array of image URLs
//     default: [],
//   },


//   buttonText: {
//     type: String,
//     default: "Buy Now",
//   },
//   colors: {
//     primary: {
//       type: String,
//       default: "#4f46e5",
//     },
//     secondary: {
//       type: String,
//       default: "#ffffff",
//     },
//   },
//   font: {
//     type: String,
//     default: "Arial",
//   },
//   formFields: {
//     name: {
//       type: String,
//       default: true,
//     },
//     email: {
//        type: String,
//       default: true,
//     },
//     phone: {
//        type: String,
//       default: true,
//     },
//     address: {
//        type: String,
//       default: false,
//     },
//   },
//   utmParameters: {
//     source: String,
//     medium: String,
//     campaign: String,
//     term: String,
//     content: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Checkout", checkoutPageSchema);


const mongoose = require("mongoose");

const checkoutPageSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  productname: {
    type: String,
  },
  productprice: {
    type: Number,
  },
  productimage: {
    type: [String], // Array of image URLs
    default: [],
  },
  buttonText: {
    type: String,
    default: "Buy Now",
  },
  colors: {
    primary: {
      type: String,
      default: "#4f46e5",
    },
    secondary: {
      type: String,
      default: "#ffffff",
    },
  },
  font: {
    type: String,
    default: "Arial",
  },
  formFields: {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },
  utmParameters: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Checkout", checkoutPageSchema);