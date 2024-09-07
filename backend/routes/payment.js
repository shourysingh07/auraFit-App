const express=require('express')
const router = express.Router()
const {createCheckout} = require('../controllers/payment')

router.route("/create-checkout-session").post(createCheckout);

module.exports=router