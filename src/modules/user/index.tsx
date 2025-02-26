import { RouteObject } from "react-router";
import UserManagement from "./pages/main";
import UserDetails from "./pages/[userId]/UserDetails";
import UserEdit from "./pages/[userId]/edit/UserEdit";
import ViewListings from "./pages/[userId]/listings/ViewListings";
import TransactionHistories from "./pages/[userId]/transactions/Transactions";
import ActivityLogs from "./pages/[userId]/logs/ActivityLogs";
import AddUser from "./pages/create/AddUser";
import RepDetails from "./pages/[userId]/RepDetails";
import LandlordsTenants from "./pages/landlords-tenants/Landlords-Tenants";
import SupervisorsReps from "./pages/supervisors-reps/SupervisorsReps";
import AdminDetails from "./pages/[userId]/AdminDetails";
import GrantAccess from "./pages/[userId]/grant-access/GrantAccess";
import AddRentrixRep from "./pages/add-rep/AddRep";

export interface UserManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const UserManagementModule: UserManagementModule = {
  routes: [
    { path: "/users", element: <UserManagement />, title: "User Management" },
    {
      path: "/users/roles/landlords-tenants",
      element: <LandlordsTenants />,
      title: "Landlords & Tenants",
    },
    {
      path: "/users/roles/supervisors-reps",
      element: <SupervisorsReps />,
      title: "Landlords & Tenants",
    },
    { path: "/users/create", element: <AddUser /> },
    { path: "/users/add-rep", element: <AddRentrixRep /> },
    { path: "/users/:userId", element: <UserDetails /> },
    { path: "/users/:userId/edit", element: <UserEdit /> },
    { path: "/users/:userId/listings", element: <ViewListings /> },
    { path: "/users/:userId/transactions", element: <TransactionHistories /> },
    { path: "/users/:userId/logs", element: <ActivityLogs /> },
    { path: "/users/:userId/rentrix-rep", element: <RepDetails /> },
    { path: "/users/:userId/admin", element: <AdminDetails /> },
    { path: "/users/:userId/admin/grant-access", element: <GrantAccess /> },
  ],
  name: "User Management",
  enabled: true,
};
