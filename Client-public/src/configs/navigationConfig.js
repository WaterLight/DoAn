import React from "react"
import * as Icon from "react-feather"
import ConstantsList from './appConfig';
const navigationConfig = [
  {
    id: "home",
    title: "Trang chủ",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH+"/home"
  },
  // {
  //   id: "page2",
  //   title: "Page 2",
  //   type: "item",
  //   icon: <Icon.File size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: ConstantsList.ROOT_PATH+"/page2"
  // },
  {
    id: "shop",
    title: "Sản phẩm",
    type: "item",
    icon: <Icon.ShoppingBag size={12} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH+"/ecommerce/shop"
  },
  {
    id: "checkout",
    title: "Giỏ hàng",
    type: "item",
    icon: <Icon.ShoppingCart size={12} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH+"/ecommerce/checkout"
  },
  // {
  //   id: "detail",
  //   title: "Thông tin chi tiết",
  //   type: "item",
  //   icon: <Icon.Archive size={12} />,
  //   permissions: ["admin", "editor"],
  //   navLink: ConstantsList.ROOT_PATH+"/ecommerce/product-detail"
  // },
  {
    id: "event",
    title: "Sự kiện",
    type: "item",
    icon: <Icon.Award size={12} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH + "/event"
  },
  {
    id: "about",
    title: "Giới thiệu",
    type: "item",
    icon: <Icon.Info size={12} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH + "/about"
  },
  {
    id: "myorder",
    title: "Đơn hàng của tôi",
    type: "item",
    icon: <Icon.Info size={12} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH + "/myorder"
  },
  //   {
  //   id: "eCommerce",
  //   title: "Ecommerce",
  //   type: "collapse",
  //   icon: <Icon.ShoppingCart size={20} />,
  //   children: [
      
  //     {
  //       id: "wishList",
  //       title: "Wish List",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: ConstantsList.ROOT_PATH+"/ecommerce/wishlist"
  //     },
      
  //   ]
  // },  
]

export default navigationConfig
