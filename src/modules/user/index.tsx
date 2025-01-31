import { RouteObject } from "react-router";
import UserManagement from "./pages/main";
import UserDetails from "./pages/[userId]/UserDetails";
import UserEdit from "./pages/[userId]/edit/UserEdit";
import ViewListings from "./pages/[userId]/listings/ViewListings";
import TransactionHistories from "./pages/[userId]/transactions/Transactions";
import ActivityLogs from "./pages/[userId]/logs/ActivityLogs";
import AddUser from "./pages/create/AddUser";

export interface UserManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const UserManagementModule: UserManagementModule = {
  routes: [
    { path: "/users", element: <UserManagement />, title: "User Management" },
    { path: "/users/create", element: <AddUser /> },
    { path: "/users/:userId", element: <UserDetails /> },
    { path: "/users/:userId/edit", element: <UserEdit /> },
    { path: "/users/:userId/listings", element: <ViewListings /> },
    { path: "/users/:userId/transactions", element: <TransactionHistories /> },
    { path: "/users/:userId/logs", element: <ActivityLogs /> },
  ],
  name: "User Management",
  enabled: true,
};
