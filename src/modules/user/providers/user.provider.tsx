import { ReactNode, useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { UserContext } from "./user.context";
import { useLocation } from "react-router";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const location = useLocation();
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
      } else {
        setPermissions([]);
      }
    }
    fetchPermissions();
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ permissions }}>
      {children}
    </UserContext.Provider>
  );
};
