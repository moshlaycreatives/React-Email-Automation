import { User } from "../models/user.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/** __________ AUTHENTICATION CONTROLLERS __________ */
export const register = async (req, res) => {
  const newUser = await User.create(req.body);
  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "User registered successfully.",
      data: newUser,
    })
  );
};
