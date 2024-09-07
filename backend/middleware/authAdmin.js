const express = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).send({ msg: "Authentication failed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    // console.log(req.body);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ msg: "Authentication failed" });
  }
};

module.exports = authAdmin;
