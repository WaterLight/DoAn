import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Agency = EgretLoadable({
  loader: () => import("./BaoCaoDonHang")
});
const ViewComponent = withTranslation()(Agency);
const BaoCaoDonHangRoutes = [
  {
    path: ConstantList.ROOT_PATH + "directory/BaoCaoDonHang",
    exact: true,
    component: ViewComponent
  }
];

export default BaoCaoDonHangRoutes;