const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const authAdmin = require("./middleware/authAdmin");
const paymentRouter = require("./routes/payment");
const cartRouter = require("./routes/cart");
const authUser = require("./middleware/authentication");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("", authRouter);
app.use("/product", authAdmin, productRouter);
app.use("/", productRouter);
app.use("/payment", authUser, paymentRouter);
app.use("/cart", authUser, cartRouter);

// 4000003560000008

// models

app.get("/", (req, res) => {
  res.send("Welcome To EShop");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connect with database");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
