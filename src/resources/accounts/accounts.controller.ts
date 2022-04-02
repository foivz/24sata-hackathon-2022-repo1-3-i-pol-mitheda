import { prismaClient } from "../../utils/prisma.utils";

export class AccountsController {
  public getAccounts = async (req: any, res: any) => {
    const accounts = await prismaClient.accounts.findMany({});

    return accounts;
  };
}
