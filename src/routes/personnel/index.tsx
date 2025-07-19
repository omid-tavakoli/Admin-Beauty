import { lazy } from "react";
import { Route, RouteProps } from "react-router-dom";

const DashboardLayout = lazy(() => import("../../layouts/DashboardLayout"));
const Dashboard = lazy(() => import("../../pages/dashboard"));
const Services = lazy(() => import("../../pages/Services"));
const Reservation = lazy(() => import("../../pages/Reservation"));
const Profile = lazy(() => import("../../pages/Profile"));
const Account = lazy(() => import("../../pages/Account/Account"));
const NotFound = lazy(() => import("../../pages/404"));

const PersonnelWallet = lazy(() => import("../../pages/Wallet/personnel"));

const PersonnelChildrenRoute: RouteProps[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/wallet",
    element: <PersonnelWallet />,
  },
];

const PersonnelRoute: RouteProps[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: PersonnelChildrenRoute.map((childRoute) => (
      <Route {...childRoute} />
    )),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default PersonnelRoute;
