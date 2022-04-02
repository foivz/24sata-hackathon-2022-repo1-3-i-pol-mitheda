// import { PrismaClient } from "@prisma/client";
// import { randomUUID } from "crypto";

// const prisma = new PrismaClient();

// function randomDate(start: Date, end: Date) {
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

// function randomMerchant() {
//   return randomChoice([
//     "Konzum",
//     "LIDL",
//     "Lonia",
//     "SportsVision",
//     "Magma",
//     "Mall.hr",
//     "Links",
//     "ADM",
//     "ABOUTYOU",
//   ]);
// }

// function randomChoice(arr: any) {
//   return arr[Math.floor(arr.length * Math.random())];
// }

// function getRandomItem() {
//   return {
//     title: randomChoice([
//       "Ajvar Podravka 500g",
//       "Mlijeko 1L",
//       "Bijeli Kruh",
//       "Raženi kruh",
//       "Krastavci 500g",
//       "Bečka juha",
//       "Mesni narezak",
//     ]) as string,
//     amount: getRandomInt(1, 5),
//     price: parseFloat(getRandomArbitrary(0.2, 500)),
//   };
// }

// function randomItems() {
//   const num = getRandomInt(7, 24);
//   const items: {
//     title: string;
//     amount: number;
//     price: number;
//   }[] = [];
//   for (let i = 0; i < num; i++) {
//     items.push(getRandomItem());
//   }
//   return items;
// }

// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomArbitrary(min: number, max: number) {
//   return (Math.random() * (max - min) + min).toFixed(2);
// }

// async function main() {
//     await prisma.users.create({
//       data: {
//         email: randomUUID().toString(),
//         username: randomUUID().toString(),
//         cognito_id: randomUUID().toString(),
//         accounts: {
//           create: {
//             balance: 100.23,
//             name: "ZABA",
//             expenses: {
//               create: [
//                   {
//                     title: "",
//                     date: randomDate(new Date(2022, 2, 1), new Date()),
//                     merchant: randomMerchant(),
//                     expense_item: {
//                       createMany: {
//                         data: randomItems(),
//                       },
//                     },
//                   },

//                 ],
//             },
//           },
//         },
//       },
//     });

//   await prisma.expenses.create({
//     data: {
//       user_id: 103,
//       account_id: 5,
//       title: "",
//       date: randomDate(new Date(2022, 2, 1), new Date()),
//       merchant: randomMerchant(),
//       expense_item: {
//         createMany: {
//           data: randomItems(),
//         },
//       },
//     },
//   });

//   await prisma.expenses.create({
//     data: {
//       user_id: 103,
//       account_id: 5,
//       title: "",
//       date: randomDate(new Date(2022, 2, 1), new Date()),
//       merchant: randomMerchant(),
//       expense_item: {
//         createMany: {
//           data: randomItems(),
//         },
//       },
//     },
//   });

//   await prisma.expenses.create({
//     data: {
//       user_id: 103,
//       account_id: 5,
//       title: "",
//       date: randomDate(new Date(2022, 2, 1), new Date()),
//       merchant: randomMerchant(),
//       expense_item: {
//         createMany: {
//           data: randomItems(),
//         },
//       },
//     },
//   });

//   console.log("done");
// }

// main();
