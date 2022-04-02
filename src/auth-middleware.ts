import Express from "express";
import jwt_decode from "jwt-decode";

import { prismaClient } from "./utils/prisma.utils";

export default async function authMiddleware(req: any, res: any, next: any) {
  const token = req.body.token ?? null;
  if (token) {
    const decoded: { [key: string]: any } | null = jwt_decode(token);
    // iz nekog razloga res.locals nije defined, a trebal bi bit
    // kreiranje praznog objekta za svaki slucaj ako treba
    res.locals = res.locals ?? {};
    res.locals.user = decoded;

    const getUser: { id: Number } | null = await prismaClient.users.findUnique({
      where: {
        cognito_id: decoded?.sub,
      },
      select: {
        id: true,
      },
    });

    res.locals.userId = getUser?.id;
  }
  next();
}
