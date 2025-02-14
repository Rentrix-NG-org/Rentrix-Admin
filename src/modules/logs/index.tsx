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
      path: "/logs/user-auth",
      element: <UserAuthentication />,
      title: "User Authentication Logs",
    },
  ],
  name: "Logs",
  enabled: true,
};
