import React from "react"
import { toast, ToastContainer } from "react-toastify"
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
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import imageDefault from "../../../../assets/img/pages/eCommerce/nike7.jfif"
import { saveOrder } from "./cartService";

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    user: null,
    steps: [
      {
        title: <ShoppingCart size={22} />,
        content: (
          <div className="list-view product-checkout">
            <div className="checkout-items">
              {JSON.parse(window.localStorage.getItem("saleOrder")) != null && JSON.parse(window.localStorage.getItem("saleOrder")).sanPhamDonHang != null && JSON.parse(window.localStorage.getItem("saleOrder")).sanPhamDonHang.length >= 0 && JSON.parse(window.localStorage.getItem("saleOrder")).sanPhamDonHang.map((item, i) => (
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
                        <span>{item.sanPham.tenSP} - <span>Giá: {item.sanPham.giaBanHienThoi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span> </span>
                        <p className="item-company">
                          {/* By <span className="company-name">{item.by}</span> */}
                        </p>
                        <div className="item-quantity mt-60">
                          <p className="quantity-title">Số lượng</p>
                          <NumericInput
                            min={0}
                            max={10}
                            value={1}
                            mobile
                            style={mobileStyle}
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
              ))}
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
                      {JSON.parse(window.localStorage.getItem("saleOrder")) != null && JSON.parse(window.localStorage.getItem("saleOrder")).totalAmount != null ? (
                        <span>{JSON.parse(window.localStorage.getItem("saleOrder")).totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                      ) : ("0đ")}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="detail-title">Khuyến mãi</div>
                    {JSON.parse(window.localStorage.getItem("saleOrder")) != null && JSON.parse(window.localStorage.getItem("saleOrder")).giamGia != null ? (
                      <div className="detail-amt discount-amt">{JSON.parse(window.localStorage.getItem("saleOrder")).giamGia} %</div>
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
                    {JSON.parse(window.localStorage.getItem("saleOrder")) != null && JSON.parse(window.localStorage.getItem("saleOrder")).tongGia != null ? (
                      <span>{JSON.parse(window.localStorage.getItem("saleOrder")).tongGia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
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
            <Card>
              <CardHeader className="flex-column align-items-start">
                <CardTitle>Thêm địa chỉ nhận hàng khác</CardTitle>
                <p className="text-muted mt-25">
                  Hãy chắc chắn bạn sẽ nhận đơn hàng tại địa chỉ dưới đây.
                </p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6" sm="12">
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
                  </Col>
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
                  <Col sm="6" md={{ offset: 6, size: 6 }}>
                    <Button.Ripple
                      type="submit"
                      color="primary"
                      onClick={() => this.handleActiveStep(2)}>
                      Giao đến địa chỉ này
                    </Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="customer-card">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Người nhận hàng: {JSON.parse(window.localStorage.getItem("currentUser")) != null ? (
                      <span>{JSON.parse(window.localStorage.getItem("currentUser")).displayName}</span>
                    ) : ("")
                    }
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">{JSON.parse(window.localStorage.getItem("currentUser")) != null && JSON.parse(window.localStorage.getItem("currentUser")).person != null && JSON.parse(window.localStorage.getItem("currentUser")).person.phoneNumber != null ? (
                    <span>Số điện thoại: {JSON.parse(window.localStorage.getItem("currentUser")).person.phoneNumber}</span>
                  ) : ("")
                  }</p>
                  <p className="mb-0">{JSON.parse(window.localStorage.getItem("currentUser")) != null && JSON.parse(window.localStorage.getItem("currentUser")).person != null && JSON.parse(window.localStorage.getItem("currentUser")).person.address != null ? (
                    <span>Địa chỉ nhận hàng: {JSON.parse(window.localStorage.getItem("currentUser")).person.address}</span>
                  ) : ("")
                  }</p>
                  {/* <p>UTC-5: Eastern Standard Time (EST) </p>
                  <p>202-555-0140</p> */}
                  <hr />
                  <Button.Ripple
                    // type="submit"
                    color="primary"
                    className="btn-block"
                    onClick={() => this.handleChooseDefaultAddress()}>
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
                  <CardTitle>Payment options</CardTitle>
                  <p className="text-muted mt-25">
                    Be sure to click on correct payment option
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="vx-radio-con vx-radio-primary">
                      <input type="radio" name="bank" />
                      <span className="vx-radio">
                        <span className="vx-radio--border"></span>
                        <span className="vx-radio--circle"></span>
                      </span>
                      <img src={bankLogo} alt="img-placeholder" height="40" />
                      <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                    </div>
                    <div className="card-holder-name mt-75">John Doe</div>
                    <div className="card-expiration-date mt-75">11/2020</div>
                  </div>
                  <div className="customer-cvv mt-1">
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
                  </div>
                  <hr className="my-2" />
                  <ul className="other-payment-options list-unstyled">
                    <li className="py-25">
                      <Radio
                        label="Credit / Debit / ATM Card"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="Net Banking"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="EMI (Easy Installment)"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                    <li className="py-25">
                      <Radio
                        label="Cash On Delivery"
                        color="primary"
                        defaultChecked={false}
                        name="paymentType"
                      />
                    </li>
                  </ul>
                  <hr />
                  <div className="gift-card">
                    <p>
                      <PlusSquare size={22} />
                      <span className="align-middle ml-25">Add Gift Card</span>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="amount-payable checkout-options">
              <Card>
                <CardHeader>
                  <CardTitle>Price Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="detail">
                    <div className="details title">Price of 3 items</div>
                    <div className="detail-amt">
                      <strong>$699.30</strong>
                    </div>
                  </div>
                  <div className="detail">
                    <div className="details title">Delivery Charges</div>
                    <div className="detail-amt discount-amt">
                      <strong>Free</strong>
                    </div>
                  </div>
                  <hr />
                  <div className="detail">
                    <div className="details title">Amount Payable</div>
                    <div className="detail-amt">
                      <strong>$699.30</strong>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )
      }
    ]
  }
  handleDeleteProductInCart = product => {
    if (product && product.sanPham.id) {
      let order = JSON.parse(window.localStorage.getItem("saleOrder")).sanPhamDonHang;
      if (order != null && order.length > 0) {
        for (let i = 0; i < order.length; i++) {
          if (order[i].sanPham.id == product.sanPham.id) {
            var removeIndex = order.map(function (item) { return item.id; }).indexOf(product.sanPham.id);
            order.splice(removeIndex + 1, 1);
            window.localStorage.setItem("saleOrder", JSON.stringify(order));
          }
        }
      }
    }
  }
  formatPrice = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
  handleActiveStep = index => {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (currentUser == null || currentUser.id == null) {
      window.location.href = ConstantList.URL + "authentication/login";
    }
    this.setState({ activeStep: index })
  }
  handleChooseDefaultAddress = () => {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    let order = JSON.parse(window.localStorage.getItem("saleOrder"));
    if (currentUser != null && currentUser.id != null && order.sanPhamDonHang != null && order.sanPhamDonHang.length > 0) {
      saveOrder(order).then((res) => {
        if (res.status == 200) {
          toast.info("Chúc mừng bạn đã đặt hàng thành công");
        }else{
          toast.error("Có lỗi xảy ra khi đặt hàng, vui lòng thử lại");
        }
      }).catch(err=>{
        toast.error("Có lỗi xảy ra khi đặt hàng, vui lòng thử lại");
        console.log(err)
      })
    }
  }

  onValidationError = errors => {
    toast.error("Please Enter Valid Details", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  render() {
    const { steps, activeStep } = this.state
    return (
      <React.Fragment>
        <Breacrumbs
          breadCrumbTitle="Checkout"
          breadCrumbParent="eCommerce"
          breadCrumbActive="Checkout"
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
