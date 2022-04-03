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

    this.router.get(
      `${this.path}/user`,
      authMiddleware,
      this.controller.getUserExpenses
    );

    /**
     * Get expense by id
     * GET
     * /expenses/:id
     */
    // this.router.get(
    //   `${this.path}/:id`,
    //   authMiddleware,
    //   this.controller.getExpense
    // );

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
     * DELETE
     * /expenses/:id
     */
    this.router.delete(
      `${this.path}/:id`,
      [authMiddleware],
      this.controller.deleteExpense
    );

    /**
     * Update expense
     * PATCH
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
