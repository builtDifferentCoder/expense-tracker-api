import jwt from "jsonwebtoken";
import User from "../models/user.js";

async function authenticationMiddleware(req, res, next) {
  const authHeaders = req.get("authorization");
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "No token provided.Please login or register to get a token",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    req.userInfo = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Auth token failed.",
    });
  }
}

export default authenticationMiddleware;
