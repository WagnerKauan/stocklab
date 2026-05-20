



import { prisma } from "./prisma";




const teste = async () => await prisma.variant.findMany()

// const variants = await teste()