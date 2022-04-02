import { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/exception/http.exception";
import { prismaClient } from "../../utils/prisma.utils";

export class UsersController {
  public getUsers = async (req: any, res: any) => {
    return res.status(200).send("mkmk");
    const users = await prismaClient.users.findMany();

    return users;
  };

  createUser = async (req: any, res: any): Promise<any | void> => {
    console.log("REQ-BODY", req.body);
    const { username, email, password } = req.body;

    try {
      const newUser = await prismaClient.users.create({
        data: {
          username,
          email,
          password,
        },
      });

      if (!newUser) throw new HttpException(400, "Bad request");

      res.status(201).json(newUser);
    } catch (error) {
      throw new HttpException(500, "Internal server error");
    }
  };
}
