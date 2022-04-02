import express from "express";

let app = express();

function delightfulMessage(param: string) {
  const obj: { [key: string]: string } = {
    daro: "razvaljuje bmw i gume",
    gazda: "razvaljuje pisoare",
    keci: "razvaljuje minox", // Ok...
    pista: "razvaljuje bmw aha ne cek",
  };
  return obj[param];
}

app.get("/test", (req, res, next) => {
  const msg = delightfulMessage(req.query?.ime as string) ?? "nema poruke";
  res.status(200).send(msg);
});

app.listen(1337, () => {
  console.log("Test service started");
});
