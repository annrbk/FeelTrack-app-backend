import { prisma } from "../prisma.js";

export const addEmotion = async (req, res) => {
  const { emotion } = req.body;
  const userId = req.user.id;

  try {
    if (!emotion) {
      return res.status(400).json({ message: "Emotion not found" });
    }

    const newEmotion = await prisma.emotion.create({
      data: {
        userId: userId,
        label: emotion,
      },
    });
    return res
      .status(201)
      .json({ message: "Emotion added successfully", data: newEmotion });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add emotion" });
  }
};
