import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import UserRoutes from "./views/User/UserRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import KhoRoutes from "./views/Kho/KhoRoutes";
import ConstantList from "./appConfig";
import MenuRoutes from "./views/Menus/MenuRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";
import apartmentRouters from "./views/Apartment/ApartmentRouters";
import khoRoutes from "./views/Kho/KhoRoutes";
import NhanVienRoutes from "./views/NhanVien/NhanVienRoutes";
import projectRoutes from "./views/Project/ProjectRoutes";
import BuildingRoutes from "./views/Building/BuildingRoutes";
import RealEstateOwnerTypeRoutes from "./views/RealEstateOwnerType/RealEstateOwnerTypeRoutes";
import RealStateTypeRoutes from "./views/RealStateType/RealStateTypeRoutes";
import DonViTinhRoutes from "./views/DonViTinh/DonViTinhRoutes";
import RequirementTypeRoutes from "./views/RequirementType/RequirementTypeRoutes";
import SanPhamRoutes from "./views/SanPham/SanPhamRoutes";
import PhieuNhapKhoRoutes from "./views/PhieuNhapKho/PhieuNhapKhoRoutes";const redirectRoute = [
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
  ...BuildingRoutes,
  ...projectRoutes,
  ...NhanVienRoutes,
  ...khoRoutes,
  ...apartmentRouters,
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...UserRoutes,
  ...roleRoutes,
  ...MenuRoutes,
  ...RealEstateOwnerTypeRoutes,
  ...RealStateTypeRoutes,
  ...DonViTinhRoutes,
  ...RequirementTypeRoutes,
  ...SanPhamRoutes,
  ...PhieuNhapKhoRoutes,
  ...errorRoute,
];

export default routes;
