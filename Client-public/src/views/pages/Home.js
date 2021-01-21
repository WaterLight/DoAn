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
import macbook from "../../assets/img/elements/macbook-pro.png"
import headphones from "../../assets/img/elements/beats-headphones.png"
import laptop from "../../assets/img/elements/macbook-pro.png"
import homepod from "../../assets/img/elements/homepod.png"
import earphones from "../../assets/img/elements/wireless-earphones.png"
import iphoneX from "../../assets/img/elements/iphone-x.png"
import watch from "../../assets/img/elements/apple-watch.png"
import mouse from "../../assets/img/elements/magic-mouse.png"
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

class Home extends React.Component {
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
                <h3 className="text-uppercase mb-50">Sản phẩm ưa chuộng - được lựa chọn nhiều nhất!</h3>
              </div>
              <Swiper {...swiperParams}>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      Beats by Dr. Dre - Powerbeats2 Wireless Earbud
                      Headphones - Black/Red
                        </p>
                    <small>By Dr. Dre</small>
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
                    $129
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      Apple - Apple Watch Nike+ 42mm Silver Aluminum Case
                      Silver/Volt Nike Sport Band - Silver Aluminum
                        </p>
                    <small>By Apple</small>
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
                    $399
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      Google - Google Home - White/Slate fabric
                        </p>
                    <small>By Google</small>
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
                    $1999.99
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      Amazon - Fire TV Stick with Alexa Voice Remote - Black
                        </p>
                    <small>By Amazon</small>
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
                    $39.99
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      Google - Chromecast Ultra - Black
                        </p>
                    <small>By Google</small>
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
                    $69.99
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      Beats by Dr. Dre - Beats EP Headphones - White
                        </p>
                    <small>Beats by Dr. Dre</small>
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
                    $129.99
                      </p>
                </div>
                <div>
                  <div className="title mb-1">
                    <p className="font-medium-1 text-bold-600 truncate mb-0">
                      LG - 40" Class (39.5" Diag.) - LED - 1080p - HDTV -
                      Black
                        </p>
                    <small>by LG</small>
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
                    $279.99
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
                      100% Original
                      </p>
                    <p>
                      Chocolate bar candy canes ice cream toffee cookie halvah.
                      </p>
                  </div>
                </Col>
                <Col className="text-center" md="4" sm="12">
                  <div className="w-50 mx-auto">
                    <Clock className="text-primary mb-1" size={42} />
                    <p className="font-medium-2 text-bold-600 mb-0">
                      10 Day Replacement
                      </p>
                    <p>Marshmallow biscuit donut dragée fruitcake wafer.</p>
                  </div>
                </Col>
                <Col className="text-center" md="4" sm="12">
                  <div className="w-50 mx-auto">
                    <Shield className="text-primary mb-1" size={42} />
                    <p className="font-medium-2 text-bold-600 mb-0">
                      1 Year Warranty
                      </p>
                    <p>Cotton candy gingerbread cake I love sugar sweet.</p>
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

export default Home