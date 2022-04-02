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
<<<<<<< HEAD
    this.router.get(`${this.path}/user`, this.controller.getUserExpenses);
=======
    this.router.get(
      `${this.path}/user`,
      authMiddleware,
      this.controller.getUserExpenses
    );
>>>>>>> a5bb42c9b43816b6b993451ee5d44436e37e4f38

    /**
     * Get expense by id
     * GET
     * /expenses/:id
     */
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.controller.getExpense
    );

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
