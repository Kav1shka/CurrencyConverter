const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");
const { validateRegister, validateLogin } = require("../validation.js");

const authController = {
  
  // User registration
  register: async (req, res) => {
    try {
      const { email, password, confirmPassword, firstName, lastName } = req.body;

      const errorMessage = validateRegister(email, password, confirmPassword, firstName, lastName);
      if (errorMessage) return res.status(400).json({ message: errorMessage });

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already in use" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      await newUser.save();

      res.status(201).json({ message: "Registration successful. Please log in." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // User login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const errorMessage = validateLogin(email, password);
      if (errorMessage) return res.status(400).json({ message: errorMessage });

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = authController;
