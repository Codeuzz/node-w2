import { Router } from "express";
import postRouter from "./posts.routes";
import commentsRouter from "./comments.routes";

const router = Router();

// localhost:3000/posts
router.use("/posts", postRouter);

// localhost:3000/comments
router.use("/comments", commentsRouter);

export default router;
