const express=require('express')
const router=express.Router()
const { addProduct, getAllProducts } = require("../controllers/product");

router.route('/addProduct').post(addProduct)
router.route('/getAllProduct').get(getAllProducts)

module.exports=router