import { RouteObject } from "react-router";
import Logs from "./pages/main";
import AdminActionMenu from "./pages/admin-menu/AdminAction";
import UserRole from "./pages/admin-menu/assignment/UserRole";
import UserRoleInfo from "./pages/admin-menu/assignment/[logId]/LogInfo";
import PolicyUpdates from "./pages/admin-menu/policy-updates/Policy";
import PolicyUpdatesInfo from "./pages/admin-menu/policy-updates/[logId]/LogInfo";
import AdminPanel from "./pages/admin-menu/panel-access/AdminPanel";
import AdminPanelInfo from "./pages/admin-menu/panel-access/[logId]/AdminInfo";
import UserAccountManagement from "./pages/account-mgmt/AccountMgmt";
import AccountCreation from "./pages/account-mgmt/account-creation/AccountCreation";
import AccountCreationInfo from "./pages/account-mgmt/account-creation/[logId]/LogInfo";
import ProfileUpdates from "./pages/account-mgmt/profile-updates/ProfileUpdates";
import ProfileUpdatesInfo from "./pages/account-mgmt/profile-updates/[logId]/LogInfo";
import PasswordChanges from "./pages/account-mgmt/password-changes/PasswordChanges";
import PasswordChangesInfo from "./pages/account-mgmt/password-changes/[logId]/LogInfo";
import UserAuthentication from "./pages/user-auth/UserAuth";
import AccountDeletion from "./pages/account-mgmt/account-deletion/AccountDeletion";
import AccountDeletionInfo from "./pages/account-mgmt/account-deletion/[logId]/LogInfo";
import LoginLogOut from "./pages/user-auth/login-logout/LoginLogout";
import LoginLogoutInfo from "./pages/user-auth/login-logout/[logId]/LogInfo";
import FailedLogin from "./pages/user-auth/failed-login/FailedLogin";
import FailedLoginInfo from "./pages/user-auth/failed-login/[logId]/LogInfo";
import PaymentTransactions from "./pages/payment/Payment";
import PaymentInitiation from "./pages/payment/initiation/PaymentInitiation";
import PaymentInitiationInfo from "./pages/payment/initiation/[logId]/LogInfo";
import PropertyManagement from "./pages/property-mgmt/PropertyMgmt";
import ListingCreation from "./pages/property-mgmt/listing-creation/ListingCreation";
import ListingCreationInfo from "./pages/property-mgmt/listing-creation/[logId]/LogInfo";
import ListingUpdates from "./pages/property-mgmt/listing-updates/ListingUpdates";
import ListingUpdatesInfo from "./pages/property-mgmt/listing-updates/[logId]/LogInfo";
import ListingRemoval from "./pages/property-mgmt/listing-removal/ListingRemoval";
import ListingRemovalInfo from "./pages/property-mgmt/listing-removal/[logId]/LogInfo";
import ViewingRequest from "./pages/property-mgmt/viewing-request/ViewingRequest";
import AgeRestriction from "./pages/account-mgmt/age-restriction/AgeRestriction";
import AgeRestrictionInfo from "./pages/account-mgmt/age-restriction/[logId]/LogInfo";
import AdminLogins from "./pages/user-auth/admin-login/AdminLogins";
import { UserProvider } from "../user/providers/user.provider";

export interface LogsModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const LogsModule: LogsModule = {
  routes: [
    {
      path: "/logs",
      element: <Logs />,
      title: "Logs",
    },
    {
      path: "/logs/admin-action",
      element: <AdminActionMenu />,
      title: "Administrative Action Logs",
    },
    {
      path: "/logs/admin-action/user-role-assignment",
      element: <UserRole />,
      title: "User Role Assignment/Changes",
    },
    {
      path: "/logs/admin-action/user-role-assignment/:logId",
      element: <UserRoleInfo />,
      title: "User Role Assignment/Changes Info",
    },
    {
      path: "/logs/admin-action/policy-terms",
      element: <PolicyUpdates />,
      title: "Policy/Terms Updates",
    },
    {
      path: "/logs/admin-action/policy-terms/:logId",
      element: <PolicyUpdatesInfo />,
      title: "Policy/Terms Updates Info",
    },
    {
      path: "/logs/admin-action/panel-access",
      element: <AdminPanel />,
      title: "Admin Panel Access",
    },
    {
      path: "/logs/admin-action/panel-access/:userId",
      element: <AdminPanelInfo />,
      title: "Admin Panel Access Info",
    },
    {
      path: "/logs/user-account",
      element: <UserAccountManagement />,
      title: "User Account Management Logs",
    },
    {
      path: "/logs/user-account/account-creation",
      element: <AccountCreation />,
      title: "User Account Creation Logs",
    },
    {
      path: "/logs/user-account/account-creation/:logId",
      element: <AccountCreationInfo />,
      title: "User Account Creation Info",
    },
    {
      path: "/logs/user-account/profile-updates",
      element: <ProfileUpdates />,
      title: "Profile Updates",
    },
    {
      path: "/logs/user-account/profile-updates/:logId",
      element: <ProfileUpdatesInfo />,
      title: "Profile Updates Info",
    },
    {
      path: "/logs/user-account/password-changes",
      element: <PasswordChanges />,
      title: "Profile Updates Info",
    },
    {
      path: "/logs/user-account/password-changes/:logId",
      element: <PasswordChangesInfo />,
      title: "Password Changes Info",
    },
    {
      path: "/logs/user-account/account-deletion",
      element: <AccountDeletion />,
      title: "Account Deletion",
    },
    {
      path: "/logs/user-account/account-deletion/:logId",
      element: <AccountDeletionInfo />,
      title: "Account Deletion Info",
    },
    {
      path: "/logs/user-account/age-restriction",
      element: <AgeRestriction />,
      title: "Age Restriction",
    },
    {
      path: "/logs/user-account/age-restriction/:logId",
      element: <AgeRestrictionInfo />,
      title: "Age Restriction Info",
    },
    {
      path: "/logs/user-auth",
      element: <UserAuthentication />,
      title: "User Authentication Logs",
    },
    {
      path: "/logs/user-auth/login-logout",
      element: <LoginLogOut />,
      title: "User Authentication Logs",
    },
    {
      path: "/logs/user-auth/login-logout/:logId",
      element: <LoginLogoutInfo />,
      title: "Login/Logout Info",
    },
    {
      path: "/logs/user-auth/failed-login",
      element: <FailedLogin />,
      title: "Failed Login Info",
    },
    {
      path: "/logs/user-auth/failed-login/:logId",
      element: <FailedLoginInfo />,
      title: "Failed Login Info",
    },
    {
      path: "/logs/payment",
      element: <PaymentTransactions />,
      title: "Payment Transactions Logs",
    },
    {
      path: "/logs/payment/initiation",
      element: <PaymentInitiation />,
      title: "Payment Initiation Logs",
    },
    {
      path: "/logs/payment/initiation/:logId",
      element: <PaymentInitiationInfo />,
      title: "Payment Initiation Info",
    },
    {
      path: "/logs/property-management",
      element: <PropertyManagement />,
      title: "Property Management Logs",
    },
    {
      path: "/logs/property-management/listing-creation",
      element: <ListingCreation />,
      title: "Property Listing Creation",
    },
    {
      path: "/logs/property-management/listing-creation/:logId",
      element: <ListingCreationInfo />,
      title: "Property Listing Creation Info",
    },
    {
      path: "/logs/property-management/listing-updates",
      element: <ListingUpdates />,
      title: "Property Listing Update",
    },
    {
      path: "/logs/property-management/listing-updates/:logId",
      element: <ListingUpdatesInfo />,
      title: "Property Listing Update Info",
    },
    {
      path: "/logs/property-management/listing-removal",
      element: <ListingRemoval />,
      title: "Property Listing Deletion",
    },
    {
      path: "/logs/property-management/listing-removal/:logId",
      element: <ListingRemovalInfo />,
      title: "Property Listing Deletion Info",
    },
    {
      path: "/logs/property-management/viewing-requests",
      element: <ViewingRequest />,
      title: "Viewing Request",
    },
    {
      path: "/logs/user-auth/admin-login-logout",
      element: (
        <UserProvider>
          <AdminLogins />
        </UserProvider>
        ),
      title: "Admin Login/Logout Logs",
    }
  ],
  name: "Logs",
  enabled: true,
};
