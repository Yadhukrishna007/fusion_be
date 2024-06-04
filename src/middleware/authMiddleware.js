import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new Error("Unauthorized");
    }

    const bearer = req.headers["authorization"];
    const encoded = bearer.split(" ")[1];

    jwt.verify(encoded, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        throw new Error("Unauthorized");
      }

      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
