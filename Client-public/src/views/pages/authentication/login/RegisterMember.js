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
} from "reactstrap";
import { Phone, Lock, Info, Key, Mail, Home } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import ConstantsList from '../../../../configs/appConfig';
import axios from "axios";
import { registerMember } from "./LoginActions";
import ConstantList from "../../../../configs/appConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
class RegisterMember extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
    passwordIsMasked: true
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };
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
  async login() {
    history.push({
      pathname: ConstantList.ROOT_PATH + "/authentication/login"
    });
  }
  async registerMember() {
    if (!this.state.displayName || this.state.displayName == "") {
      toast.warning("Vui lòng nhập họ và tên!");
      return;
    }
    else if (!this.state.phoneNumber || this.state.phoneNumber == "") {
      toast.warning("Vui lòng nhập số điện thoại liên hệ!");
      return;
    }
    else if (!this.state.userName || this.state.userName == "") {
      toast.warning("Vui lòng nhập tên đăng nhập!");
      return;
    }
    else if (!this.state.password || this.state.password == "") {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    else if (!this.state.confirmPassword || this.state.confirmPassword == "") {
      toast.warning("Vui lòng nhập mật khẩu xác nhận!");
      return;
    }
    else if (!this.state.address || this.state.address == "") {
      toast.warning("Vui lòng nhập điạ chỉ!");
      return;
    }
    if(this.state.password !== this.state.confirmPassword){
      toast.warning("Mật khẩu xác nhận và mật khẩu không trùng khớp");
      return;
    }
    if(this.state.phoneNumber != null){
      if(!this.isVietnamesePhoneNumber(this.state.phoneNumber)){
        toast.warning("Số điện thoại không đúng, vui lòng kiểm tra lại.");
        return;
      }else {
        registerMember({ ...this.state });
      }
    }
    
  };
  isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  }

  handleEnterKey = e => {
    if (e.key === 'Enter') {
      this.registerMember();
    }
  };

  render() {
    let {
      passwordIsMasked,
    } = this.state;
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="login-card rounded-0 mb-0 w-100" onKeyDown={this.handleEnterKey}>
            <h4 className="text-center">Đăng ký tài khoản</h4>
            <Row className="m-0">
              <Col lg="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <Form onSubmit={e => e.preventDefault()}>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Họ và tên"
                          value={this.state.displayName}
                          onChange={e => this.setState({ displayName: e.target.value })}
                          validators={["required"]}
                          errorMessages={[
                            "Bạn chưa nhập họ và tên"
                          ]}
                        />
                        <div className="form-control-position">
                          <Info size={15} />
                        </div>
                        <Label>Họ tên</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="number"
                          placeholder="Số điện thoại"
                          value={this.state.phoneNumber}
                          onChange={e => this.setState({ phoneNumber: e.target.value })}
                          validators={["required"]}
                          errorMessages={[
                            "Bạn chưa nhập số điện thoại"
                          ]}
                        />
                        <div className="form-control-position">
                          <Phone size={15} />
                        </div>
                        <Label>Số điện thoại</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Tên đăng nhập"
                          value={this.state.userName}
                          onChange={e => this.setState({ userName: e.target.value })}
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
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type={passwordIsMasked ? "password" : "text"}
                          placeholder="Xác nhận mật khẩu"
                          value={this.state.confirmPassword}
                          onChange={e => this.setState({ confirmPassword: e.target.value })}
                          validators={['required', 'isPasswordMatch']}
                          errorMessages={["Bạn chưa nhập mật khẩu xác nhận", "Mật khẩu xác nhận không khớp với mật khẩu"]}
                        />
                        <div className="form-control-position">
                          <Lock size={15} />
                        </div>
                        <Label>Xác nhận mật khẩu</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="text"
                          placeholder="Địa chỉ"
                          value={this.state.address}
                          onChange={e => this.setState({ address: e.target.value })}
                          validators={["required"]}
                          errorMessages={[
                            "Bạn chưa nhập địa chỉ"
                          ]}
                        />
                        <div className="form-control-position">
                          <Home size={15} />
                        </div>
                        <Label>Địa chỉ</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between">
                        <Button.Ripple outline className="btn-register" color="primary" onClick={() => this.login()}>
                          Đăng nhập
                        </Button.Ripple>
                        <Button.Ripple className="btn-register" color="primary" onClick={() => this.registerMember()}>
                          Đăng ký
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default RegisterMember

