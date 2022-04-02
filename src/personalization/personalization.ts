import AWS from "aws-sdk";
import express from "express";
let app = express();

const personalizeRuntime = new AWS.PersonalizeRuntime({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIAWM2KFIT376XTPBU5",
    secretAccessKey: "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",
  },
});

const campaignArn =
  "arn:aws:personalize:eu-central-1:439852811511:campaign/24sata2";

app.get("/personalization", async (req, res, next) => {
  personalizeRuntime.getRecommendations(
    {
      campaignArn,
      userId: "100",
    },
    function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log("RECOMMENDATIONS: ", data);
      res.json(data);
    }
  );
});

app.listen(1342, () => {
  console.log("Personalization service started");
});
