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

const router = Router();

// only registered
router.get("/", authenticateToken, (req, res) => {
    res.json({ message: "Список постов" });
    router.post("/test", createTestPost);
    router.get("/", getAllPosts);
    router.get("/:id", getPostById);
    router.post("/", createPost);
    router.put("/:id", updatePost);
    router.delete("/:id", deletePost);
});

// only admin
router.delete("/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.json({ message: `Пост ${req.params.id} удалён` });
});

export default router;
