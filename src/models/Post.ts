// src/models/Post.ts
import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  userId: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    userId: { type: String, required: true }, // добавлено
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Post = model<IPost>("Post", PostSchema);
