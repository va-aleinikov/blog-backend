import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
