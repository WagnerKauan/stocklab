import { prisma } from "./prisma";







async function teste() {
  await prisma.stockMovement.create({
    data: {
      type: "IN",
      quantity:10,
      productId:"cmpnn5aac000058vu8v7nuxk6",
      variantId: "cmpnn5ab0000358vuy769xzqv",
      userId: "cmpnmdq9s0000msvuuo7wgdfv",

    }
  })
}


// teste()