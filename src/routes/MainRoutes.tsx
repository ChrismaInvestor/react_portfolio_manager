import { lazy } from "react";

// project imports
import Loadable from "../component/Loadable";
import MainLayout from "../layout/MainLayout";

// dashboard routing
const OrderPlacementPage = Loadable(
  lazy(() => import("../pages/OrderPlacementPage"))
);
const Settings = Loadable(lazy(() => import("../pages/Settings")));

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
      element: <Settings />,
    },
  ],
};

export default MainRoutes;
