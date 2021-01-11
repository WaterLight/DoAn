import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const DonViTinhTable = EgretLoadable({
  loader: () => import("./DonViTinhTable")
});
const ViewComponent = withTranslation()(DonViTinhTable);

const DonViTinhRoutes = [
  {
    path:  ConstantList.ROOT_PATH + "directory/donvitinh",
    exact: true,
    component: ViewComponent
  }
];

export default DonViTinhRoutes;
