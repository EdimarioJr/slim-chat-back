import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function main() {
//   await prisma.user.deleteMany({});
//   await prisma.user.create({
//     data: {
//       email: "edimario@teste.com.br",
//       name: "Edimário",
//       password: "edimario",
//       profilePhoto: "edimarioFoto",
//     },
//   });
// }

// main()
//   .catch((e: Error) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // Disconnect Prisma Client
//     await prisma.$disconnect();
//   });
