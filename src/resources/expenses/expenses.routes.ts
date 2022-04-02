import { Router } from "express";
import authMiddleware from "../../auth-middleware";
import { ExpenseController } from "./expenses.controller";
import { createExpenseSchema } from "./expenses.validation";

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
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.controller.getExpenses
    );

    /**
     * Get expense by id
     * GET
     * /expenses/:id
     */
    this.router.get(`${this.path}`, authMiddleware, this.controller.getExpense);

    /**
     * Create expense
     * POST
     * /expenses
     */
    this.router.post(
      `${this.path}`,
      [authMiddleware, createExpenseSchema],
      this.controller.createExpense
    );

    /**
     * Create expense
     * POST
     * /expenses/:id
     */
    this.router.post(`${this.path}/:id`, this.controller.deleteExpense);

    return this.router;
  }
}
