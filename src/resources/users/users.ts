import { UserRoutes } from "./users.routes";
import express from "express";

let app = express();

app.use(express.json());

const userRoutes = new UserRoutes().init();

app.use(userRoutes);

app.listen(1339, () => {
  console.log("User service started");
});
