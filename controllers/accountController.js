import { prisma } from "../prisma.js";

export const updateUserData = async (req, res) => {
  const { name, email, number, dateOfBirth } = req.body;
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const emailExist = await prisma.user.findUnique({
      where: { email: email },
    });
    if (emailExist && email !== user.email) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        number,
        dateOfBirth,
      },
    });
    return res.status(200).json({
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating user data" });
  }
};
