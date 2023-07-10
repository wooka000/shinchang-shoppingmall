import { Schema } from "mongoose";

const UserSchema = new Schema(
  // User Schema 생성
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    subscriptionDate: {
      type: Date,
      required: true,
    },
  }
);

export { UserSchema };
