import { prismaClient } from "../../utils/prisma.utils";

export class AccountsController {
  getAccounts = async (req: any, res: any) => {
    try {
      const accounts = await prismaClient.accounts.findMany({});

      if (!accounts) {
        return res.status(404).json({ message: "No accounts found" });
      }

      return res.status(200).json(accounts);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  getAccountById = async (req: any, res: any) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "Missing id parameter" });

      const account = await prismaClient.accounts.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!account) {
        return res.status(404).json({ message: "No account found" });
      }

      return res.status(200).json(account);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  updateAccoutState = async (req: any, res: any) => {
    try {
      const { balance, name } = req.body;
      const { id } = req.params;

      if (!balance) {
        return res.status(400).json({ message: "Missing balance property" });
      }

      if (!id) {
        return res.status(400).json({ message: "Missing id parameter" });
      }

      const account = await prismaClient.accounts.update({
        data: {
          balance: balance,
        },
        where: {
          id: Number(id),
        },
      });

      if (!account) {
        return res.status(404).json({ message: "No account found" });
      }

      return res.status(200).json(account);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  createAccount = async (req: any, res: any) => {
    try {
      const { balance, user_id } = req.body;

      const account = await prismaClient.accounts.create({
        data: {
          balance: Number(balance),
          user_id: Number(user_id) ?? res.locals.userId,
        },
      });

      if (!account) {
        return res.status(400).json({
          message: "Failed to create resource",
        });
      }

      return res.status(201).json(account);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
