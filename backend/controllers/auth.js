const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  //   console.log(req.body);
  try {
    const user = await User.create({ ...req.body, cartItems:[] });
    const token = await user.createJWT();
    // console.log(token);
    res
      .status(StatusCodes.CREATED)
      .json({ token, name: user.name, check: true });
  } catch (error) {
    res.json({
      msg: `this email ${req.body.email} already exists`,
      check: false,
    });
  }
};

const login = async (req, res) => {
  //   console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "This email not yet register", check: false });
    return;
  }
  //   console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Incorrect Password", check: false });
    return;
  }
  const token = await user.createJWT();
  const userData = {
    name: user.name,
    email: user.email,
  };
  res.status(StatusCodes.CREATED).json({ token, userData, check: true });
};

module.exports = { register, login };
