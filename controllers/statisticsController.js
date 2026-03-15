import { prisma } from "../prisma.js";

export const getEmotionsWithDates = async (req, res) => {
  const userId = req.user.id;

  try {
    const emotionsWithDates = await prisma.emotion.findMany({
      where: {
        userId: userId,
      },
    });
    return res.status(200).json({ data: emotionsWithDates });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch emotions with dates" });
  }
};
