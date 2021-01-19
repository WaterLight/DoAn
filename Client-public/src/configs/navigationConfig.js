import React from "react"
import * as Icon from "react-feather"
import ConstantsList from './appConfig';
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH+"/home"
  },
  {
    id: "page2",
    title: "Page 2",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: ConstantsList.ROOT_PATH+"/page2"
  },
  {
    id: "eCommerce",
    title: "Ecommerce",
    type: "collapse",
    icon: <Icon.ShoppingCart size={20} />,
    children: [
      {
        id: "shop",
        title: "Shop",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: ConstantsList.ROOT_PATH+"/ecommerce/shop"
      },
      {
        id: "detail",
        title: "Product Detail",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: ConstantsList.ROOT_PATH+"/ecommerce/product-detail"
      },
      {
        id: "wishList",
        title: "Wish List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: ConstantsList.ROOT_PATH+"/ecommerce/wishlist"
      },
      {
        id: "checkout",
        title: "Checkout",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: ConstantsList.ROOT_PATH+"/ecommerce/checkout"
      }
    ]
  },  
]

export default navigationConfig
