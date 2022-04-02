import { Router } from "express";
import authMiddleware from "../../auth-middleware";
import { ExpenseController } from "./expenses.controller";
import {
  createExpenseSchema,
  updateExpenseValidation,
} from "./expenses.validation";

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
     * Get all expenses
     * GET
     * /expenses/user/:userId
     */
    this.router.get(`${this.path}/:userId`, this.controller.getUserExpenses);

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

    /**
     * Create expense
     * POST
     * /expenses/:id
     */
    this.router.patch(
      `${this.path}/:id`,
      updateExpenseValidation,
      this.controller.updateExpense
    );

    return this.router;
  }
}
