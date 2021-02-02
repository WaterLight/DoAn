import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible: true,
  },
  {
    name: "Danh mục",
    icon: "assignment",
    path: "",
    isVisible: true,
    children: [
      {
        name: "Danh Sách Sản Phẩm",
        path: ConstantList.ROOT_PATH + "directory/sanpham",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Đơn Vị Tính",
        path: ConstantList.ROOT_PATH + "directory/donvitinh",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Thuộc Tính Sản Phẩm",
        path: ConstantList.ROOT_PATH + "directory/thuocTinhSanPham",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Kho",
        path: ConstantList.ROOT_PATH + "directory/kho",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Nhân Viên",
        path: ConstantList.ROOT_PATH + "directory/nhanvien",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Phiếu Nhập Kho",
        path: ConstantList.ROOT_PATH + "directory/phieunhapkho",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Phiếu Xuất Kho",
        path: ConstantList.ROOT_PATH + "directory/phieuxuatkho",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Đơn Hàng",
        path: ConstantList.ROOT_PATH + "directory/donHang",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Danh Mục Sản Phẩm",
        path: ConstantList.ROOT_PATH + "directory/DanhMucSanPham",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Sự kiện",
        path: ConstantList.ROOT_PATH + "directory/sukien",
        icon: "keyboard_arrow_right",
        isVisible: true,
      }
    ],
  },
  {
    name: "Báo cáo",
    icon: "insert_chart_outlined",
    path: "",
    isVisible: true,
    children: [
      {
        name: "Báo Cáo Nhập",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoNhap",
        icon: "assessment",
        isVisible: true,
      },
      {
        name: "Báo Cáo Xuất",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoXuat",
        icon: "assessment",
        isVisible: true,
      },
      {
        name: "Báo Cáo Tồn",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoTon",
        icon: "assessment",
        isVisible: true,
      },
      {
        name: "Báo Cáo Đơn Hàng",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoDonHang",
        icon: "assessment",
        isVisible: true,
      },
    ],
  },
  ,
  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "engineering",
    children: [
      {
        name: "manage.user",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "user_manager/user",
        icon: "keyboard_arrow_right",
      },
      {
        name: "manage.menu",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "list/menu",
        icon: "keyboard_arrow_right",
      },
    ],
  },
];
