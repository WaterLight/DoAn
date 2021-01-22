import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const RealEstateSourceTable = EgretLoadable({
  loader: () => import("./DonHangTable")
});
const ViewComponent = withTranslation()(RealEstateSourceTable);

const DonHangRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"directory/donHang",
    exact: true,
    component: ViewComponent
  }
];

export default DonHangRoutes;