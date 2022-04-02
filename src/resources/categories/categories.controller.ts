import { prismaClient } from "../../utils/prisma.utils";

export class CategoryController {
  getCategories = async (req: any, res: any) => {
    try {
      const categories = await prismaClient.category.findMany({});

      if (!categories) {
        return res.status(404).json({
          message: "No categories found",
        });
      }

      return res.status(200).json(categories.map((c) => c.category));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
