"use server"
import bcrypt from "bcryptjs";




export async function createHash(password: string) {
  const salt =  bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}


export async function compareHash(password: string, hash: string) {

  return await bcrypt.compare(password, hash);
}