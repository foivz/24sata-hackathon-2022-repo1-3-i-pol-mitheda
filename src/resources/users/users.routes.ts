import { Router } from "express";
import { UsersController } from "./users.controller";

export class UserRoutes {
  private router = Router();
  private path = "/users";

  private controller = new UsersController();

  public init(): Router {
    // [x] get all users
    this.router.get(`${this.path}`, this.controller.getUsers);

    this.router.post(`${this.path}`, this.controller.createUser);

    return this.router;
  }
}
