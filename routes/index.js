import { Router } from "express";
import postRouter from "./posts.routes.js";
import commentsRouter from "./comments.routes.js";

const router = Router();

// localhost:3000/posts
router.use("/posts", postRouter);

// localhost:3000/comments
router.use("/comments", commentsRouter);

export default router;
