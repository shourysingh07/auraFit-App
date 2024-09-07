const express = require("express");
const router = express.Router();

const {
  addCartItem,
  getCartItems,
  decreaseQuantity,
  deleteItem,
  deleteAllItem,
} = require("../controllers/cart");

router.route("/addCartItem").post(addCartItem);
router.route("/decreaseQuantity").post(decreaseQuantity);
router.route("/deleteItem").post(deleteItem);
router.route("/deleteAllItem").post(deleteAllItem);
router.route("/getCartItem").get(getCartItems);

module.exports = router;
