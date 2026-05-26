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