import { expense_item } from "@prisma/client";
import { prismaClient } from "../src/utils/prisma.utils";

export const randomNum = (min = 0, max = 100): number => {
  let difference = max - min;

  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
};

function randomFloat(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export const generateExpense = () => {
  let userId = "104";
  console.log(randomDate(new Date(2022, 1, 1), new Date()));
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const main = async () => {
  try {
    const categories = await prismaClient.category.findMany({});

    for (let i = 0; i < 15; i++) {
      const { merchant, category } = merchantCategoryCombo();
      const expense = await prismaClient.expenses.create({
        data: {
          merchant: merchant,
          category: category,
          date: randomDate(new Date(2022, 1, 1), new Date()),
          account_id: 5,
          user_id: 103,
        },
      });

      for (let i = 0; i < randomNum(5, 25); i++) {
        const { title, price } = getRandomItemsWithPrices();
        const items = await prismaClient.expense_item.create({
          data: {
            title,
            price,
            amount: randomNum(1, 5),
            expense_id: expense.id,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function createCategories() {
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
}

function getRandomItemsWithPrices() {
  const randomItems = [
    { title: "Ajvar Podravka 500g", price: 12 },
    { title: "Mlijeko 1L", price: 6 },
    { title: "Bijeli Kruh", price: 6 },
    { title: "Raženi kruh", price: 8 },
    { title: "Krastavci 500g", price: 18 },
    { title: "Bečka juha", price: 7 },
    { title: "Mesni narezak", price: 16 },
    { title: "Logitech tipkovnica", price: 899 },
    { title: "Lg tv", price: 1399 },
    { title: "Lg monitor", price: 1569 },
    { title: "Pekmez marelica", price: 9 },
    { title: "Kebab", price: 27 },
    { title: "Labello", price: 15 },
    { title: "Nivea krema", price: 20 },
    { title: "Novine", price: 7 },
    { title: "Signal pasta za zube", price: 12 },
    { title: "Studena voda 0.5", price: 6 },
    { title: "Studena voda 1.0", price: 11 },
    { title: "Jamnica 0.5", price: 7 },
    { title: "Coca cola 0.5", price: 13 },
    { title: "Bilježnica 0.5", price: 4 },
    { title: "Staklene čaše", price: 55 },
    { title: "Kava", price: 11 },
    { title: "Kava s mlijekom", price: 12 },
    { title: "Čaj", price: 10 },
    { title: "Med", price: 2 },
    { title: "Žvake", price: 6 },
    { title: "Rexona roll on", price: 26 },
    { title: "Nivea gel", price: 21 },
    { title: "Šišanje", price: 50 },
    { title: "Osiguranje", price: 1200 },
    { title: "Tehnički", price: 1400 },
    { title: "Kapa", price: 39 },
    { title: "Jakna", price: 650 },
    { title: "Carape", price: 55 },
    { title: "Majica", price: 35 },
    { title: "Zarulja", price: 19 },
  ];

  return randomItems[randomNum(0, randomItems.length)];
}

const merchantCategoryCombo = () => {
  const merchantsAndCategories = [
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

  return merchantsAndCategories[randomNum(0, merchantsAndCategories.length)];
};

main();
