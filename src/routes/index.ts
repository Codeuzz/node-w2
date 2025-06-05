import { Router } from "express";
import usersRouter from "./users.routes";
import booksRouter from "./books.routes";

const router = Router();

// http://localhost:3000/users
router.use("/users", usersRouter);
router.use("/books", booksRouter);

export default router;
