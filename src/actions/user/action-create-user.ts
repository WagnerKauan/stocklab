"use server"

import { createUser, findUserByEmail } from "@/lib/queries/user";
import { UserData } from "@/models/user/user-model";
import { validateUser } from "@/validation/user";
import { sanitizeUser } from "@/utils/sanitizeUser";
import { createHash } from "@/lib/auth/bcrypt";
import { createToken } from "@/lib/auth/token";
import { setAuthCookie } from "@/lib/auth/cookies";



export async function actionCreateUser(data: UserData) {
  
  const validation = validateUser(data)

  if(validation.length > 0) {
    return {
      status: false,
      errors: [...validation],
      code: 400
    }
  }

  const existEmail = await findUserByEmail(data.email)

  if(existEmail) {
    return {
      status: false,
      errors: [{
        message: 'Email já cadastrado',
        field: 'email'
      }],
      code: 400
    }
  }

  const sanitazedUser = sanitizeUser(data, 'DB')

  const hashedPassword = await createHash(data.password)

  const user = await createUser({
    ...sanitazedUser,
    password: hashedPassword
  })

  if(!user) {
    return {
      status: false,
      errors: [],
      code: 500
    }
  }

  const token = await createToken(user.id)

  await setAuthCookie(token)

  return {
    status: true,
    errors: [],
    code: 200
  }
}