import { lazy } from "react";

// project imports
import Loadable from "../component/Loadable";
import MainLayout from "../layout/MainLayout";
import DataValidationPage from "../pages/DataValidationPage";

// dashboard routing
const OrderPlacementPage = Loadable(
  lazy(() => import("../pages/OrderPlacementPage"))
);
const SettingsPage = Loadable(lazy(() => import("../pages/SettingsPage")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <OrderPlacementPage />,
    },
    {
      path: "/orderPlacement/",
      element: <OrderPlacementPage />,
    },
    {
      path: "/settings/",
      element: <SettingsPage />,
    },
    {
      path: "/data",
      element: <DataValidationPage />,
    },
  ],
};

export default MainRoutes;
