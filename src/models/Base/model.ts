import mongoose from "mongoose";
import { uniqueId } from "../../utils/uuid";

const BaseSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uniqueId(),
    },
  },
  {
    id: true,
    timestamps: true,
  }
);

export default BaseSchema;
