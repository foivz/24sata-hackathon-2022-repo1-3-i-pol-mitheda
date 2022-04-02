import { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/exception/http.exception";
import { prismaClient } from "../../utils/prisma.utils";

export class UsersController {
  public getUsers = async (req: any, res: any) => {
    try {
      const users = await prismaClient.users.findMany({});

      if (!users) throw new HttpException(404, "No users found");

      return users;
    } catch (error: any) {
      throw new HttpException(500, JSON.stringify(error));
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

      if (!newUser) throw new HttpException(400, "Bad request");

      res.status(201).json(newUser);
    } catch (error) {
      throw new HttpException(500, "Internal server error");
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

      if (!user) throw new HttpException(404, "No user found");

      return user;
    } catch (error) {
      throw new HttpException(500, JSON.stringify(error));
    }
  };

  getUserById = async (req: any, res: any) => {
    try {
      const { id } = req.params;

      const user = await prismaClient.users.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) throw new HttpException(404, "No user found");

      return user;
    } catch (error) {
      throw new HttpException(500, JSON.stringify(error));
    }
  };

  deleteUser = async (req: any, res: any) => {
    try {
      const { id } = req.params;

      if (!id) throw new HttpException(400, 'Missing "id" param');

      const user = prismaClient.users.delete({
        where: {
          id: id,
        },
      });

      if (!user) throw new HttpException(404, "No user found");

      return res.status(204);
    } catch (error: any) {
      throw new HttpException(500, JSON.stringify(error));
    }
  };
}
