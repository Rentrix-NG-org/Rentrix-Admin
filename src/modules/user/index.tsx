import { RouteObject } from "react-router";
import UserManagement from "./pages/main";
import UserDetails from "./pages/[userId]/UserDetails";
import UserEdit from "./pages/[userId]/edit/UserEdit";

export interface UserManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const UserManagementModule: UserManagementModule = {
  routes: [
    { path: "/user", element: <UserManagement />, title: "User Management" },
    { path: "/user/:userId", element: <UserDetails /> },
    { path: "/user/:userId/edit", element: <UserEdit /> },
  ],
  name: "User Management",
  enabled: true,
};
