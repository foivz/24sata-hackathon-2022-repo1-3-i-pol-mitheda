import { Router } from "express";
import { ExpenseController } from "./expenses.controller";

export class ExpenseRoutes {
  private router = Router();
  private path = "/expenses";

  private controller = new ExpenseController();

  public init(): Router {
    /**
     * Get all expenses
     * GET
     * /expenses
     */
    this.router.get(`${this.path}`, this.controller.getExpenses);

    /**
     * Get expense by id
     * GET
     * /expenses/:id
     */
    this.router.get(`${this.path}`, this.controller.getExpense);

    /**
     * Create expense
     * POST
     * /expenses
     */
    this.router.post(`${this.path}`, this.controller.createExpense);

    /**
     * Create expense
     * POST
     * /expenses/:id
     */
    this.router.post(`${this.path}/:id`, this.controller.deleteExpense);

    return this.router;
  }
}
