import { Router } from "express";
import { getAllPosts } from "../controllers/posts.controller";

const router = Router();

// get all posts
router.get("/", getAllPosts);

// get a specific post
router.get("/:id", (req, res) => {});

// create a post
router.post("/", (req, res) => {});

// edit a post
router.put("/:id", (req, res) => {});

// delete a post
router.delete("/:id", (req, res) => {});

export default router;
