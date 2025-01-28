import { RouteObject } from "react-router";
import Logs from "./pages/main";

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
    { path: "/logs/something" },
  ],
  name: "Logs",
  enabled: true,
};
