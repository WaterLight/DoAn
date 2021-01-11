import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const KhoTable = EgretLoadable({
  loader: () => import("./KhoTable")
});
const ViewComponent = withTranslation()(KhoTable);

const KhoRoutes = [
  {
    path:  ConstantList.ROOT_PATH + "directory/kho",
    exact: true,
    component: ViewComponent
  }
];

export default KhoRoutes;
