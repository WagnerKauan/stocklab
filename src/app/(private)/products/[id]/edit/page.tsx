import { CardMain } from "@/components/layout/cardMain";
import { FormProduct } from "@/components/product/formProduct";
import { productRepository } from "@/repository/product";
import { sortVariants } from "@/utils/sizeOrder";





export default async function ProductEdit({params}: {params: Promise<{id: string}>}) {

  const { id } = await params

  const product = await productRepository.findById(id)

  if(!product) {
    return <CardMain>Product not found</CardMain>
  }

  product.variants = sortVariants(product.variants)

  return(
    <CardMain>
      <FormProduct initialData={product} />
    </CardMain>
  )
}