import type { UserData } from "@/models/user/user-model";
import { userSchema } from "@/schemas/user/user.schema";


type ErrorInput = {
  message: string;
  field: string;
  id?: string
}

export function validateUser(user: UserData): ErrorInput[] {

  const result = userSchema.safeParse(user)

  if(!result.success) {
    const errors = result.error.issues.reduce<ErrorInput[]>((errs, issue) => {
      errs.push({
        message: issue.message,
        field: issue.path[0].toString(),
      })

      return errs
    }, []) 

    return errors
  }

  return []
}



export function validateLogin(user: { email: string; password: string }): ErrorInput[] {
  const isValidEmail = userSchema.shape.email.safeParse(user.email)
  const isValidPassword = userSchema.shape.password.safeParse(user.password)

  if(!isValidEmail.success) {
    const errorsEmail = isValidEmail.error.issues.reduce<ErrorInput[]>((errs, issue) => {
    errs.push({
      message: issue.message,
      field: 'email',
    })

    return errs
  }, [])

    return errorsEmail 
  }

  if(!isValidPassword.success) {
    const errorsPassword = isValidPassword.error.issues.reduce<ErrorInput[]>((errs, issue) => {
    errs.push({
      message: issue.message,
      field: 'password',
    })

    return errs
  }, [])

    return errorsPassword 
  }

  return []
}