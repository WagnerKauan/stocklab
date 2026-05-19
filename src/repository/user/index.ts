import { SqliteUserRepository } from "./sqlite-user-repository";
import { UserRepository } from "./user-repository";



export const userRepository: UserRepository = new SqliteUserRepository()