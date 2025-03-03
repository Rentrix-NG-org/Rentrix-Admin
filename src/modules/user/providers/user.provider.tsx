import { ReactNode, useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { UserContext } from "./user.context";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const { getOwnedPermissions } = UserService();
  useEffect(() => {
    async function fetchPermissions() {
      const response = await getOwnedPermissions();
      if (response.success) {
        setPermissions(
          response.data.map((r: { name: string }) => {
            return r.name || r;
          }),
        );
      }
    }
    fetchPermissions();
  }, []);

  return (
    <UserContext.Provider value={{ permissions }}>
      {children}
    </UserContext.Provider>
  );
};
