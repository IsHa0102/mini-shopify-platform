import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  const demoShop = await prisma.shop.upsert({
    where: { slug: "demo-shop" },
    update: {},
    create: {
      name: "Demo Shop",
      slug: "demo-shop",
    },
  })

  const coffeeShop = await prisma.shop.upsert({
    where: { slug: "coffee-shop" },
    update: {},
    create: {
      name: "Coffee Shop",
      slug: "coffee-shop",
    },
  })

  const sneakerShop = await prisma.shop.upsert({
    where: { slug: "sneaker-hub" },
    update: {},
    create: {
      name: "Sneaker Hub",
      slug: "sneaker-hub",
    },
  })

  await prisma.product.createMany({
    data: [
      {
        title: "Espresso Beans",
        price: 15,
        shopId: coffeeShop.id,
      },
      {
        title: "Latte Blend",
        price: 18,
        shopId: coffeeShop.id,
      },
      {
        title: "Running Shoes",
        price: 120,
        shopId: sneakerShop.id,
      },
      {
        title: "Basketball Sneakers",
        price: 150,
        shopId: sneakerShop.id,
      }
    ]
  })

}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })