import jwtAuthService from "./jwtAuthService";
import { setUserData } from "./UserActions";
import { history } from "../../../../history";
import ConstantList from "../../../../configs/appConfig";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword({ username, password }) {
  jwtAuthService.loginWithUserNameAndPassword(username, password).then(user => {
    setUserData(user);
    history.push({
      pathname: ConstantList.ROOT_PATH + "/home"
    });
  })
    .catch(error => {
      alert('Tài khoản hoặc mật khẩu không đúng. Mời bạn đăng nhập lại');
    });
}

export function registerMember({ displayName, userName, password,phoneNumber,email,address }) {
  jwtAuthService.registerMember(displayName, userName, password,phoneNumber,email,address ).then(user => {
    setUserData(user);
    history.push({
      pathname: ConstantList.ROOT_PATH + "/home"
    });
  })
    .catch(error => {
      alert('Có lỗi xảy ra khi đăng ký tài khoản');
    });
}
export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}
