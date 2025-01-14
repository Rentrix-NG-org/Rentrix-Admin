import { RouteObject } from "react-router";
import PropertyManagement from "./pages/main";

export interface PropertyManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const PropertyManagementModule: PropertyManagementModule = {
  routes: [
    {
      path: "/property",
      element: <PropertyManagement />,
      title: "Property Management",
    },
    { path: "/property/something" },
  ],
  name: "Property Management",
  enabled: true,
};
