import searchService from "../services/searchService.js";

const searchController = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    const sender_id = req.user.id;
    if (!keyword) throw new Error("Enter a keyword");

    const users = await searchService(keyword, sender_id);
    res.status(200).json({
      message: "Users found",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export default searchController;
