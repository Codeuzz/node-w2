import { Router } from "express";
import controller from "../controllers/auth.controller";
import usersController from "../controllers/users.controller";

const router = Router();

// POST http://localhost:3000/auth/login
router.post("/login", controller.login);

// GET http://localhost:3000/auth/logout
router.get("/logout", controller.logout);

// [POST] - http://localhost:3000/auth/register
router.post("/register", usersController.create);

export default router;
