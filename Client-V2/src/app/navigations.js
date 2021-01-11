import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible:true,
  },
  {
    name: "Danh mục",
    icon: "dashboard",
    path: "",
    isVisible:true,
    children: [
      {
        name: "Đơn vị tính",
        path: ConstantList.ROOT_PATH+ "directory/donvitinh",
        iconText: "S",
        isVisible:true,
      },
      {
        name: "Kho",
        path: ConstantList.ROOT_PATH+ "directory/kho",
        iconText: "S",
        isVisible:true,
      }
    ]
  }  
  ,{
    name: "Dashboard.manage",
    isVisible:true,
    icon: "engineering",
    children: [
      {
        name: "manage.user",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "user_manager/user",
        icon: "keyboard_arrow_right"
      },
      {
        name: "manage.menu",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "list/menu",
        icon: "keyboard_arrow_right"
      }
    ]
  }
];
