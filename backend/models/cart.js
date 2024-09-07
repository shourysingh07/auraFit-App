const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  addedBy: {
    type: mongoose.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  items: [{ _id: String, quantity: Number }],
});

module.exports = mongoose.model("Cart", CartSchema);
