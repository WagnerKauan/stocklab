export type FindAccountById = {
  provider: string;
  providerAccountId: string;
  
}

export type CreateAccountParams = {
  userId: string;
  provider: string;
  providerAccountId: string;
}