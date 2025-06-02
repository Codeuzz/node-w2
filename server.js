import express from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import router from "./routes/index.js";

const app = express();
app.use(requestLogger);
app.use("/", router);
const PORT = 3000;

const middleware1 = (req, res, next) => {
  console.log("on passe par middleware 1 et tout va bien");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("-");
  res.status(401).send("interdit");
};

app.get("/", middleware1, (req, res) => {
  res.send("bienvenue page d'accueil");
});

app.get("/about", (req, res) => {
  res.send("à propos de moi");
});

app.listen(PORT, () => {
  console.log("server listening on: http://localhost:3000");
});
