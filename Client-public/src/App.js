import React from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import Auth from "./views/pages/authentication/login/Auth";
import {history} from "./history";

const App = () => {
  return (
    <Auth>
      <Router history={history}>
      </Router>
    </Auth>
  )
}

export default App
