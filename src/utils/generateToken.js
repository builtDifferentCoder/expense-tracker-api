import jwt from "jsonwebtoken";

export function generateToken(user) {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}
