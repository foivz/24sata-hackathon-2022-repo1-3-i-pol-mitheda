import express from "express";
import {
  TextractClient,
  AnalyzeExpenseCommand,
} from "@aws-sdk/client-textract";
import dayjs from "dayjs";

let app = express();
app.use(express.json());

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const client = new TextractClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIAWM2KFIT376XTPBU5",
    secretAccessKey: "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",
  },
});

const tryParseDate = (date?: string) => {
  if (!date) return "";
  try {
    const d = dayjs(date);
    return d.toDate().toISOString();
  } catch (e) {
    return "";
  }
};

app.post("/scan", upload.single("thefile"), async (req, res, next) => {
  const obj = {
    merchant: "",
    date: "",
    items: [] as { title: string; amount: number; price: number }[],
  };

  try {
    const cmd = new AnalyzeExpenseCommand({
      Document: {
        // @ts-ignore
        Bytes: req.file.buffer,
      },
    });

    const r = await client.send(cmd);

    r.ExpenseDocuments?.forEach((el) => {
      el.LineItemGroups?.forEach((el2) => {
        el2.LineItems?.forEach((el3) => {
          const item: { title: string; amount: number; price: number } = {
            title: "",
            amount: 0,
            price: 0,
          };
          el3.LineItemExpenseFields?.forEach((el4) => {
            switch (el4.Type?.Text) {
              case "ITEM":
                item.title = el4.ValueDetection?.Text || "";
                break;
              case "PRICE":
                item.price = el4.ValueDetection?.Text
                  ? parseFloat(el4.ValueDetection?.Text)
                  : 0;
                break;
              case "QUANTITY":
                item.amount = el4.ValueDetection?.Text
                  ? parseFloat(el4.ValueDetection?.Text)
                  : 0;
                break;
            }
          });
          obj.items.push(item);
        });
      });
    });

    r.ExpenseDocuments?.forEach((el) => {
      el.SummaryFields?.forEach((el2) => {
        switch (el2.Type?.Text) {
          case "INVOICE_RECEIPT_DATE":
            obj.date = tryParseDate(el2.ValueDetection?.Text);
            break;
        }
      });
    });
  } catch (e) {
    // console.log(e);
  } finally {
    return res.json(obj);
  }
});

app.listen(1338, () => {
  console.log("Test service started");
});
