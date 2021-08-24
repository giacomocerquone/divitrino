import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "gcm@mail.com",
    password: bcrypt.hashSync("password", 8),
    name: "Giacomo",
  },
  {
    email: "gvn@mail.com",
    password: bcrypt.hashSync("password", 8),
    name: "Giovanni",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  try {
    const group = await prisma.group.create({
      data: {
        name: "Gruppo 1",
      },
    });
    console.log(`Created group with id: ${group.id}`);
    const createdUsers = [];

    for (const u of userData) {
      const user = await prisma.user.create({
        data: {
          ...u,
          groups: {
            connect: {
              id: group.id,
            },
          },
        },
      });
      createdUsers.push(user);
      console.log(
        `Created user with id: ${user.id} attached to group with id: ${group.id}`
      );
    }

    const purchase = await prisma.purchase.create({
      data: {
        payerId: createdUsers?.[0]?.id,
        amount: 250,
        groupId: group.id,
        description: "Spesa conad pagata da Giacomo",
        createdAt: new Date(),
        products: {
          create: [
            {
              name: "Prodotto diviso in due",
              pricePerDebtor: 50,
              debtors: {
                connect: [
                  {
                    id: createdUsers?.[0]?.id,
                  },
                  {
                    id: createdUsers?.[1]?.id,
                  },
                ],
              },
            },
            {
              name: "Prodotto di Giacomo",
              pricePerDebtor: 100,
              debtors: {
                connect: [
                  {
                    id: createdUsers?.[0]?.id,
                  },
                ],
              },
            },
            {
              name: "Prodotto di Giovanni",
              pricePerDebtor: 100,
              debtors: {
                connect: [
                  {
                    id: createdUsers?.[1]?.id,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    console.log(
      `Purchase payed by user with id ${createdUsers?.[0]?.id} in group with id ${group.id} which contains three product: one divided, 
  one bought from user 1, one bought from user 2`
    );

    console.log(`Seeding finished.`);
  } catch (e) {
    console.log("Seeding errored", e);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
