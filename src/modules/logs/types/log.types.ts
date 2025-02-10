import { User } from "@src/modules/user/types/user.types";

export interface Log {
  id: string;
  user: User;
  affectedUser: User;
  createdAt: string;
  action: string;
  devices: string[];
  status: string;
}

export interface Admin {
  id: string;
  user: User;
  accessModules: string[];
  createdAt: string;
}
