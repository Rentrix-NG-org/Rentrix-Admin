import { User } from "@src/modules/user/types/user.types";

export interface Account {
  id: string;
  user: User;
  createdAt: string;
}

export interface Transaction {
  id: string;
}

export interface Log {
  id: string;
  user: User;
  account: Account;
  amount: number;
  transaction: Transaction;
  affectedUser: User;
  createdAt: string;
  valueBefore: string;
  valueAfter: string;
  action: string;
  devices: string[];
  referral: string;
  status: string;
}

export interface Admin {
  id: string;
  user: User;
  accessModules: string[];
  createdAt: string;
}
