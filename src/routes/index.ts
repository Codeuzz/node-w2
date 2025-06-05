import { Router } from "express";
import usersRouter from "./users.routes";
import booksRouter from "./books.routes";
import categoriesRouter from "./categories.routes";

const router = Router();

// http://localhost:3000/users
router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/categories", categoriesRouter);

export default router;
