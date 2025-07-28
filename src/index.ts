import express from "express";
import { connectDB } from "./config/database";
import { Post } from "./models/Post";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// подключаем MongoDB
connectDB();

// тестовый роут
app.get("/healthcheck", (_req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// вставка тестового поста
// app.post("/posts/test", async (_req, res) => {
//     try {
//         const post = await Post.create({
//             title: "Hello, MongoDB!",
//             content: "Это тестовый пост.",
//             tags: ["test", "mongodb"],
//         });
//         res.json(post);
//     } catch (err) {
//         res.status(500).json({ error: "Не удалось создать пост" });
//     }
// });
