import { Router } from "express";
import controller from "../controllers/categories.controller";

const router = Router();

// GET http:///localhost:3000/categories
router.get("/", controller.getAll);

// GET http:///localhost:3000/categories/25
router.get("/:id", controller.getById);

// [POST] -     http://localhost:3000/categories
router.post("/", controller.create);

// [DELETE] -     http://localhost:3000/categories/25
router.delete("/:id", controller.delete);

export default router;
