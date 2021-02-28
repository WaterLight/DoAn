import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  CardTitle,
  Row,
  Col,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import NumericInput from "react-numeric-input"
import {
  Star,
  X,
  Heart,
  ShoppingCart,
  Home,
  CreditCard,
  PlusSquare
} from "react-feather"
import { mobileStyle } from "../../../forms/form-elements/number-input/InputStyles"
import Breacrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import bankLogo from "../../../../assets/img/pages/eCommerce/bank.png"
import Wizard from "../../../../components/@vuexy/wizard/WizardComponent"
// import { productsList } from "./cartData"
import { AvInput, AvGroup, AvFeedback } from "availity-reactstrap-validation"
import ConstantList from "../../../../configs/appConfig";
import "../../../../assets/scss/pages/app-ecommerce-shop.scss"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import imageDefault from "../../../../assets/img/pages/eCommerce/nike7.jfif"
import { saveOrder } from "./cartService";
import axios from "axios";
import { getListEvent } from "../../../pages/EventService"
import { getNumberOfProductBySize } from "../shop/ShopService"
import { history } from "../../../../history"
toast.configure();

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    user: null,
    steps: [],
    currentUser: {},
    saleOrder: {},
    soLuong: null,
    paymentType: 1,
    numberOfProduct: 2,
    event: []
  }
  handleDeleteProductInCart = product => {
    if (product && product.sanPham.id) {
      let { saleOrder } = this.state;
      if (saleOrder != null && saleOrder.sanPhamDonHang != null && saleOrder.sanPhamDonHang.length > 0) {
        for (let i = 0; i < saleOrder.sanPhamDonHang.length; i++) {
          if (saleOrder.sanPhamDonHang[i].sanPham.id == product.sanPham.id) {
            var removeIndex = saleOrder.sanPhamDonHang.map(function (item) { return item.id; }).indexOf(product.sanPham.id);
            saleOrder.sanPhamDonHang.splice(removeIndex + 1, 1);
            window.localStorage.setItem("saleOrder", JSON.stringify(saleOrder));
            this.setState({ saleOrder: JSON.parse(window.localStorage.getItem("saleOrder")) });
          }
        }
      }
    }
  }
  componentDidMount() {
    this.getCurrentUser();
    let saleOrder = JSON.parse(window.localStorage.getItem("saleOrder"));
    if (saleOrder != null && saleOrder.sanPhamDonHang != null && saleOrder.sanPhamDonHang.length > 0) {
      this.setState({ saleOrder: saleOrder });
    }
    this.searchEvent();
  }
  getCurrentUser() {
    let url = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";
    return axios.get(url).then(res => {
      if (res && res.data) {
        this.setState({ currentUser: res.data });
      }
    });
  };
  searchEvent() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.pageIndex = 1;
      searchObject.pageSize = 1;
      searchObject.isActive = true;
      getListEvent(searchObject).then(res => {
        this.setState({ event: [...res.data.content], totalElements: res.data.totalElements })
      }).catch(err => { console.log(err) });
    });
  }
  componentWillUnmount() {

  }
  formatPrice = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }

  handleActiveStep = index => {
    let { currentUser, saleOrder } = this.state;
    if (!currentUser || currentUser.id == null) {
      toast.warning("Vui lòng đăng nhập vào hệ thống để tạo đơn hàng.")
      history.push(ConstantList.ROOT_PATH + "/authentication/login")
    }
    if(!saleOrder || !saleOrder.sanPhamDonHang){
      toast.info("Đơn hàng của bạn đang trống, vui lòng lựa chọn sản phẩm trước.");
      history.push(ConstantList.ROOT_PATH + "/ecommerce/shop")
    }
    this.setState({ activeStep: index })
  }
  handleChooseDefaultAddress = step => {
    this.setState({ activeStep: step })
  }
  handleConfirmOrder = () => {
    let dateNow = new Date();
    // kiểm tra có sự kiện giảm giá không, nếu có thì giảm cho đơn hàng
    let { currentUser, saleOrder, event } = this.state;
    if (currentUser != null && currentUser.id != null && saleOrder.sanPhamDonHang != null && saleOrder.sanPhamDonHang.length > 0) {
      if (event[0].ngayBatDau < dateNow.getTime() && dateNow.getTime() < event[0].ngayKetThuc) {
        if (event && event[0].tienGiamGia && event[0].tienGiamGia > 0) {
          if (saleOrder.totalAmount >= 2000000)
            saleOrder.giamGia = event[0].tienGiamGia;
          saleOrder.thanhTien = saleOrder.totalAmount - event[0].tienGiamGia;
        }
      }
      saveOrder(saleOrder).then((res) => {
        if (res.status == 200) {
          toast.info("Chúc mừng bạn đã đặt hàng thành công");
          //clear đơn hàng
          if (JSON.parse(window.localStorage.getItem("saleOrder")) != null) {
            window.localStorage.clear();
          }
          history.push(ConstantList.ROOT_PATH + "/myorder")
        } else {
          toast.error("Có lỗi xảy ra khi đặt hàng, vui lòng đăng nhập để thử lại");
          history.push(ConstantList.ROOT_PATH + "/authentication/login")
        }
      }).catch(err => {
        toast.error("Có lỗi xảy ra khi đặt hàng, vui lòng đăng nhập để thử lại");
        history.push(ConstantList.ROOT_PATH + "/authentication/login")
      })
    }
  }

  onValidationError = errors => {
    toast.error("Please Enter Valid Details", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
  handleChangeNumberOfProduct = (sanPham, soLuong, size) => {
    if (sanPham != null && sanPham.id != null && soLuong > 0 && size != null && size.id != null) {
      //kiểm tra số lượng order có còn đủ trong KHO không?
      getNumberOfProductBySize(sanPham.id, size.id).then(res => {
        if (res && res.data) {
          this.setState({ numberOfProduct: res.data});
        }
      })
      let {numberOfProduct} = this.state;
      
      if (soLuong <= numberOfProduct ) {
        let { saleOrder } = this.state;
        if (saleOrder != null && saleOrder.sanPhamDonHang != null && saleOrder.sanPhamDonHang.length > 0) {
          for (var i = 0; i < saleOrder.sanPhamDonHang.length; i++) {
            let sanPhamDonHang = saleOrder.sanPhamDonHang[i];
            if (sanPhamDonHang.sanPham.id == sanPham.id) {
              sanPhamDonHang.soLuong = soLuong;
              if (sanPhamDonHang.trietKhau != null) {
                sanPhamDonHang.thanhTien = sanPhamDonHang.soLuong * sanPhamDonHang.donGia * (1 - sanPhamDonHang.trietKhau / 100);
              }
              sanPhamDonHang.thanhTien = sanPhamDonHang.soLuong * sanPhamDonHang.donGia;
              // cập nhật vào đơn hàng ở local store
              saleOrder.sanPhamDonHang[i].thanhTien = sanPhamDonHang.thanhTien;
              saleOrder.tongGia = 0;
            }
          }
          // cập nhật tổng tiền đơn hàng
          for (var i = 0; i < saleOrder.sanPhamDonHang.length; i++) {
            if (saleOrder.sanPhamDonHang[i].sanPham.giamGia != 0 && saleOrder.sanPhamDonHang[i].sanPham.giamGia != null) {
              saleOrder.giamGia += saleOrder.sanPhamDonHang[i].sanPham.giamGia;
              saleOrder.tongGia += saleOrder.sanPhamDonHang[i].sanPham.giaBanHienThoi * (100 - saleOrder.sanPhamDonHang[i].sanPham.giamGia) / 100;
              saleOrder.thanhTien = saleOrder.tongGia;
            } else {
              saleOrder.tongGia += saleOrder.sanPhamDonHang[i].thanhTien;
              saleOrder.thanhTien = saleOrder.tongGia;
            }
          }
          saleOrder.totalAmount = saleOrder.tongGia;
        }
        window.localStorage.setItem("saleOrder", JSON.stringify(saleOrder));
        this.setState({ saleOrder: JSON.parse(window.localStorage.getItem("saleOrder")) });
      }else{
        toast.warning("Số lượng sản phẩm bạn đặt đã vượt quá số lượng cửa hàng hiện có!");
        return false; 
      }
    }
  }
  handleChangeTypeOfPayment = (paymentType) => {
    if (paymentType != null) {
      let { saleOrder } = this.state;
      if (paymentType == 2) {//thanh toán khi nhận hàng
        if (saleOrder != null) {
          saleOrder.paymentType = paymentType;
        }
      }
      if (paymentType == 1) {//thanh toán qua tài khoản ngân hàng
        if (saleOrder != null) {
          saleOrder.paymentType = paymentType;
        }
      }
      window.localStorage.setItem("saleOrder", JSON.stringify(saleOrder));
      this.setState({ saleOrder: JSON.parse(window.localStorage.getItem("saleOrder")) });
    }
  }

  render() {
    const { activeStep, currentUser, saleOrder, soLuong, paymentType } = this.state;
    let steps = [
      {
        title: <ShoppingCart size={22} />,
        content: (
          <div className="list-view product-checkout">
            <div className="checkout-items">
              {saleOrder != null && saleOrder.sanPhamDonHang != null && saleOrder.sanPhamDonHang.length > 0 && saleOrder.sanPhamDonHang.map((item, i) => (
                <Card className="ecommerce-card" key={i}>
                  <div className="card-content">
                    <div className="item-img text-center">
                      {item.sanPham.imageUrl ? (
                        <img
                          className="img-fluid"
                          src={ConstantList.API_ENPOINT + "/public/getImage/" + item.sanPham.imageUrl.split(".")[0] + "/" + item.sanPham.imageUrl.split(".")[1]}
                          alt={item.tenSP}
                        />
                      ) : (
                          <img
                            className="img-fluid"
                            src={imageDefault}
                            alt="Empty Image"
                          />
                        )
                      }
                    </div>
                    <CardBody>
                      <div className="item-name">
                        <span>Sản phẩm: {item.sanPham.tenSP} - <span>Giá: {item.sanPham.giaBanHienThoi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span> </span>
                        <div className="item-company">
                          Size: <span className="company-name"> {item.size ? item.size.ma : ""} </span>
                          - Thành tiền:  <span className="company-name">{item.thanhTien ? item.thanhTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : item.donGia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                        </div>
                        <div className="item-quantity mt-60">
                          <p className="quantity-title">Số lượng</p>
                          <NumericInput
                            type="number"
                            value={item.soLuong ? item.soLuong : 1}
                            mobile
                            min={1}
                            max={10000}
                            style={mobileStyle}
                            onChange={(soLuong) => this.handleChangeNumberOfProduct(item.sanPham, soLuong, item.size)}
                          />
                        </div>
                        {/* <p className="delivery-date">{item.deliveryBy}</p>
                        <p className="offers">{item.offers}</p> */}
                      </div>
                    </CardBody>
                    <div className="item-options text-center">
                      <div className="item-wrapper">
                        <div className="item-rating">
                          <Badge color="primary" className="badge-md mr-25">
                            {/* <span className="align-middle">4</span>{" "} */}
                            {/* <Star size={15} /> */}
                          </Badge>
                        </div>
                        <div className="item-cost">
                          <h6 className="item-price">{item.sanPham.price}</h6>
                        </div>
                      </div>
                      <div className="wishlist">
                        {/* <X size={15} /> */}
                        <span className="align-middle ml-25" onClick={() => this.handleDeleteProductInCart(item)}>Xóa</span>
                      </div>
                      {/* <div className="cart"> */}
                      {/* <Heart size={15} /> */}
                      {/* <span className="align-middle ml-25">Wishlist</span> */}
                      {/* </div> */}
                    </div>
                  </div>
                </Card>
              ))
              }
              {saleOrder == null || saleOrder.sanPhamDonHang == null || saleOrder.sanPhamDonHang.length == 0 ? (
                <a className="bold" href={ConstantList.ROOT_PATH + "/ecommerce/shop"}>Giỏ hàng của bạn trống! Xin mời chọn các mẫu giầy của shop.</a>
              ) : ("")}
            </div>
            <div className="checkout-options">
              <Card>
                <CardBody>
                  {/* <p className="options-title">Options</p>
                  <div className="coupons">
                    <div className="coupons-title">
                      <p>Coupons</p>
                    </div>
                    <div className="apply-coupon">
                      <p>Apply</p>
                    </div>
                  </div>
                  <hr /> */}
                  <div className="price-details">
                    <p>Khuyến Mãi - Thanh Toán</p>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Tổng tiền sản phẩm</div>
                    <div className="detail-amt">
                      {saleOrder != null && saleOrder.totalAmount != null ? (
                        <span>{saleOrder.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                      ) : ("0đ")}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Khuyến mãi</div>
                    {saleOrder != null && saleOrder.giamGia != null ? (
                      <div className="detail-amt discount-amt">{saleOrder.giamGia} %</div>
                    ) : ("0%")}
                  </div>
                  {/* <div className="detail">
                    <div className="detail-title">Estimated Tax</div>
                    <div className="detail-amt">$1.3</div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">EMI Eligibility</div>
                    <div className="detail-amt emi-details">Details</div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Delivery Charges</div>
                    <div className="detail-amt discount-amt">Free</div>
                  </div>
                  <hr /> */}
                  <div className="detail">
                    <div className="detail-title detail-total">Tổng tiền thanh toán</div>
                    {saleOrder != null && saleOrder.tongGia != null ? (
                      <span>{saleOrder.tongGia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    ) : ("0đ")}
                  </div>
                  <Button.Ripple
                    type="submit"
                    block
                    color="primary"
                    className="btn-block"
                    onClick={() => this.handleActiveStep(1)}>
                    Đặt hàng
                  </Button.Ripple>
                </CardBody>
              </Card>
            </div>
          </div>
        )
      },
      {
        title: <Home size={22} />,
        content: (
          <div className="list-view product-checkout">
            {/* <Card>
              <CardHeader className="flex-column align-items-start">
                <CardTitle>Thêm địa chỉ nhận hàng khác</CardTitle>
                <p className="text-muted mt-25">
                  Hãy chắc chắn bạn sẽ nhận đơn hàng tại địa chỉ dưới đây.
                </p>
              </CardHeader>
              <CardBody>
                <Row> */}
            {/* <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="name"> Tên người nhận </Label>
                      <AvInput id="name" name="name" type="text" required />
                      <AvFeedback>Bạn chưa điền tên người nhậng </AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="contact-number"> Số điện thoại </Label>
                      <AvInput
                        id="contact-number"
                        name="contact-number"
                        type="text"
                        required
                      />
                      <AvFeedback>Bạn chưa nhập số điện thoại</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="apt-no">Số nhà </Label>
                      <AvInput id="apt-no" name="apt-no" type="text" required />
                      <AvFeedback>
                        Bạn chưa nhập số nhà
                      </AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="landmark">
                        Phường/Xã
                      </Label>
                      <AvInput id="landmark" name="landmark" type="text" />
                      <AvFeedback>
                        Bạn chưa chọn phường xã
                      </AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="town-city">Quận/Huyện</Label>
                      <AvInput
                        id="town-city"
                        name="town-city"
                        type="text"
                        required
                      />
                      <AvFeedback>Bạn chưa chọn quận huyện</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="pincode">Tỉnh/Thành phố</Label>
                      <AvInput
                        id="pincode"
                        name="pincode"
                        type="text"
                        required
                      />
                      <AvFeedback>Bạn chưa chọn tỉnh thành phố</AvFeedback>
                    </AvGroup>
                  </Col> */}



            {/* <Col md="6" sm="12">
                    <AvGroup>
                      <Label for="state"> State</Label>
                      <AvInput id="state" name="state" type="text" required />
                      <AvFeedback>Please enter valid State</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="address-type">Address Type</Label>
                      <Input type="select" name="select" id="address-type">
                        <option>Home</option>
                        <option>Work</option>
                      </Input>
                    </FormGroup>
                  </Col>*/}
            {/* <Col sm="6" md={{ offset: 6, size: 6 }}>
                    <Button.Ripple
                      type="submit"
                      color="primary"
                      onClick={() => this.handleActiveStep(2)}>
                      Giao đến địa chỉ này
                    </Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Card> */}
            <div className="customer-card">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Người nhận hàng: {currentUser != null && currentUser.displayName != null ? (
                      <span>{currentUser.displayName}</span>
                    ) : ("")
                    }
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">{currentUser != null && currentUser.person != null && currentUser.person.phoneNumber != null ? (
                    <span>Số điện thoại: {currentUser.person.phoneNumber}</span>
                  ) : ("")
                  }</p>
                  <p className="mb-0">{currentUser != null && currentUser.person != null && currentUser.person.address[0] != null ? (
                    <span>Địa chỉ nhận hàng: {currentUser.person.address[0].address}</span>
                  ) : ("")
                  }</p>
                  <hr />
                  <Button.Ripple
                    type="submit"
                    block
                    color="primary"
                    className="btn-block"
                    onClick={() => this.handleChooseDefaultAddress(2)}>
                    Giao đến địa chỉ này
                  </Button.Ripple>
                </CardBody>
              </Card>
            </div>
          </div>
        )
      },
      {
        title: <CreditCard size={22} />,
        content: (
          <div className="list-view product-checkout">
            <div className="payment-type">
              <Card>
                <CardHeader className="flex-column align-items-start">
                  <CardTitle>Hình thức thanh toán</CardTitle>
                  <p className="text-muted mt-25">
                    Hãy chắc chắn khi lựa chọn hình thức thanh toán
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="vx-radio-con vx-radio-primary">
                      {/* <input type="radio" name="bank" />
                      <span className="vx-radio">
                        <span className="vx-radio--border"></span>
                        <span className="vx-radio--circle"></span>
                      </span> */}
                      {/* <img src={bankLogo} alt="img-placeholder" height="40" /> */}
                    </div>
                    {/* <div className="card-holder-name mt-75">John Doe</div>
                    <div className="card-expiration-date mt-75">11/2020</div> */}
                  </div>
                  {/* <div className="customer-cvv mt-1">
                    <div className="form-inline">
                      <Label for="cvv">Enter CVV:</Label>
                      <AvInput
                        type="number"
                        className="input-cvv ml-75 mb-50"
                        id="cvv"
                        name="cvv"
                        required
                      />
                      <Button color="primary" className="ml-50 mb-50">
                        {" "}
                        Continue{" "}
                      </Button>
                    </div>
                  </div> */}
                  <hr className="my-2" />
                  <ul className="other-payment-options list-unstyled">
                    <li className="py-25">
                      <Radio
                        label="Thanh toán khi nhận hàng"
                        color="primary"
                        defaultChecked={true}
                        value={2}
                        name="paymentType"
                        onClick={() => this.handleChangeTypeOfPayment(2)}
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="Thanh toán qua ngân hàng"
                        color="primary"
                        value={1}
                        defaultChecked={false}
                        name="paymentType"
                        onClick={() => this.handleChangeTypeOfPayment(1)}
                      />
                      <img src={bankLogo} alt="img-placeholder" height="40" />
                      <span>Thanh toán qua tài khoản ngân hàng: <span className="bold">069100386735</span> - ngân hàng VietCombank - Chủ tài khoản: <span className="bold">Dương Thị Huyền Trang</span> chi nhánh Tây Hà Nội hoặc số tài khoản <span className="bold">100002003535535</span> Ngân hàng Công Thương Việt Nam VietTinBank - chủ tài khoản: <span className="bold">Nguyễn Thanh Lâm</span> - chi nhánh Hà Nội</span>
                    </li>
                  </ul>
                  <hr />
                </CardBody>
              </Card>
            </div>
            <div className="amount-payable checkout-options">
              <Card>
                <CardHeader>
                  <CardTitle>Thanh toán</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="detail">
                    <div className="detail-title">Tổng tiền sản phẩm</div>
                    <div className="detail-amt">
                      {saleOrder != null && saleOrder.totalAmount != null ? (
                        <span>{saleOrder.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                      ) : ("0đ")}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Khuyến mãi</div>
                    {saleOrder != null && saleOrder.giamGia != null ? (
                      <div className="detail-amt discount-amt">{saleOrder.giamGia} %</div>
                    ) : ("0%")}
                  </div>
                  <div className="detail">
                    <div className="detail-title detail-total">Tổng tiền thanh toán</div>
                    {saleOrder != null && saleOrder.tongGia != null ? (
                      <span>{saleOrder.tongGia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                    ) : ("0đ")}
                  </div>
                  <Button.Ripple
                    color="primary"
                    className="btn-block"
                    onClick={() => this.handleConfirmOrder()}>
                    Xác nhận đặt hàng
                  </Button.Ripple>
                </CardBody>
              </Card>
            </div>
          </div>
        )
      }
    ]
    return (
      <React.Fragment>
        <Breacrumbs
          breadCrumbTitle="Đơn hàng"
          breadCrumbParent="Xác nhận"
          breadCrumbActive="Đặt hàng"
        />
        <div className="ecommerce-application">
          <Wizard
            steps={steps}
            activeStep={activeStep}
            pagination={false}
            enableAllSteps
            validate
            tabPaneClass="mt-5"
            onValidationError={this.onValidationError}
          />
          <ToastContainer />
        </div>
      </React.Fragment>
    )
  }
}

export default Checkout
