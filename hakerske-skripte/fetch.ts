// import { PrismaClient } from "@prisma/client";
// import { randomUUID } from "crypto";
// import { fstat, writeFileSync } from "fs";

// const prisma = new PrismaClient();

// async function main() {
//   const items = await prisma.expenses.findMany({
//     include: {
//       expense_item: {
//         select: {
//           title: true,
//         },
//       },
//     },
//   });

//   console.log(items);
//   writeFileSync("a.json", JSON.stringify(items));
// }

// main();
