import { registerService, loginService } from "../services/authService.js";
import { generateToken } from "../services/tokenService.js";
export const register = async (req, res, next) => {
  let { name, email, password } = req.body;

  email = email.toLowerCase();

  try {
    const user = await registerService({
      name,
      email,
      password,
    });

    //access token
    const payload = {
      id: user._id,
      expiryDate: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const access_token = await generateToken(payload, secret);

    res.status(200).json({
      message: "Registeration successful",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        picture: user.picture,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService({ email, password });

    //access token
    const payload = {
      id: user._id,
      expiryDate: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const access_token = await generateToken(payload, secret);

    res.status(200).json({
      message: "Login successfull",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        picture: user.picture,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
