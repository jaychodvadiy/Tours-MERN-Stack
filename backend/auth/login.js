const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findone({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invadilid email and password" });
  }
  const token = jwt.sign({ id: user._id }, process.env, JSW_SECRET, {
    expiresIn: "2day",
  });
  res.status(200).json({ message: "Login Successfully", token });
});
