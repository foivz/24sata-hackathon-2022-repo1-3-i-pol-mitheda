import { CategoryRoutes } from "./categories.routes";
import express from "express";

let app = express();

app.use(express.json());

const categoryRoutes = new CategoryRoutes();

app.use(categoryRoutes.init());

app.listen(1343, () => {
  console.log("Category service started");
});
