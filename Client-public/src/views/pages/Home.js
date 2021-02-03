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
import Breacrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import classnames from "classnames"
import Swiper from "react-id-swiper"
import imageDefault from "../../assets/img/elements/nike7.jfif"
import "swiper/css/swiper.css"
import "../../assets/scss/pages/app-ecommerce-shop.scss"
import { searchByPage } from "../apps/ecommerce/shop/ShopService"
import ConstantList from "../../configs/appConfig";

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

class Home extends React.Component {
  constructor() {
    super();
  }
  state = {
    selectedColor: 1,
    data: []
  }
  toggleSelectedColor = color => this.setState({ selectedColor: color })

  componentDidMount() {
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
  render() {
    let { data } = this.state;
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
      return (
        <React.Fragment>
          <CardBody>
            <Row>
              <Col className="text-center" sm="12">
                <div className="heading-section mb-3">
                  <h3 className="text-uppercase mb-50">Sản phẩm ưa chuộng - được lựa chọn nhiều nhất!</h3>
                </div>
                <Swiper {...swiperParams}>
                  {renderProducts}
                </Swiper>
              </Col>
            </Row>
          </CardBody>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row>
              <Col sm="12">
                <Row className="item-features py-5 mt-5">
                  <Col className="text-center" md="4" sm="12">
                    <div className="w-50 mx-auto">
                      <Award className="text-primary mb-1" size={42} />
                      <p className="font-medium-2 text-bold-600 mb-0">
                        Sản phẩm được lựa chọn số 1
                      </p>
                      <p>
                        Trẻ trung - Năng động - Thời trang
                      </p>
                    </div>
                  </Col>
                  <Col className="text-center" md="4" sm="12">
                    <div className="w-50 mx-auto">
                      <Clock className="text-primary mb-1" size={42} />
                      <p className="font-medium-2 text-bold-600 mb-0">
                        Thời gian phản hồi nhanh chóng
                      </p>
                      <p>Nhân viên hỗ trợ, phụ vụ tận tình chu đáo.</p>
                    </div>
                  </Col>
                  <Col className="text-center" md="4" sm="12">
                    <div className="w-50 mx-auto">
                      <Shield className="text-primary mb-1" size={42} />
                      <p className="font-medium-2 text-bold-600 mb-0">
                        Sự tin tưởng
                      </p>
                      <p>Ra mắt những sản phẩm tốt nhất</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </React.Fragment>
      )
    } else {
      return (<span>Đã có lỗi xảy ra, vui lòng tải lại trang!</span>)
    }
  }
}

export default Home