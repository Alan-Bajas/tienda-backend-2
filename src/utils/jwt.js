import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role || "user",
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
