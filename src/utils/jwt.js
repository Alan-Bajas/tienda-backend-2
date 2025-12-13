import jwt from "jsonwebtoken";

export const PRIVATE_KEY = process.env.JWT_SECRET || "coderSecretJWT";

export const generateToken = (user) => {
  const payload = {
    user: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
      cart: user.cart
    }
  };

  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "24h" });
};
