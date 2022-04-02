import { Router } from "express";
import { AccountsController } from "./accounts.controller";

export class AccountRoutes {
  private router = Router();
  private path = "/acounts";

  private controller = new AccountsController();

  public init(): Router {
    // [x] get all accounts
    this.router.get(`${this.path}`, this.controller.getAccounts);

    return this.router;
  }
}
