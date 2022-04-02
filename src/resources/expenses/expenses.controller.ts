import { prismaClient } from "../../utils/prisma.utils";
export class ExpenseController {
  public getExpenses = async (req: any, res: any) => {
    const expenses = await prismaClient.expenses.findMany({});

    return expenses;
  };
}
