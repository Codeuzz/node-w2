import express, { NextFunction, Request, Response } from "express";
import { requestLogger } from "./middlewares/requestLogger";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use("/", router);
const PORT = 3000;

const middleware1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("on passe par middleware 1 et tout va bien");
  next();
};

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log("-");
  res.status(401).send("interdit");
};

app.get("/", middleware1, (req: Request, res: Response) => {
  res.send("bienvenue page d'accueil");
});

app.get("/about", (req: Request, res: Response) => {
  res.send("à propos de moi");
});

app.listen(PORT, () => {
  console.log("server listening on: http://localhost:3000");
});
