import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import UserRoutes from "./views/User/UserRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import DonViTinhRoutes from "./views/DonViTinh/DonViTinhRoutes";
import KhoRoutes from "./views/Kho/KhoRoutes";
import ConstantList from "./appConfig";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />//Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  }
];

const routes = [
  ...DonViTinhRoutes,
  ...KhoRoutes,
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...UserRoutes,
  ...roleRoutes,
  ...errorRoute,
];

export default routes;
