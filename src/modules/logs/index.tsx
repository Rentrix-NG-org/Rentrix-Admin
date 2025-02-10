import { RouteObject } from "react-router";
import Logs from "./pages/main";
import AdminActionMenu from "./pages/admin-menu/AdminAction";
import UserRole from "./pages/admin-menu/assignment/UserRole";
import UserRoleInfo from "./pages/admin-menu/assignment/[logId]/LogInfo";
import PolicyUpdates from "./pages/admin-menu/policy-updates/Policy";

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
  ],
  name: "Logs",
  enabled: true,
};
