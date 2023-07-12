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
    role: {
      type: String,
      required: false,
      default: "user", // user, admin 2가지
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    subscriptionDate: {
      type: Date,
      required: true,
    },
  }
);

export { UserSchema };
