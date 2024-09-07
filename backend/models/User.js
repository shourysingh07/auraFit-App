const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please Provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide password"],
    minlength: 2,
  },
  cartItems: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next(); // Continue with the save operation
});


// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.addItemToCart = async function (productId, quantity) {
  try {
    // Check if the product already exists in the cart
    const existingItem = this.cartItems.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      this.cartItems.push({ productId, quantity });
    }

    // Save the updated user document
    await this.save();
    return this.cartItems; // Return the updated cart items array
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
};

UserSchema.methods.decreaseQuantity = async function (productId, quantity) {
  try {
    // Check if the product already exists in the cart
    const existingItem = this.cartItems.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity -= quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      this.cartItems.push({ productId, quantity });
    }

    // Save the updated user document
    await this.save();
    return this.cartItems; // Return the updated cart items array
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
};

UserSchema.methods.deleteItem = async function (productId, quantity) {
  try {
    // Find the index of the item with matching productId
    const indexToRemove = this.cartItems.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (indexToRemove !== -1) {
      // Remove the item from the cartItems array
      this.cartItems.splice(indexToRemove, 1);

      // Save the updated user document
      await this.save();
      return this.cartItems; // Return the updated cart items array
    } else {
      throw new Error("Item not found in cart");
    } // Return the updated cart items array
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
};

UserSchema.methods.deleteAllItem = async function (productId, quantity) {
  try {
      this.cartItems=[];

      // Save the updated user document
      await this.save();
      return this.cartItems;
  } catch (error) {
    throw new Error("Failed to add item to cart");
  }
};

module.exports = mongoose.model("User", UserSchema);
