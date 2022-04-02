import express from "express";
import authMiddleware from "../auth-middleware";

let app = express();


app.use(express.json())

function delightfulMessage(param: string) {
  const obj: { [key: string]: string } = {
    daro: "razvaljuje bmw i gume i martu",
    gazda: "razvaljuje pisoare",
    keci: "razvaljuje minox", // Ok...
    pista: "razvaljuje bmw aha ne cek",
  };
  return obj[param];
}

app.post("/test", authMiddleware, (req, res, next) => {
  const msg = delightfulMessage(req.body?.ime as string) ?? "nema poruke";
  // sub = cognito id
  res.status(200).send(res.locals.user.sub);
});

app.listen(1337, () => {
  console.log("Test service started on 1337");
});
