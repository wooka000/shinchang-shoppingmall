import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

export { CategorySchema };
