import { prismaClient } from "../../utils/prisma.utils";
export class ExpenseController {
  public getExpenses = async (req: any, res: any) => {
    try {
      const expenses = await prismaClient.expenses.findMany({});

      if (!expenses) return res.status(400).sent("Something went wrong");

      return res.status(200).json(expenses);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  public getExpense = async (req: any, res: any) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    try {
      const expense = await prismaClient.expenses.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!expense) {
        return res.status(200).json({ message: "No resource found" });
      }

      return res.status(200).json(expense);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  public createExpense = async (req: any, res: any) => {
    try {
      const { title, merchant, user_id } = req.body;

      const newExpense = await prismaClient.expenses.create({
        data: {
          title,
          merchant,
          date: new Date(),
          user_id: Number(user_id),
        },
      });

      return res.status(200).json(newExpense);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };

  public deleteExpense = async (req: any, res: any) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "Invalid id" });

      const expense = await prismaClient.expenses.delete({
        where: {
          id: Number(id),
        },
      });

      if (!expense) {
        return res.status(400).json({ message: "No expense found" });
      }
      return res.status(204);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };
}
