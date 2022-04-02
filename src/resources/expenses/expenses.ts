import { ExpenseRoutes } from "./expenses.routes";
import express from "express";

let app = express();

const expenseRoutes = new ExpenseRoutes();

app.use(expenseRoutes.init());

app.listen(1340, () => {
  console.log("Expenses service started");
});
