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
              <div className="text-justify">
                <p>
                  Shoe Sneakers là trang thương mại điện tử chuyên cung cấp và bán lẻ các sản phẩm giày thời trang cao cấp, giày thể thao hàng hiệu hàng đầu tại Việt Nam.
                </p>
                Shoe Sneackers ra đời với sứ mệnh: Đem cả thế giới giày hàng hiệu đến ngôi nhà của bạn chỉ trong vài cái click chuột. Đơn giản - Nhanh chóng và Siêu Tiện lợi.
                <p>

                  Mục tiêu về chiến lược: Shoe Sneakers  phấn đấu trở thành một sàn thương mại điện tử về giày thể thao cao cấp hàng đầu Việt Nam và vươn xa ra thị trường thế giới, góp phần tạo nên chất lượng và trải nghiệm tốt nhất cho người Việt với giá cả phải chăng.
              </p>
                <p>

                  Shoe Sneakers  hứa hẹn mang đến cho các khách hàng thân yêu những đôi giày thể thao thời thượng xịn xò, trẻ trung, năng động và cá tính từ những thương hiệu danh tiếng trên thế giới như: Nike, Adidas, MLB,Vans, Puma, Converse...
              </p>
                <p>

                  Tất cả những gì bạn cần làm là nhấp chuột đặt hàng và Shoe Sneakers  sẽ hoàn thành phần còn lại để những đôi giày cao cấp hàng hiệu được chuyển đến tận tay khách hàng với trải nghiệm tuyệt vời mà đội ngũ Shoe Sneakers  đã nỗ lực không ngừng nghỉ vì những khách hàng thân yêu của mình.
                  Đội ngũ Shoe Sneakers
              </p>
                <div className="text-info">
                  <p>
                    Địa chỉ: Ngõ 147 Triều khúc- Thanh xuân- Hà Nội
                </p>
                  <p>
                    Số điện thoại liên hệ: 0983227930
                </p>
                  <p>
                    Email: huyentrang070799@gmail.com
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </React.Fragment>
    )
  }
}

export default About