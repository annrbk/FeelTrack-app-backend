import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user.id }, process.env.SECRET_KEY);
  };

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      const token = generateToken(user);
      return res.status(200).json({
        message: "User login successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          number: user.number,
          dateOfBirth: user.dateOfBirth,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error login user" });
  }
};
