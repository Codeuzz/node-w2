import usersRouter from "./users.routes";
import { Router } from "express";

const router = Router();

// http://localhost:3000/users
router.use("/users", usersRouter);

export default router;
