import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "./UserActions";
import jwtAuthService from "./jwtAuthService";
import localStorageService from "./localStorageService";
import {history} from "../../../../history";
import ConstantList from "../../../../configs/appConfig";
class Auth extends Component {
  state = {};
  constructor(props) {
    super(props);
    let user = localStorageService.getItem("auth_user");
    let token = localStorageService.getItem("jwt_token");
    //let tokenData = localStorageService.getSessionItem("token_data");
    //console.log(tokenData);
    let expire_time= localStorageService.getItem("token_expire_time");
    let dateObj = new Date(expire_time);
    //alert('Auth:'+expire_time);
    if(token){
      jwtAuthService.setSession(token);
    }
    var isExpired = false;
    if(dateObj!=null){
      if(dateObj<Date.now()){
        isExpired=true;
      }
    }
    if(user!=null && (isExpired==false)){      
      this.props.setUserData(user);
    }else {
      history.push({
        pathname: ConstantList.ROOT_PATH + "/home"
      });
    }
    
    //this.checkJwtAuth();
    // this.checkFirebaseAuth();
  }

  checkJwtAuth = () => {
    jwtAuthService.loginWithToken().then(user => {
      this.props.setUserData(user);
    });
  };
  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(
  mapStateToProps,
  { setUserData }
)(Auth);
