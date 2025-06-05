import { Router } from "express";
import controller from "../controllers/users.controller";

// import { isAuthenticated } from "../middlewares";

const router = Router();

// GET http:///localhost:3000/users -> récupérer tout les users
router.get("/", controller.getAll);

// GET http:///localhost:3000/users/25 -> récupérer un post en fonction de son id
router.get("/:id", controller.getById);

// [POST] -     http://localhost:3000/users -> créer un post
router.post("/", controller.create);

// [PUT] -     http://localhost:3000/users/25 -> éditer un post
// router.put("/:id", controller.update);

// [DELETE] -     http://localhost:3000/users/25 -> supprimer un post
router.delete("/:id", controller.delete);

export default router;
