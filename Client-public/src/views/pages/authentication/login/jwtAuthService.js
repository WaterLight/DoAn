import axios from "axios";
import localStorageService from "./localStorageService";
import ConstantList from "../../../../configs/appConfig";
import UserService from "./UserService";
import { history } from "../../../../history";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
  }
}
class JwtAuthService {

  user = {
    userId: "1",
    role: 'ADMIN',
    displayName: "Watson Joyce",
    email: "watsonjoyce@gmail.com",
    photoURL: ConstantList.ROOT_PATH + "assets/images/avatar.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }
  async getCurrentUser() {
    let url = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";
    return await axios.get(url);
  };
  async loginWithUserNameAndPassword(username, password) {
    let requestBody = 'client_id=core_client&grant_type=password&client_secret=secret';
    requestBody = requestBody + '&username=' + username + '&password=' + password;
    const res = await axios.post(ConstantList.API_ENPOINT + '/oauth/token', requestBody, config).then(response => {
      var dateObj = new Date(Date.now() + response.data.expires_in * 1000);
      localStorageService.setItem("token_expire_time", dateObj);
      this.setSession(response.data.access_token);
    });
    await this.getCurrentUser().then(res => {
      this.setLoginUser(res.data);
    });
  };
  async registerMember(displayName, userName, password, confirmPassword, phoneNumber, address) {
    let requestBody = {};
    requestBody.displayName = displayName;
    requestBody.userName = userName;
    requestBody.password = password;
    requestBody.confirmPassword = confirmPassword;
    requestBody.phoneNumber = phoneNumber;
    // requestBody.email = email;
    requestBody.address = address;
    const res = await axios.post(ConstantList.API_ENPOINT + '/public/user/register', requestBody).then(response => {
      if (response.data != null) {
        if (response.data.isConfirmPassword == true) {
          toast.warning("Mật khẩu xác nhận và mật khẩu không trùng khớp");
          return;
        }
        else if (response.data.hasEmail == true) {
          toast.warning("Địa chỉ email đã được đăng ký");
          return;
        }
        else if (response.data.hasPhoneNumber == true) {
          toast.warning("Số điện thoại đã được đăng ký");
          return;
        }
        else if (response.data.hasUserName == true) {
          toast.warning("Tên đăng nhập đã tồn tại");
          return;
        }
        else{
          this.loginWithUserNameAndPassword(response.data.userName, response.data.password);
          window.location.reload(true);
        }
      }
    });
    history.push(ConstantList.LOGIN_PAGE);
  };

  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 1000);
    }).then(data => {
      this.setUser(data);
      this.setSession(data.token);
      return data;
    });
  };

  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then(data => {
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };
  async logout() {
    if (ConstantList.AUTH_MODE == "Keycloak") {
      UserService.doLogout();
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.HOME_PAGE)
    } else {
      let url = ConstantList.API_ENPOINT + "/oauth/logout";
      let res = axios.delete(url);
      this.setSession(null);
      this.removeUser();
      history.push(ConstantList.LOGIN_PAGE)
    }
  }
  setSession(token) {
    if (token) {
      localStorageService.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorageService.removeItem('jwt_token');
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  async setLoginUser(user) {
    localStorageService.setItem("auth_user", user);
    window.localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }
  getLoginUser = () => {
    return localStorageService.getItem("auth_user");
  }
  setUser = (user) => {
    localStorageService.setItem('auth_user', user);
  }
  removeUser = () => {
    localStorageService.removeItem('auth_user');
  }
}

export default new JwtAuthService();
