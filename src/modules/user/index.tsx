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
import EditDetails from "./pages/add-rep/EditDetails";
import ChangeLocation from "./pages/[userId]/change-location/ChangeLocation";
import { UserProvider } from "./providers/user.provider";
import Admins from "./pages/admins/Admins";
import PasswordRequests from "./pages/password-requests/PasswordRequests";
import AdminProfile from "../profile/AdminProfile";

export interface UserManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const UserManagementModule: UserManagementModule = {
  routes: [
    {
      path: "/profile",
      element: (
        <UserProvider>
          <AdminProfile />
        </UserProvider>
      )
    },
    {
      path: "/users",
      element: (
        <UserProvider>
          <UserManagement />
        </UserProvider>
      ),
      title: "User Management",
    },
    {
      path: "/users/roles/landlords-tenants",
      element: (
        <UserProvider>
          <LandlordsTenants />
        </UserProvider>
      ),
      title: "Landlords & Tenants",
    },
    {
      path: "/users/roles/supervisors-reps",
      element: (
        <UserProvider>
          <SupervisorsReps />
        </UserProvider>
      ),
      title: "Landlords & Tenants",
    },
    {
      path: "/users/roles/admins",
      element: (
        <UserProvider>
          <Admins />
        </UserProvider>
      ),
      title: "Landlords & Tenants",
    },
    {
      path: "/users/roles/password-requests",
      element: (
        <UserProvider>
          <PasswordRequests />
        </UserProvider>
      ),
      title: "Landlords & Tenants",
    },
    {
      path: "/users/create",
      element: (
        <UserProvider>
          <AddUser />
        </UserProvider>
      ),
    },
    {
      path: "/users/add-rep",
      element: (
        <UserProvider>
          <AddRentrixRep />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId",
      element: (
        <UserProvider>
          <UserDetails />
        </UserProvider>
      ),
    },
    {
      path: "/users/add-rep/:userId/details",
      element: (
        <UserProvider>
          <EditDetails />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/edit",
      element: (
        <UserProvider>
          <UserEdit />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/listings",
      element: (
        <UserProvider>
          <ViewListings />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/transactions",
      element: (
        <UserProvider>
          <TransactionHistories />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/logs",
      element: (
        <UserProvider>
          <ActivityLogs />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/rentrix-rep",
      element: (
        <UserProvider>
          <RepDetails />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/rentrix-rep/change-location",
      element: (
        <UserProvider>
          <ChangeLocation />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/admin",
      element: (
        <UserProvider>
          <AdminDetails />
        </UserProvider>
      ),
    },
    {
      path: "/users/:userId/admin/grant-access",
      element: (
        <UserProvider>
          <GrantAccess />
        </UserProvider>
      ),
    },
  ],
  name: "User Management",
  enabled: true,
};
