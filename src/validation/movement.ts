import { ErrorsInput } from "@/models/global/global";
import { MovementData } from "@/models/movements/movements-model";
import { stockMovementSchema } from "@/schemas/stockMoviment/stockMoviment.schema";




export function validateMovement(data: MovementData): ErrorsInput[] {
  const validation = stockMovementSchema.safeParse(data)

  if(!validation.success) {
    const errors = validation.error.issues.reduce<ErrorsInput[]>((errs, issue) => {
      errs.push({
        message: issue.message,
        field: issue.path[0].toString(),
      })

      return errs;
    }, [])
    return sortErrorsMovement(errors);
  }
  return [];
}

function sortErrorsMovement(errs: ErrorsInput[]) {
  const fieldOrder = ['type', 'productId', 'variantId', 'quantity'];
  return errs.sort((a, b) => fieldOrder.indexOf(a.field) - fieldOrder.indexOf(b.field));
}