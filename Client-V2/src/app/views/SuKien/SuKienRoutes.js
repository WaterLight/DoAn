import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const SuKien = EgretLoadable({
  loader: () => import("./SuKien")
});
const ViewComponent = withTranslation()(SuKien);

const SuKienRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"directory/sukien",
    exact: true,
    component: ViewComponent
  }
];

export default SuKienRoutes;