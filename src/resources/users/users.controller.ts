import { prismaClient } from "../../utils/prisma.utils";

export class UsersController {
  public getUsers = async (req: any, res: any) => {
    try {
      const users = await prismaClient.users.findMany();

      if (!users) {
        return res.status(404).json({ message: "No users found" });
      }

      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  createUser = async (req: any, res: any): Promise<any | void> => {
    console.log("REQ-BODY", req.body);
    const { username, email, password, cognito_id } = req.body;

    try {
      const newUser = await prismaClient.users.create({
        data: {
          username,
          email,
          password,
          cognito_id,
        },
      });

      if (!newUser) {
        return res.status(404).json({ message: "Failed to create resource" });
      }

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  getUserByEmail = async (req: any, res: any) => {
    try {
      const { email } = req.body;

      const user = await prismaClient.users.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      return user;
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  getUserById = async (req: any, res: any) => {
    try {
      const { id } = req.params;

      console.log("ID", id);

      const user = await prismaClient.users.findUnique({
        where: {
          id: Number(id),
        },
      });

      console.log("user", user);

      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };

  deleteUser = async (req: any, res: any) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing 'id' param" });
      }

      const user = prismaClient.users.delete({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      return res.status(204);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  };

  // getUserAccounts = async (req: any, res: any) => {
  //   try {
  //     const {id} = req.params

  //     if(!id) throw new HttpException(400, 'Missing user "id" param')

  //     const userAccounts = await prismaCient.users.
  //   } catch (error:any) {
  //     return res.status(500).json({ error });
  //   }
  // }
}
