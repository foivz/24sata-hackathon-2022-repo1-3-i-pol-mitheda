import Express from "express";
import jwt_decode from "jwt-decode";

import { prismaClient } from "./utils/prisma.utils";

export default async function authMiddleware(req: any, res: any, next: any) {
    const token = req.body.token ?? null;
    if (token) {
      try {
        const decoded: { [key: string]: any } | null = jwt_decode(token);

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
        next();
        return;
      } catch(ex) {
          console.log(ex)
      }
    } 
    res.status(401).send("Unauthorized")
  
  
}
