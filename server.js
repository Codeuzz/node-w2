import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("bienvenue page d'accueil");
});

app.get("/about", (req, res) => {
  res.send("à propos de moi");
});

app.listen(PORT, () => {
  console.log("server listening on: http://localhost:3000");
});
