import { Router } from "express";
import { getAllComments } from "../controllers/comments.controller";

const router = Router();

router.get("/", getAllComments);

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

export default router;
