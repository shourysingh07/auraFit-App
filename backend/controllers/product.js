const express = require("express");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const NodeCache = require("node-cache");

const nodeCache = new NodeCache();

const addProduct = async (req, res) => {
  // console.log(req.body)
  try {
    const products=req.body;
    // req.body.createdBy = req.user.userId;
    // console.log(req.body);
    for (let product of products){
      await Product.create(product);
      console.log("success");
    }
    // const product = await Product.create(req.body);
    nodeCache.del("products");
    // console.log(product);
    res.status(StatusCodes.CREATED).json({ msg: "successful" });
  } catch (error) {
    res.send(error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const cachedProduct = nodeCache.get("products");
    if (cachedProduct) {
      const parseProduct = JSON.parse(cachedProduct);
      res.status(StatusCodes.OK).json(parseProduct);
    } else {
      const products = await Product.find({});
      nodeCache.set("products", JSON.stringify(products));
      // console.log(products);
      res.status(StatusCodes.OK).json(products);
    }
  } catch (error) {
    res.send({ msg: "getAllProduct Failed" });
  }
};

module.exports = { addProduct, getAllProducts };
