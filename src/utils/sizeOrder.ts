import { ProductVariant } from "@/models/product/product-model";




export function sortVariants(
  variants: ProductVariant[]
) {

  const order: Record<string, number> = {
    PP:1,
    P:2,
    M:3,
    G:4,
    GG:5,
    XG:6,
    XXG:7,

    PEQUENO:1,
    MÉDIO:3,
    MEDIO:3,
    GRANDE:5,
    EXTRAGRANDE:7,
  }

  return variants.toSorted((a,b)=>{

    const sizeA =
      a.size
        ?.trim()
        .toUpperCase()
      ?? '';

    const sizeB =
      b.size
        ?.trim()
        .toUpperCase()
      ?? '';

    return (
      (order[sizeA] ?? 999)
      -
      (order[sizeB] ?? 999)
    )

  })
}