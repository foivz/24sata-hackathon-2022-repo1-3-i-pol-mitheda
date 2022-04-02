import { prismaClient } from "../src/utils/prisma.utils";

const randomMerchant = () => {
  const merchantCategoriyOptions = [
    { merchant: "Konzum", category: "Food" },
    { merchant: "LIDL", category: "Food" },
    { merchant: "Lonia", category: "Food" },
    { merchant: "MallHr", category: "Food" },
    { merchant: "MallHr", category: "Personal spending" },
    { merchant: "MallHr", category: "Utilities" },
    { merchant: "LIDL", category: "Food" },
    { merchant: "LIDL", category: "Utilities" },
    { merchant: "Links", category: "Utilities" },
    { merchant: "ADM", category: "Utilities" },
    { merchant: "SportsVision", category: "Clothes" },
    { merchant: "NewYorker", category: "Clothes" },
    { merchant: "Orsay", category: "Clothes" },
    { merchant: "Hervis", category: "Clothes" },
    { merchant: "Binance", category: "Saving, Investing, & Debt Payments" },
    { merchant: "Triglav", category: "Insurance" },
    { merchant: "CAMEO", category: "Transportation" },
    { merchant: "Hrvatske Zeljeznice", category: "Transportation" },
    { merchant: "Hervis", category: "Fitness & Lifestyle" },
    { merchant: "FitForYou", category: "Fitness & Lifestyle" },
  ];

  return merchantCategoriyOptions[
    randomNum(0, merchantCategoriyOptions.length)
  ];
};

const randomNum = (min = 0, max = 100): number => {
  let difference = max - min;

  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
};

const main = async () => {
  // await prismaClient.category.createMany({
  //   data: [
  //     { category: "Housing" },
  //     { category: "Transportation" },
  //     { category: "Food" },
  //     { category: "Utilities" },
  //     { category: "Personal spending" },
  //     { category: "Recreation & Entertainment" },
  //     { category: "Miscellaneous" },
  //     { category: "Clothes" },
  //     { category: "Gifts" },
  //     { category: "Insurance" },
  //     { category: "Fitness & Lifestyle" },
  //     { category: "Medical & Healthcare" },
  //     { category: "Saving, Investing, & Debt Payments" },
  //   ],
  // });
};

main();
