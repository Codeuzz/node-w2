import { Router } from "express";
import usersRouter from "./users.routes";
import booksRouter from "./books.routes";
import categoriesRouter from "./categories.routes";
import authRouter from "./auth.routes";

const router = Router();

// http://localhost:3000/users
router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/categories", categoriesRouter);
router.use("/auth", authRouter);

export default router;
