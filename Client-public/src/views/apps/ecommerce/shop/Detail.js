import React from "react"
import { Card, CardBody, Row, Col, Button } from "reactstrap"
import {
  Star,
  Truck,
  DollarSign,
  ShoppingCart,
  Heart,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Award,
  Clock,
  Shield
} from "react-feather"
import Breacrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import Swiper from "react-id-swiper"
import "swiper/css/swiper.css"
import "../../../../assets/scss/pages/app-ecommerce-shop.scss"
import { getProductById, getNumberOfProductBySize, searchByPage } from "./ShopService"
import ConstantList from "../../../../configs/appConfig";
import imageDefault from "../../../../assets/img/pages/eCommerce/nike7.jfif"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const swiperParams = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    1600: {
      slidesPerView: 5,
      spaceBetween: 55
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 55
    },
    1260: {
      slidesPerView: 3,
      spaceBetween: 55
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 55
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 55
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 55
    }
  }
}
class DetailPage extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    selectedColor: 1,
    product: {},
    productId: "",
    keyword: "",
    data: [],
    comments:"",
    saleOrder: {
      sanPhamDonHang: [],
      totalAmount: 0,
      tongGia: 0,
      giamGia: 0
    }
  }
  toggleSelectedColor = color => this.setState({ selectedColor: color })

  componentWillMount() {
    let { location } = this.props;
    const productId = location.pathname.substring(36, location.pathname.length);
    this.setState({ productId: productId });
  }
  componentDidMount() {
    this.getProductById(this.state.productId);
    this.search();

  }
  search = () => {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.pageIndex = 1;
      searchObject.pageSize = 20;
      searchObject.isPopular = true;
      searchByPage(searchObject).then(res => {
        this.setState({ data: [...res.data.content], totalElements: res.data.totalElements })
      }).catch(err => { console.log(err) });
    });
  }
  formatPrice = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
  getProductById = (productId) => {
    getProductById(productId).then(respon => {
      this.setState({ product: respon.data });
    }).catch(err => { console.log(err) });
  }
  promatterContent = (value) => {
    if (value != null && value.length > 0) {
      return value.slice(3, value.length - 4);
    }
  }
  formatPrice = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }

  chooseProductSize = (product, size) => {
    if (size != null && product != null) {
      let productSize = {};
      productSize.size = size;
      productSize.product = product;
      this.setState({ productSize: productSize });
      //check số lượng xem còn không
      getNumberOfProductBySize(product.id, size.id).then(res => {
        if (res.data != null) {
          this.setState({ numberOfProduct: res.data })
        }
      }).catch(err => { toast.error("Có lỗi xảy ra vui lòng thử lại") });
    }
  }
  addToOrder = product => {
    if (product && product.id) {
      let { productSize, saleOrder } = this.state;
      let sanPhamDonHangDto = {};
      sanPhamDonHangDto.sanPham = product;
      sanPhamDonHangDto.soLuong = 1;//tạm fix là 1 sản phẩm
      sanPhamDonHangDto.donGia = product.giaBanHienThoi;
      if (product.giamGia != null && product.giamGia > 0) {
        sanPhamDonHangDto.trietKhau = product.giamGia / 100;
        sanPhamDonHangDto.thanhTien = sanPhamDonHangDto.soLuong * sanPhamDonHangDto.donGia * (1 - sanPhamDonHangDto.trietKhau);
      } else {
        sanPhamDonHangDto.thanhTien = sanPhamDonHangDto.soLuong * sanPhamDonHangDto.donGia;
      }
      if (productSize != null && product.id == productSize.product.id && productSize.size != null) {
        sanPhamDonHangDto.size = productSize.size;
      } else {
        toast.warning("Bạn chưa chọn size cho sản phẩm " + product.tenSP + ".");
        return false;
      }
      saleOrder.sanPhamDonHang.push(sanPhamDonHangDto);
      saleOrder.totalAmount += product.giaBanHienThoi;
      if (product.giamGia != 0 && product.giamGia != null) {
        saleOrder.giamGia += product.giamGia;
        saleOrder.tongGia += product.giaBanHienThoi * (100 - product.giamGia) / 100;
      } else {
        saleOrder.tongGia += product.giaBanHienThoi;
      }
      saleOrder.thanhTien = saleOrder.tongGia;
      toast.info("Thêm thành công " + product.tenSP + " vào giỏ hàng của bạn!");
      window.localStorage.setItem("saleOrder", JSON.stringify(saleOrder));
    }
  }
  processComment = (event) => {
    event.preventDefault();

  }
  render() {
    let { product, data } = this.state;
    if (data && data.length > 0) {
      let renderProducts = data.map((product, i) => {
        return (
          <div key={i}>
            <div className="title mb-1" >
              <p className="font-medium-1 text-bold-600 truncate mb-0">
                {product.tenSP}
              </p>
              <small>{product.shortContent}</small>
            </div>
            <div className="img-container">
              {product.imageUrl ? (
                <img src={ConstantList.API_ENPOINT + "/public/getImage/" + product.imageUrl.split(".")[0] + "/" + product.imageUrl.split(".")[1]}
                  alt={product.tenSP} />
              ) : (
                  <img
                    className="img-fluid"
                    src={imageDefault}
                    alt="Empty Image"
                  />
                )
              }
            </div>
            <div className="ratings  ml-1">
              <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
              <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
              <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
              <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
              <Star size={15} fill="#fff" stroke="#b8c2cc" />
            </div>
            <p className="text-bold-500 font-medium-2 text-primary mt-50">
              {this.formatPrice(product.giaBanHienThoi)} đ
            </p>
          </div>
        )
      }
      )
      if (product && product.id) {
        let renderProductSizes = product.size.map((ps) => {
          return (
            <Radio
              onClick={() => this.chooseProductSize(product, ps, null)}
              label={ps.ma}
              defaultChecked={false}
              name="shopRadio"
              className="py-25 pd-5"
            />
          )
        })
        return (
          <React.Fragment>
            <Breacrumbs
              breadCrumbTitle="Chi tiết"
              breadCrumbParent="Sản phẩm"
              breadCrumbActive="Thông tin chi tiết sản phẩm"
            />
            <Card className="overflow-hidden app-ecommerce-details">
              <CardBody className="pb-0">
                <Row className="mb-5 mt-2">
                  <Col
                    className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                    sm="12"
                    md="5"
                  >
                    {product.imageUrl ? (
                      <img
                        className="img-fluid"
                        src={ConstantList.API_ENPOINT + "/public/getImage/" + product.imageUrl.split(".")[0] + "/" + product.imageUrl.split(".")[1]}
                        alt={product.tenSP}
                        height="450" width="450"
                      />
                    ) : (
                        <img
                          className="img-fluid"
                          src={imageDefault}
                          alt="Empty Image"
                        />
                      )
                    }
                  </Col>
                  <Col md="7" sm="12">
                    <h3>{product.tenSP}</h3>
                    <p className="text-muted">{product.shortCotent}</p>
                    <div className="d-flex flex-wrap">
                      <h3 className="text-primary">{this.formatPrice(product.giaBanHienThoi)} đ</h3>
                      <div className="ratings border-left ml-1 pl-1">
                        <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                        <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                        <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                        <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                        <Star size={20} fill="#fff" stroke="#b8c2cc" />
                        <span className="ml-1 font-medium-1 text-dark align-middle">
                        </span>
                      </div>
                    </div>
                    <hr />
                    <p>
                      {this.promatterContent(product.baiViet)}
                    </p>
                    <ul className="list-unstyled">
                      <li className="mb-50">
                        {/* <Truck size={15} /> */}
                        <span className="align-middle font-weight-bold ml-50">
                          {/* Free Sheeping */}
                        </span>
                      </li>
                      <li>
                        {/* <DollarSign size={15} /> */}
                        <span className="align-middle font-weight-bold ml-50">
                          {/* EMI options available */}
                        </span>
                      </li>
                    </ul>
                    <hr />
                    <div className="item-wrapper">
                      <ul className="list-unstyled categories-list size-list">
                        <span className="size-product">Size:</span> {renderProductSizes}
                      </ul>
                    </div>
                    <hr />
                    <p className="my-50">
                      <span className="product-price">
                        Còn lại:
                    {this.state.numberOfProduct || this.state.numberOfProduct >= 0 ? (
                          <span className="company-name">{this.state.numberOfProduct}</span>
                        ) : (<span className="company-name">{product.soLuongDangCo}</span>)
                        }
                      </span>
                      {/* <span className="mx-50">-</span> */}
                      {/* <span className="text-success">In Stock</span> */}
                    </p>
                    <div className="action-btns">
                      <Button.Ripple className="mr-1 mb-1" color="primary" onClick={() => this.addToOrder(product)}>
                        <ShoppingCart size={15} />
                        <span className="align-middle ml-50" >Thêm vào giỏ hàng</span>
                      </Button.Ripple>
                      <Button.Ripple className="mb-1" color="danger" outline>
                        <Heart size={15} />
                        {/* <span className="align-middle ml-50">WISHLIST</span> */}
                      </Button.Ripple>
                    </div>
                    <div className="d-flex flex-wrap social-media-btns">
                      <Button.Ripple
                        className="mr-1 btn-icon rounded-circle"
                        color="primary"
                        outline
                      >
                        <Facebook size={15} />
                      </Button.Ripple>
                      <Button.Ripple
                        className="mr-1 btn-icon rounded-circle"
                        color="info"
                        outline
                      >
                        <Twitter size={15} />
                      </Button.Ripple>
                      <Button.Ripple
                        className="mr-1 btn-icon rounded-circle"
                        color="danger"
                        outline
                      >
                        <Youtube size={15} />
                      </Button.Ripple>
                      <Button.Ripple
                        className="btn-icon rounded-circle"
                        color="primary"
                        outline
                      >
                        <Instagram size={15} />
                      </Button.Ripple>
                    </div>
                  </Col>
                </Row>
                <Row>
                  
                </Row>
              </CardBody>

              <CardBody>
                <Row>
                  <Col className="details-page-swiper text-center mt-5" sm="12">
                    <div className="heading-section mb-3">
                      <h2 className="text-uppercase mb-50">Sản phẩm liên quan</h2>
                      <p>Những sản phẩm ưa chuộng được các bạn trẻ lựa chọn</p>
                    </div>
                    <Swiper {...swiperParams}>
                      {renderProducts}
                    </Swiper>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </React.Fragment >
        )
      } else {
        return (<span>Có lỗi xảy ra, vui lòng thử lại sau</span>)
      }

    } else {
      return (<span>Có lỗi xảy ra, vui lòng thử lại sau</span>)
    }
  }
}
export default DetailPage
