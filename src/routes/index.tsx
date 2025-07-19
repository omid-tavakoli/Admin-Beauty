import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, useContext } from "react";
import AuthRoute from "./auth";
import DashboardRoute from "./panel";
import { CreateAuthContext } from "../context/AuthContext";
import PersonnelRoute from "./personnel";

const getAllProtectedRoutes = [...DashboardRoute];
const personnelProtectedRoutes = [...PersonnelRoute];
const getAllRoutes = [...AuthRoute];

export const authRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      getAllProtectedRoutes.map((route) => <Route {...route} />)
    )
  );
};
export const unAuthRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(getAllRoutes.map((route) => <Route {...route} />))
  );
};
export const PersonnelRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      personnelProtectedRoutes.map((route) => <Route {...route} />)
    )
  );
};

const RoutesProvider = () => {
  const user = useContext(CreateAuthContext);

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      {user.isLogin !== "loading" && (
        <RouterProvider
          router={
            user.isLogin === "authenticated"
              ? user.roles.includes(2)
                ? PersonnelRouter()
                : authRouter()
              : unAuthRouter()
          }
        />
      )}
    </Suspense>
  );
};

export default RoutesProvider;
