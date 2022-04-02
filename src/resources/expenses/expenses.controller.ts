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

  public getExpense = async (req: any, res: any) => {
    const { id } = req.params;

    if (!id) throw new HttpException(409, "Missing id parameter");

    try {
      const expense = await prismaClient.expenses.findUnique({
        where: {
          id: id,
        },
      });

      if (!expense) throw new HttpException(404, "No resource found");

      return res.status(200).json(expense);
    } catch (error) {
      throw new HttpException(500, "Internal server error");
    }
  };

  public createExpense = async (req: any, res: any) => {
    try {
      const expense = req.body;

      const newExpense = await prismaClient.expenses.create({
        data: {
          ...expense,
        },
      });

      return res.status(200).json(newExpense);
    } catch (error: any) {
      throw new HttpException(500, error);
    }
  };
}
