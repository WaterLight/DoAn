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
import macbook from "../../assets/img/elements/nike7.jfif"
import headphones from "../../assets/img/elements/nike1.jfif"
import laptop from "../../assets/img/elements/nike2.jfif"
import homepod from "../../assets/img/elements/nike3.jfif"
import earphones from "../../assets/img/elements/nike4.jfif"
import iphoneX from "../../assets/img/elements/nike5.jfif"
import watch from "../../assets/img/elements/nike8.jfif"
import mouse from "../../assets/img/elements/nike6.jfif"
import "swiper/css/swiper.css"
import "../../assets/scss/pages/app-ecommerce-shop.scss"
import { searchByPage } from "../apps/ecommerce/shop/ShopService"

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

class About extends React.Component {
  state = {
    selectedColor: 1
  }
  toggleSelectedColor = color => this.setState({ selectedColor: color })

  componentDidMount() {
    this.search();
  }
  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.pageIndex = 1;
      searchObject.pageSize = 10;
      searchByPage(searchObject).then(res => {
        this.setState({ data: [...res.data.content], totalElements: res.data.totalElements })
      }).catch(err => { console.log(err) });
    });
  }
  render() {
    return (
      <React.Fragment>
        <CardBody>
          <Row>
            <Col className="text-center" sm="12">
              <div className="heading-section mb-3">
                <h3 className="text-uppercase mb-50">Thông tin giới thiệu về cửa hàng</h3>
              </div>
              <Swiper {...swiperParams}>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike Air Max.
                        </p>
                    <small>By VN</small>
                  </div>
                  <div className="img-container">
                    <img src={watch} alt="watch" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                  690.000 đ
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike Air Force 1.
                        </p>
                    <small>By VN</small>
                  </div>
                  <div className="img-container">
                    <img src={earphones} alt="earphones" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                  800.000 đ
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike Zoom.
                        </p>
                    <small>By VN</small>
                  </div>
                  <div className="img-container">
                    <img src={laptop} alt="laptop" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                  390.000 đ
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike Flyknit.
                        </p>
                    <small>By VN</small>
                  </div>
                  <div className="img-container">
                    <img src={homepod} alt="homepod" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                  590.000 đ
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike SF-AF1 “Desert Camo”
                        </p>
                    <small>By VN</small>
                  </div>
                  <div className="img-container">
                    <img src={iphoneX} alt="homepod" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                  2.190.000 đ
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike Air Huarache “Legion Green”
                        </p>
                    <small>by VN</small>
                  </div>
                  <div className="img-container">
                    <img src={headphones} alt="homepod" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                  1.890.000 đ
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                    Nike Air TR 17.
                        </p>
                    <small>by VN</small>
                  </div>
                  <div className="img-container">
                    <img src={mouse} alt="homepod" />
                  </div>
                  <div className="ratings  ml-1">
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={15} fill="#fff" stroke="#b8c2cc" />
                  </div>
                  <p className="text-bold-500 font-medium-2 text-primary mt-50">
                    890.000 đ
                      </p>
                </div>
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
  }
}

export default About