import * as mongoose from 'mongoose';
export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: { type: String },
  },
  { timestamps: true, collection: 'categories' },
);
