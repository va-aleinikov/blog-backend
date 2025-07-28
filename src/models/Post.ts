// src/models/Post.ts
import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
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
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const Post = model<IPost>("Post", PostSchema);
