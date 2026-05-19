import { userRepository } from "@/repository/user"




export const findUserById = async (id: string) => {
  return await userRepository.findById(id)
}


export const findAllUsers = async () => {
  return await userRepository.findAll()
}