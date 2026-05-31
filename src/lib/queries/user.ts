import { CreateAccountParams, FindAccountById, updateAvatarProps } from "@/models/queries/queries"
import { UserData } from "@/models/user/user-model"
import { userRepository } from "@/repository/user"




export const findUserById = async (id: string) => {
  return await userRepository.findById(id)
}


export const findAllUsers = async () => {
  return await userRepository.findAll()
}


export const findUserByEmail = async (email: string) => {
  return await userRepository.findByEmail(email)
}

export const createUser = async (data: UserData) => {
  return await userRepository.create(data)
} 


export const findAccountById = async ({provider, providerAccountId,}: FindAccountById) => {
  return await userRepository.findAccountByid({provider, providerAccountId,})
}

export const findAccountByUserId = async (userId: string) => {
  return await userRepository.findAccountByUserId(userId)
}

export const createAccount = async ({userId, provider, providerAccountId, googleEmail}: CreateAccountParams) => {
  return await userRepository.createAccount({userId, provider, providerAccountId, googleEmail})
}


export const disconnectAccount = async ({provider, providerAccountId}: FindAccountById) => {
  return await userRepository.disconnectAccount({provider, providerAccountId})
}