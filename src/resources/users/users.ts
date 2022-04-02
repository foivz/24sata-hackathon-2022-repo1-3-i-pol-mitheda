import { UserRoutes } from "./users.routes";
import express from "express";

let app = express();

const userRoutes = new UserRoutes();

app.use(userRoutes.init());

app.listen(1339, () => {
  console.log("User service started");
});
