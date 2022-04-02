import { prismaClient } from "../../utils/prisma.utils";

export class UsersController {
  public getUsers = async (req: any, res: any) => {
    return res.status(200).send("mkmk");
    const users = await prismaClient.users.findMany();

    return users;
  };
}
