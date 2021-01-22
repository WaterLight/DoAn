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
import { Phone, Lock, Info, Key, Mail, Home } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import ConstantsList from '../../../../configs/appConfig';
import axios from "axios";
import { registerMember } from "./LoginActions";
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
  async registerMember() {
    if (!this.state.userName || this.state.userName == "") {
      toast.warning("Vui lòng nhập tên đăng nhập!");
      return;
    }
    else if (!this.state.password || this.state.password == "") {
      toast.warning("Vui lòng nhập mật khẩu!");
      return;
    }
    else if (!this.state.displayName || this.state.displayName == "") {
      toast.warning("Vui lòng nhập họ và tên!");
      return;
    }
    else if (!this.state.phoneNumber || this.state.phoneNumber == "") {
      toast.warning("Vui lòng nhập số điện thoại liên hệ!");
      return;
    }
    else if (!this.state.address || this.state.address == "") {
      toast.warning("Vui lòng nhập điện chỉ!");
      return;
    }
    else {
      registerMember({ ...this.state });
    }
  };

  handleEnterKey = e => {
    if (e.key === 'Enter') {
      this.registerMember();
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
          <Card className="login-card rounded-0 mb-0 w-100" onKeyDown={this.handleEnterKey}>
            <h4 className="text-center">Đăng ký tài khoản</h4>
            <Row className="m-0">
              <Col lg="6" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
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
                        placeholder="Phone number"
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
                      <Label>Phone number</Label>
                    </FormGroup>

                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <Form onSubmit={e => e.preventDefault()}>
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
                          placeholder="Password"
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
                    </Form>

                    <div className="d-flex justify-content-between">
                      <Button.Ripple color="primary" outline onClick={() => this.registerMember()}>
                        Đăng ký
                        </Button.Ripple>
                    </div>
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

