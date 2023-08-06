import mongoose, { Document } from "mongoose";
import { ContactSchema } from "../Auth/model";
import { UserStatusTypes } from "../../constants/users.enum";
import BaseSchema from "../Base/model";

const UserSchema = new mongoose.Schema({
  ...BaseSchema.obj,
  name: {
    type: String,
    require: true,
  },
  contact: {
    type: ContactSchema,
    require: true,
  },
  storeOwner: { type: Boolean, default: false },
  lastLoginAt: {
    type: String,
    default: new Date().toISOString(),
    require: true,
  },
  addressBook: { type: [String], default: [] },
  accounts: { type: [String], default: [] },
  status: {
    type: String,
    enum: UserStatusTypes,
    default: UserStatusTypes.ACTIVE,
  },
});
const User = mongoose.model("User", UserSchema);

export type UserDocument = typeof User & Document;
export default User;
