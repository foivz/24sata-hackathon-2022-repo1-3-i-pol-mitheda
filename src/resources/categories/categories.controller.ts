import { randomNum } from "../../../hakerske-skripte/custom-seeder";
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

  seedCategories = async (req: any, res: any) => {
    try {
      const expenses = await prismaClient.expenses.findMany({});

      const cats = await prismaClient.category.findMany({});

      let categories = cats.map((m) => m.category);

      console.log(categories);
      console.log(expenses);

      const newExpenses = expenses.map((ex) => {
        ex.category = categories[randomNum(0, expenses.length)];
        return ex;
      });

      newExpenses.forEach(async (newExpense) => {
        await prismaClient.expenses.update({
          where: {
            id: newExpense.id,
          },
          data: {
            category: newExpense.category,
          },
        });
      });

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
