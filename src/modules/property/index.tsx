import { RouteObject } from "react-router";
import PropertyManagement from "./pages/main";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import EditListing from "./pages/AddNewListing/EditListing";

export interface PropertyManagementModule {
  routes: (RouteObject & { title?: string })[];
  name: string;
  enabled: boolean;
}

export const PropertyManagementModule: PropertyManagementModule = {
  routes: [
    {
      path: "/property-management",
      element: <PropertyManagement />,
      title: "Property Management",
    },
    {
      path: "/property-management/:propertyId/view",
      element: <PropertyDetails />,
      title: "Property Details",
    },
    {
      path: "/property-management/:propertyId/view/edit",
      element: <EditListing />,
      title: "Property Edit",
    },
  ],
  name: "Property Management",
  enabled: true,
};
