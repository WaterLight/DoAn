import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"
import ConstantsList from './configs/appConfig';
// Route-based code splitting
const shop = lazy(() => import("./views/apps/ecommerce/shop/Shop"))
const home = lazy(() => import("./views/pages/Home"))
const event = lazy(() => import("./views/pages/Event"))
const about = lazy(() => import("./views/pages/About"))
const myorder = lazy(() => import("./views/pages/MyOrder"))
const login = lazy(() => import("./views/pages/authentication/login/Login"))
const registerMember = lazy(() => import("./views/pages/authentication/login/RegisterMember"))
const productDetail = lazy(() => import("./views/apps/ecommerce/detail/Detail"))
const wishlist = lazy(() => import("./views/apps/ecommerce/wishlist/Wishlist"))
const checkout = lazy(() => import("./views/apps/ecommerce/cart/Cart"))
// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}
const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute 
            path={ConstantsList.ROOT_PATH + "/ecommerce/shop"} 
            component={shop} 
          />
          <AppRoute
            path={ConstantsList.ROOT_PATH +"/event"}
            component={event}
          />
           <AppRoute
            path={ConstantsList.ROOT_PATH +"/about"}
            component={about}
          />
          <AppRoute
            path={ConstantsList.ROOT_PATH +"/myorder"}
            component={myorder}
          />
          <AppRoute
            path={ConstantsList.ROOT_PATH +"/home"}
            component={home}
          />
          <AppRoute 
            path={ConstantsList.ROOT_PATH +"/ecommerce/product-detail"} 
            component={productDetail}
          /> 
          <AppRoute 
            path={ConstantsList.ROOT_PATH +"/ecommerce/wishlist"} 
            component={wishlist} 
          />
          <AppRoute
            path={ConstantsList.ROOT_PATH +"/ecommerce/checkout"}
            component={checkout}
            // permission="admin"
          />                   
          <AppRoute
            path= {ConstantsList.ROOT_PATH + "/authentication/login"}
            component={login}
            fullLayout
          />
          <AppRoute
            path= {ConstantsList.ROOT_PATH + "/register"}
            component={registerMember}
            fullLayout
          />
          
           {/* <AppRoute
            exact
            path={ConstantsList.ROOT_PATH+"/ecommerce/shop"}
            component={shop}
          /> */}
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
