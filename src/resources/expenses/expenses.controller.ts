import { prismaClient } from "../../utils/prisma.utils";
import AWS from "aws-sdk";

// AWS.config.update({
//   'region': 'eu-central-1',
//   accessKeyId: "AKIAWM2KFIT376XTPBU5",
//   secretAccessKey: "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",
// });

// let personalizeEvents = new AWS.PersonalizeEvents();

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

  public getUserExpenses = async (req: any, res: any) => {
    try {
      const { items } = req.query;

      const { mindate, maxdate } = req.query;

      const includeItems = items ? JSON.parse(items) : true;

      const userId = res.locals.userId as number;

      const userAcc = await prismaClient.users.findUnique({
        where: {
          id: userId,
        },
      });

      const expenses = await prismaClient.expenses.findMany({
        where: {
          account_id: userAcc?.account_id!,
          isShoppingList: 0,
          date: {
            gte: new Date(mindate ? mindate : "01-01-2022"),
            lte: maxdate ? new Date(maxdate) : new Date(),
          },
        },
        include: {
          expense_item: includeItems,
        },
      });

      if (!expenses) {
        return res.status(404).json({
          message: "No expenses found",
        });
      }

      return res.status(200).json(expenses);
    } catch (error) {
      console.log("[ERROR]", error);
      return res.status(500).json({ error });
    }
  };

  public getUserShoppingList = async (req: any, res: any) => {
    try {
      const { items } = req.query;

      const includeItems = items ? JSON.parse(items) : true;

      const userId = res.locals.userId as number;

      const userAcc = await prismaClient.users.findUnique({
        where: {
          id: userId,
        },
      });

      const expenses = await prismaClient.expenses.findMany({
        where: {
          account_id: userAcc?.account_id!,
          isShoppingList: 1,
        },
        include: {
          expense_item: includeItems,
        },
      });

      if (!expenses) {
        return res.status(404).json({
          message: "No shopping lists found",
        });
      }

      return res.status(200).json(expenses);
    } catch (error) {
      console.log("[ERROR]", error);
      return res.status(500).json({ error });
    }
  };

  public getExpense = async (req: any, res: any) => {
    let { id } = req.params;

    if (!id) id = res.locals.userId;

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
      const { merchant, date, category, isShoppingList } = req.body;

      const userId = res.locals.userId as number;

      const userAcc = await prismaClient.users.findUnique({
        where: {
          id: userId,
        },
      });

      const newExpense = await prismaClient.expenses.create({
        data: {
          merchant: merchant ?? "",
          date: date ?? new Date(),
          account_id: userAcc?.account_id!,
          user_id: userId,
          category: category,
          isShoppingList: isShoppingList,
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

        console.log(items);
        expenseItems = await prismaClient.expense_item.createMany({
          data: items.map((item) => ({
            title: item.title,
            price: Number(item.price),
            amount: Number(item.amount),
            expense_id: expenseId,
          })),
          skipDuplicates: false,
        });

        if (!expenseItems) {
          return res.status(400).json({
            message: "Expense saved butt failed to save items",
          });
        }
      }

      if (expenseItems) newExpense["expense_items"] = expenseItems;

      // const params = {
      //   eventList: [
      //       {
      //           eventType: 'click',
      //           sentAt: new Date(),
      //           properties: expenseItems
      //       },
      //   ],
      //   userId: userId
      // };

      // personalizeEvents.putEvents(params, function (err, data) {
      //   if (err) console.log(err, err.stack); // an error occurred
      //   else     console.log(data);           // successful response
      // });

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

      const item = await prismaClient.expense_item.deleteMany({
        where: {
          expense_id: Number(id),
        },
      });

      if (!item) {
        return res.status(400).json({
          message: "Failed to delete items",
        });
      }

      const expense = await prismaClient.expenses.delete({
        where: {
          id: Number(id),
        },
      });

      if (!expense) {
        return res.status(400).json({
          message: "Failed to delete expense",
        });
      }

      return res.status(204);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  public updateExpense = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const body = req.body;

      if (body.token) delete body.token;

      if (!id) {
        return res.status(400).json({
          message: "Missing id param",
        });
      }

      const updatedExpense = await prismaClient.expenses.update({
        where: {
          id: Number(id),
        },
        data: {
          ...body,
        },
      });

      if (!updatedExpense) {
        return res.status(400).json({
          message: "Failed to update expense",
        });
      }

      return res.status(200).json(updatedExpense);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };

  // getMerchants = async (req:any, res: any) => {
  //   try {
  //     const {userId} = req.body

  //     cons
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error });
  //   }
  // }
}
