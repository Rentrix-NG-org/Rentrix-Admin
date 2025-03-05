import { ReactNode, useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { UserContext } from "./user.context";
import { useLocation } from "react-router";

interface UserProviderProps {
  children: ReactNode;
}

const { getOwnedPermissions } = UserService();

export const UserProvider = ({ children }: UserProviderProps) => {
  const [permissions, setPermissions] = useState<string[] | null>([]);
  const location = useLocation();
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
        setPermissions(null);
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
