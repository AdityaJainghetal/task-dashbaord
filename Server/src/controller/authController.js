const User = require("../models/userModule");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword,role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered with username ${username}` });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    console.log(user, "useruser");

    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "Aditya", {
      expiresIn: "10d",
    });

    // ✅ Send token and user info (without password)
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  register,
  login,
};
