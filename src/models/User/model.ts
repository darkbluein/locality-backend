import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);

export type UserDocument = typeof User & Document;
export default User;
