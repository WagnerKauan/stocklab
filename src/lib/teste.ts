



import { prisma } from "./prisma";




const teste = async () => await prisma.user.findUnique({
  where: {
    id: 'teste123'
  }
})

// teste()

// const variants = await teste()