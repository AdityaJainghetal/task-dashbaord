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
    productimage:[
     { type:String},
    ],
   
 
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
      type: Boolean,
      default: true,
    },
    email: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Boolean,
      default: true,
    },
    address: {
      type: Boolean,
      default: false,
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
