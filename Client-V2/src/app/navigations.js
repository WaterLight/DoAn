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
    icon: "dashboard",
    path: "",
    isVisible: true,
    children: [
      {
        name: "Danh Sách Sản Phẩm",
        path: ConstantList.ROOT_PATH + "directory/sanpham",
        iconText: "DSSP",
        isVisible: true,
      },
      {
        name: "Đơn Vị Tính",
        path: ConstantList.ROOT_PATH + "directory/donvitinh",
        iconText: "ĐVT",
        isVisible: true,
      },
      {
        name: "Thuộc Tính Sản Phẩm",
        path: ConstantList.ROOT_PATH + "directory/thuocTinhSanPham",
        iconText: "TTSP",
        isVisible: true,
      },
      {
        name: "Kho",
        path: ConstantList.ROOT_PATH + "directory/kho",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Nhân Viên",
        path: ConstantList.ROOT_PATH + "directory/nhanvien",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Phiếu Nhập Kho",
        path: ConstantList.ROOT_PATH + "directory/phieunhapkho",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Phiếu Xuất Kho",
        path: ConstantList.ROOT_PATH + "directory/phieuxuatkho",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Đơn Hàng",
        path: ConstantList.ROOT_PATH + "directory/donHang",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Danh Mục Sản Phẩm",
        path: ConstantList.ROOT_PATH + "directory/DanhMucSanPham",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Sự kiện",
        path: ConstantList.ROOT_PATH + "directory/sukien",
        iconText: "E",
        isVisible: true,
      }
    ],
  },
  {
    name: "Báo cáo",
    icon: "dashboard",
    path: "",
    isVisible: true,
    children: [
      {
        name: "Báo Cáo Nhập",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoNhap",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Báo Cáo Xuất",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoXuat",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Báo Cáo Tồn",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoTon",
        iconText: "S",
        isVisible: true,
      },
      {
        name: "Báo Cáo Đơn Hàng",
        path: ConstantList.ROOT_PATH + "directory/BaoCaoDonHang",
        iconText: "S",
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
