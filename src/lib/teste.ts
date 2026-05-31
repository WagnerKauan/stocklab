import { prisma } from "./prisma";







async function teste() {
  await prisma.account.update({
    where: {
      id: 'cmpnmdqa10001msvu2u00lw5u'
    },
    data: {
      googleEmail: 'kauanw711@gmail.com'
    }
  })
}


// teste()