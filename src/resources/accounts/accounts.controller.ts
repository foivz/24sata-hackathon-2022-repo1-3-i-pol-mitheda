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

  updateAccout = async (req: any, res: any) => {
    try {
      const data = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing id parameter" });
      }

      if (req.body.token) delete data.token;

      const account = await prismaClient.accounts.update({
        data: {
          ...data,
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
      const { name, balance, user_id } = req.body;

      const account = await prismaClient.accounts.create({
        data: {
          name: name,
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

  setUserAccount = async(req: any, res: any) => {
    const { username } = req.body

    const userIdUpdate = await prismaClient.users.findUnique({
      where: {
        id: res.locals.userId
      }
    })

    await prismaClient.users.update({
      where: {
        username
      }, 
      data: {
        account_id: userIdUpdate?.account_id
      }
    })

    res.status(200).send("Success")




  }
}
