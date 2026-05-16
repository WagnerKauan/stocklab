"use server";

import { Variant } from "@/schemas/product/variant.schema"; 


type ProductData = {
  name: string;
  productImage: string;
  variants: Variant[]
}

export async function createProduct(data: ProductData) {
  console.log(data);
}