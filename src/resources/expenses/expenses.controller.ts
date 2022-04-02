import HttpException from "../../utils/exception/http.exception";
import { prismaClient } from "../../utils/prisma.utils";
export class ExpenseController {
  public getExpenses = async (req: any, res: any) => {
    try {
      const expenses = await prismaClient.expenses.findMany({});

      if (!expenses) throw new HttpException(400, "Something went wrong");

      return res.status(200).json(expenses);
    } catch (error) {
      throw new HttpException(500, "internal server error");
    }
  };

  public createExpense = async (req: any, res: any) => {
    try {
      const expense = req.body;

      const newExpense = await prismaClient.expenses.create(expense);

      return res.status(200).json(newExpense);
    } catch (error) {
      throw new HttpException(500, "Internal server error");
    }
  };
}
