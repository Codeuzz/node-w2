import { Router } from "express";
import controller from "../controllers/users.controller";
import { authMiddleWare } from "../middlewares";

// import { isAuthenticated } from "../middlewares";

const router = Router();

// GET http:///localhost:3000/users
router.get("/", authMiddleWare, controller.getAll);

// GET http:///localhost:3000/users/25
router.get("/:id", controller.getById);

// [POST] -     http://localhost:3000/users
router.post("/", controller.create);

// [DELETE] -     http://localhost:3000/users/25
router.delete("/:id", controller.delete);

export default router;
