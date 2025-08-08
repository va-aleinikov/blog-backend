import { Request, Response } from "express";
import { Post } from "../models/Post";

export const createTestPost = async (req: Request, res: Response) => {
    const post = await Post.create({ title: "Test", content: "Hello world" });
    res.json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await Post.find();
    res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
    const post = await Post.create(req.body);
    res.status(201).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
};
