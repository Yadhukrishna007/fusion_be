export const test = async (req, res, next) => {
  try {
    return res.status(200).json({
      title: "Express Testing",
      message: "The app is working properly!",
    });
  } catch (error) {
    next(error);
  }
};
