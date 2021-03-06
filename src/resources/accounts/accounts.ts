import { AccountRoutes } from "./accounts.routes";
import express from "express";

let app = express();

app.use(express.json());

const accountRoutes = new AccountRoutes();

app.use(accountRoutes.init());

app.listen(1341, () => {
  console.log("Accounts service started");
});
