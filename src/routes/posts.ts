import { Router } from "express";
import {
  createTestPost,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController";
import { authenticateToken } from "../middleware/auth";
import { authorizeRole } from "../middleware/roles";
import { Post } from "../models/Post";

const router = Router();

// Получить все посты (только для зарегистрированных)
router.get("/", authenticateToken, getAllPosts);

// Получить пост по id (только для зарегистрированных)
router.get("/:id", authenticateToken, getPostById);

// Создать пост (только для зарегистрированных)
router.post("/", authenticateToken, async (req, res) => {
  // Добавляем userId в пост
  const userId = (req as any).user.userId;
  const post = await Post.create({ ...req.body, userId });
  res.status(201).json(post);
});

// Обновить пост (только владелец или админ)
router.put("/:id", authenticateToken, async (req, res) => {
  const user = (req as any).user;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (user.role !== "admin" && post.userId.toString() !== user.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Удалить пост (только админ)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  }
);

export default router;
