import express from "express";
import { prismaClient } from "../utils/prisma.utils";
import authMiddleware from "../auth-middleware";
import { generateExpense } from "../../hakerske-skripte/custom-seeder";

let app = express();

app.use(express.json());

function delightfulMessage(param: string) {
  const obj: { [key: string]: string } = {
    daro: "razvaljuje bmw i gume i martu",
    gazda: "razvaljuje pisoare",
    keci: "razvaljuje minox", // Ok...
    pista: "razvaljuje bmw aha ne cek", // Lol
  };
  return obj[param];
}

app.post("/test", authMiddleware, (req, res, next) => {
  const msg = delightfulMessage(req.body?.ime as string) ?? "nema poruke";
  // sub = cognito id
  res.status(200).send(res.locals.user.sub);
});

app.get("/test/seed", async (req: any, res: any) => {
  try {
    // const expenses = await prismaClient.expenses.create({
    //   data: {

    //   }
    // });

    generateExpense();

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(1337, () => {
  console.log("Test service started on 1337");
});
