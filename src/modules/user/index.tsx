import { RouteObject } from "react-router";
import UserManagement from "./pages/main";
import UserDetails from "./pages/[userId]/UserDetails";

export interface UserManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const UserManagementModule: UserManagementModule = {
  routes: [
    { path: "/user", element: <UserManagement />, title: "User Management" },
    { path: "/user/:userId", element: <UserDetails /> },
  ],
  name: "User Management",
  enabled: true,
};
