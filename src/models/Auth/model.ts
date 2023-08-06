import mongoose, { Document } from "mongoose";
import BaseSchema from "../Base/model";
import { AuthVerifyTypes } from "../../constants/auth.enum";

const ContactSchema = new mongoose.Schema(
  {
    ISD: {
      type: String,
      default: "+91",
    },
    number: {
      type: String,
    },
  },
  { _id: false }
);
const AuthSchema = new mongoose.Schema(
  {
    ...BaseSchema.obj,
    code: { type: Number, require: true },
    contact: ContactSchema,
    messagingSid: {
      type: String,
    },
    status: {
      type: String,
      enum: AuthVerifyTypes,
      default: AuthVerifyTypes.UNVERIFIED,
    },
  },
  {
    collection: "auth",
  }
);
AuthSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 });
const Auth = mongoose.model("Auth", AuthSchema);

export { ContactSchema };
export type UserDocument = typeof Auth & Document;
export default Auth;
