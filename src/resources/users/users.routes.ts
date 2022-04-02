import { Router } from "express";
import { UsersController } from "./users.controller";

export class UserRoutes {
  private router = Router();
  private path = "/users";

  private controller = new UsersController();

  public init(): Router {
    /**
     * Get all users
     * /users
     */
    this.router.get(`${this.path}`, this.controller.getUsers);

    /**
     * Get user by id
     * /users/:id
     */
    this.router.get(`${this.path}/:id`, this.controller.getUserById);

    /**
     * Get user by email
     * /users/email
     */
    this.router.get(`${this.path}/email`, this.controller.getUserByEmail);

    /**
     * Get all users
     * /users
     */
    this.router.post(`${this.path}`, this.controller.createUser);

    return this.router;
  }
}
