import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { Phone,Key, Lock, Check, Facebook, Twitter, GitHub } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import ConstantsList from '../../../../configs/appConfig';
import axios from "axios";
import { loginWithEmailAndPassword } from "./LoginActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConstantList from "../../../../configs/appConfig";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
class Login extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: ""
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  async getCurrentUser() {
    let url = ConstantsList.API_ENPOINT + "/api/users/getCurrentUser";
    return await axios.get(url);
  };
  setSession(token) {
    if (token) {
      window.sessionStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      window.sessionStorage.removeItem('jwt_token');
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  async setLoginUser(user) {
    window.sessionStorage.setItem("auth_user", user);
    return user;
  }
  getLoginUser = () => {
    return window.sessionStorage.getItem("auth_user");
  }
  async loginWithUserNameAndPassword() {
    if (!this.state.username || this.state.username == "") {
      alert("Vui lòng nhập tên đăng nhập!");
      return;
    }
    else if (!this.state.password || this.state.password == "") {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }
    else {
      loginWithEmailAndPassword({ ...this.state });
    }
  };
  registerMember = ()=>{
    history.push({
      pathname: ConstantList.ROOT_PATH + "/register"
    });
  }
  handleEnterKey = e => {
    if (e.key === 'Enter') {
      this.loginWithUserNameAndPassword();
    }
  };

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2" onKeyDown={this.handleEnterKey}>
                  <CardBody>
                    <h4>Đăng nhập hệ thống</h4>
                    <p>Chào mừng bạn, mời bạn đăng nhập để tạo đơn hàng</p>
                    <Form onSubmit={e => e.preventDefault()}>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Tên đăng nhập"
                          value={this.state.username}
                          onChange={e => this.setState({ username: e.target.value })}
                          validators={["required"]}
                          errorMessages={[
                            "Bạn chưa nhập tên đăng nhập"
                          ]}
                        />
                        <div className="form-control-position">
                          <Key size={15} />
                        </div>
                        <Label>Tên đăng nhập</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="password"
                          placeholder="Mật khẩu"
                          value={this.state.password}
                          onChange={e => this.setState({ password: e.target.value })}
                          validators={["required"]}
                          errorMessages={[
                            "Bạn chưa nhập mật khẩu"
                          ]}
                        />
                        <div className="form-control-position">
                          <Lock size={15} />
                        </div>
                        <Label>Mật khẩu</Label>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-between align-items-center">
                        <Checkbox
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label="Nhớ tôi"
                        />
                        <div className="float-right">
                          Quên mật khẩu?
                            </div>
                      </FormGroup>
                      <div className="d-flex justify-content-between">
                        <Button.Ripple color="primary" outline onClick = {() => this.registerMember()}>
                          Đăng ký
                        </Button.Ripple>
                        <Button.Ripple color="primary" type="submit" onClick={() => this.loginWithUserNameAndPassword()}>
                          Đăng nhập
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                  <div className="auth-footer">
                    <div className="divider">
                      <div className="divider-text">OR</div>
                    </div>
                    <div className="footer-btn">
                      <Button.Ripple className="btn-facebook" color="">
                        <Facebook size={14} />
                      </Button.Ripple>
                      <Button.Ripple className="btn-twitter" color="">
                        <Twitter size={14} stroke="white" />
                      </Button.Ripple>
                      <Button.Ripple className="btn-google" color="">
                        <img src={googleSvg} alt="google" height="15" width="15" />
                      </Button.Ripple>
                      <Button.Ripple className="btn-github" color="">
                        <GitHub size={14} stroke="white" />
                      </Button.Ripple>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login

