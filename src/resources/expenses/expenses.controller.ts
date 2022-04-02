import { prismaClient } from "../../utils/prisma.utils";
export class ExpenseController {
  public getExpenses = async (req: any, res: any) => {
    try {
      const expenses = await prismaClient.expenses.findMany({
        include: {
          expense_item: true,
        },
      });

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
      console.log("ID", res.locals.userId);
      console.log("LOCALS", res.locals);

      const newExpense = await prismaClient.expenses.create({
        data: {
          title,
          merchant,
          date: new Date(),
          user_id: user_id ? Number(user_id) : res.locals.userId,
        },
      });

      if (!newExpense) {
        return res.status(400).json({
          message: "Failed to create resource",
        });
      }

      const expenseId = newExpense.id;

      let expenseItems;

      if (req.body.items) {
        const { items } = req.body;
        expenseItems = prismaClient.expense_item.createMany({
          data: items.map((item) => ({
            title: Number(item.title),
            price: Number(item.price),
            amount: Number(item.amount),
            expense_id: expenseId,
          })),
        });

        if (!expenseItems) {
          return res.status(400).json({
            message: "Expense saved butt failed to save items",
          });
        }
      }

      if (expenseItems) newExpense["expense_items"] = expenseItems;

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
