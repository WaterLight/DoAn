import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const RealEstateSourceTable = EgretLoadable({
  loader: () => import("./ThuocTinhSanPhamTable")
});
const ViewComponent = withTranslation()(RealEstateSourceTable);

const ThuocTinhSanPhamRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"directory/thuocTinhSanPham",
    exact: true,
    component: ViewComponent
  }
];

export default ThuocTinhSanPhamRoutes;