import { ErrorInput } from '@/components/product/formProduct';
import { ProductData } from '@/models/product/product-model';
import { productSchema } from '@/schemas/product/product.schema';
import { variantSchema } from '@/schemas/product/variant.schema';
import { sanitizeVariant } from '@/utils/sanitizeVariant';

export function validateProduct(data: ProductData) {
  const { variants, ...product } = { ...data };

  const errorsProduct =
    productSchema
      .safeParse(product)
      .error?.issues.reduce<ErrorInput[]>((errs, issue) => {
        errs.push({
          message: issue.message,
          field: issue.path[0].toString(),
        });
        return errs;
      }, []) || [];

  const errorsVariants = variants.reduce<ErrorInput[]>((errs, variant) => {
    const sanitizedVariant = sanitizeVariant(variant);

    const variantValid = variantSchema.safeParse(sanitizedVariant);
    if (!variantValid.success) {
      variantValid.error.issues.forEach(issue => {
        errs.push({
          id: sanitizedVariant.id,
          message: issue.message,
          field: issue.path[0].toString(),
        });
      });
    }

    return errs;
  }, []);


  return { errorsProduct, errorsVariants };
}
