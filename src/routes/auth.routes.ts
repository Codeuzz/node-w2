import { Router } from "express";
import controller from "../controllers/auth.controller";

const router = Router();

// POST http://localhost:3000/auth/login
router.post("/login", controller.login);

// GET http://localhost:3000/auth/logout
router.get("/logout", controller.logout);

export default router;
