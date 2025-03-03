import { Outlet } from "react-router";
import { UserProvider } from "../providers/user.provider";

const UserLayout = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default UserLayout;
