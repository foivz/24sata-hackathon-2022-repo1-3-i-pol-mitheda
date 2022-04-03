import { Router } from "express";
import { AccountsController } from "./accounts.controller";
import { createAccountValidation } from "./accounts.validation";
import authMiddleware from "../../auth-middleware";
export class AccountRoutes {
  private router = Router();
  private path = "/accounts";

  private controller = new AccountsController();

  public init(): Router {
    /**
     * Get all accounts
     * /accounts
     */
    this.router.get(`${this.path}`, this.controller.getAccounts);

    /**
     * Get account by id
     * /accounts/:id
     */
    this.router.get(`${this.path}/get/:id`, this.controller.getAccountById);


    this.router.post(`${this.path}/set-account`, authMiddleware, this.controller.setUserAccount);

    /**
     * Create account
     * /accounts
     */
    this.router.post(
      `${this.path}`,
      createAccountValidation,
      this.controller.createAccount
    );

    /**
     * Create account
     * /accounts
     */
    this.router.patch(`${this.path}/:id`, this.controller.updateAccout);

    return this.router;
  }
}
