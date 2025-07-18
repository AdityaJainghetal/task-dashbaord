const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  checkout: {
    type: mongoose.Schema.ObjectId,
    ref: "Checkout",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
