import { Router } from "express";
import authMiddleware from "../../auth-middleware";
import { CategoryController } from "./categories.controller";

export class CategoryRoutes {
  private router = Router();
  private path = "/categories";

  private controller = new CategoryController();

  public init(): Router {
    /**
     * Get categories
     * GET
     * /categories
     */
    this.router.get(`${this.path}`, this.controller.getCategories);
    this.router.get(`${this.path}/cats`, this.controller.seedCategories);

    return this.router;
  }
}
