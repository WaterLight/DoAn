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
import "swiper/css/swiper.css"
import "../../assets/scss/pages/app-ecommerce-shop.scss"
import { getListEvent } from "./EventService"
import { format } from "date-fns";

class Event extends React.Component {
  state = {
    selectedColor: 1,
    data: []
  }
  toggleSelectedColor = color => this.setState({ selectedColor: color })

  componentDidMount() {
    this.search();
  }
  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.pageIndex = 1;
      searchObject.pageSize = 1;
      searchObject.isActive = true;
      getListEvent(searchObject).then(res => {
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
      let renderEvents = data.map((event, i) => {
        return (
          <div key={i}>
            <div className="title mb-1" >
              <p className="font-medium-1 text-bold-600 truncate mb-0">
                <h3 className="text-uppercase mb-50">{event.tieuDe}</h3>
                <h4>{event.tieuDePhu}</h4>
              </p>
              <p>{event.noiDung}</p>
            </div>
            <p className="text-bold-500 font-medium-2 text-primary mt-50">
              Thời gian bắt đầu: {format(event.ngayBatDau, "dd/MM/yyyy")}
            </p>
            <p className="text-bold-500 font-medium-2 text-primary mt-50">
              Thời gian kết thúc: {format(event.ngayKetThuc, "dd/MM/yyyy")}
            </p>
            <h3>Các đơn hàng đặt trong khoảng thời gian này, mỗi đơn hàng có tổng giá trị trên 2.000.000 đ sẽ được giảm: {this.formatPrice(event.tienGiamGia)} đ</h3>
          </div>

        )
      }
      )
      return (
        <React.Fragment>
          <CardBody>
            <Row>
              <Col className="text-center" sm="12">
                {/* <div className="heading-section mb-3">
                  <h3 className="text-uppercase mb-50">Sự kiện chào mừng năm mới 2021</h3>
                  <p>Rất nhiều sản phẩm sale mạnh trong thời gian từ ngày <span className="bold">30/01/21 - 10/02/2021 </span></p>
                  <p>Hãy nhanh tay đặt hàng để nhận được những ưu đãi bất ngờ.</p>
                </div> */}
                <div>{renderEvents}</div>
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
    else {
      return (
        <React.Fragment>
          <CardBody>
            <Row>
              <Col className="text-center" sm="12">
                <span>Chưa có sự kiện nào diễn ra!</span>
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
}
export default Event