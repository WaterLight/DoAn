const APPLICATION_PATH = "/";
const THUOCTINHSANPHAM_TYPE = {
  size: 1, // kích thước
  color: 2, //màu sắc
};

const LIST_HUOCTINHSANPHAM_TYPE = [
    { id: 1, name: 'Kích thước' },
    { id: 2, name: 'Màu sắc' }
  ]

//const APPLICATION_PATH="/asset_develop/";//Đặt homepage tại package.json giống như tại đây nếu deploy develop
module.exports = Object.freeze({
  //ROOT_PATH : "/egret/",
  ROOT_PATH: APPLICATION_PATH,
  ACTIVE_LAYOUT: "layout1", //layout1 = vertical, layout2=horizontal
  API_ENPOINT: "http://localhost:8083/da", //local
  //API_ENPOINT: "http://globits.net:8081/core",
  LOGIN_PAGE: APPLICATION_PATH + "session/signin", //Nếu là Spring
  HOME_PAGE: APPLICATION_PATH + "dashboard/analytics", //Nếu là Spring
  //HOME_PAGE:APPLICATION_PATH+"dashboard/learning-management"//Nếu là Keycloak
  //HOME_PAGE:APPLICATION_PATH+"landing3",//Link trang landing khi bắt đầu
  THUOCTINHSANPHAM_TYPE: THUOCTINHSANPHAM_TYPE,
  LIST_HUOCTINHSANPHAM_TYPE: LIST_HUOCTINHSANPHAM_TYPE,
  MATERIAL_DEPARTMENT_CODE: "VPB4",
});
