import { Router } from "express";
import { ExpenseController } from "./expenses.controller";

export class ExpenseRoutes {
  private router = Router();
  private path = "/expenses";

  private controller = new ExpenseController();

  public init(): Router {
    // [x] get all expenses
    this.router.get(`${this.path}`, this.controller.getExpenses);

    this.router.post(`${this.path}`, this.controller.createExpense);

    return this.router;
  }
}
