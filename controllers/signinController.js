import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
  const { email, password } = req.body;

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
      return res.status(200).json({
        message: "User login successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error login user" });
  }
};
