import { ProfileRepository } from "./repository-profile";
import { SqliteProfileRepository } from "./sqlite-profile-repository";



export const profileRepository: ProfileRepository = new SqliteProfileRepository()