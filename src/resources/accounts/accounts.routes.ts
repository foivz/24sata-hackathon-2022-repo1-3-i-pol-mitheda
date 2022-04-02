import { Router } from "express";
import { AccountsController } from "./accounts.controller";

export class AccountRoutes {
  private router = Router();
  private path = "/acounts";

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
    this.router.get(`${this.path}/:id`, this.controller.getAccountById);

    /**
     * Create account
     * /accounts
     */
    this.router.post(`${this.path}/:id`, this.controller.createAccount);

    /**
     * Create account
     * /accounts
     */
    this.router.patch(`${this.path}/:id`, this.controller.updateAccoutState);

    return this.router;
  }
}
