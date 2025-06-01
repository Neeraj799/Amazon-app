import { userSignUpValidation } from "../helpers/authValidation.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/createToken.js";

const signup = async (req, res) => {
  try {
    const { error } = userSignUpValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.log(error);
      return res.status(403).json({ error: error.details });
    }
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({
      success: true,
      userData: newUser,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error.message);

    res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "User login successfully",
      success: true,
      user,
      token,
      email,
      id: user._id,
      name: user.fullName,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { signup, login };
