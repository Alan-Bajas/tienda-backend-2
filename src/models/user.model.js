import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true }, // HASH
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

export default mongoose.model(usersCollection, userSchema);
