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
  }
);

export { UserSchema };