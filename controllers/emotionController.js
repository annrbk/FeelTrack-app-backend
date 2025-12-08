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

export const getCurrentEmotions = async (req, res) => {
  const userId = req.user.id;
  const date = req.query.date;

  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const currentEmotions = await prisma.emotion.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ data: currentEmotions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching current emotions" });
  }
};

export const deleteEmotion = async (req, res) => {
  const emotionId = req.params.id;

  try {
    await prisma.emotion.delete({
      where: {
        id: Number(emotionId),
      },
    });
    return res.status(200).json({ message: "Emotion deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting emotion" });
  }
};
