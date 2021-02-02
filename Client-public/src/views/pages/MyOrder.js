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
import { getListOrder, getCurrentUser } from "./OrderService"
import { format } from "date-fns";
import { toast } from "react-toastify"
import ConstantList from "../../configs/appConfig";

import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody ,TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
class Event extends React.Component {
  state = {
    selectedColor: 1,
    data: []
  }
  toggleSelectedColor = color => this.setState({ selectedColor: color })

  componentDidMount() {
    getCurrentUser().then(({ data }) => {
      if (data != null && data.id != null) {
        this.setState({ currentUser: data });
        var searchObject = {};
        searchObject.pageIndex = 1;
        searchObject.pageSize = 10000;
        searchObject.userId = data.id;
        getListOrder(searchObject).then(res => {
          this.setState({ data: [...res.data.content], totalElements: res.data.totalElements })
        }).catch(err => { console.log(err) });
      }
    })
  }
  search() {
    let { currentUser } = this.state;
    // if (currentUser != null && currentUser.id != null) {
      this.setState({ page: 0 }, function () {
        
      });
    // } else {
    //   toast.info("Bạn chưa đăng nhập vào hệ thống, Vui lòng đăng nhập để xem đơn hàng đã đặt")
    //   window.location.href = ConstantList.ROOT_PATH + "/ecommerce/shop";
    // }
  }
  formatPrice = value => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }else return "0"
  }
  formatStatus = status => {
    // newOrder(1),// đơn hàng mới
    // confirmOrder(2),// đơn hàng đã xác nhận
    // cancelOrder(3),// đơn hàng đã hủy
    // paymentOrder(4);// đơn hàng đã thanh toán
    if (status) {
      if (status == 1) return "Đơn hàng mới";
      else if (status == 2) return "Đơn hàng đã xác nhận";
      else if (status == 3) return "Đơn hàng đã hủy";
      else if (status == 4) return "Đơn hàng đã thanh toán";
      else return "";

    }
  }
  formatPaymentType = paymentType => {
    // transferBanking(1),// chuyển khoản
    // cashing(2);// tiền mặt
    if (paymentType) {
      if (paymentType == 1) return "Chuyển khoản";
      else if (paymentType == 2) return "Tiền mặt";
      else return "";

    }
  }
  formatDate = date =>{
    if(date != null){
      return (new Date(date).toLocaleString());
    }else return "";
  }
  render() {
    let { data } = this.state;
    if (data && data.length > 0) {
      let renderOrders = data.map((order, i) => {
        return (
          <TableRow key={i}>
            <TableCell component="th" scope="row">{order.ten}</TableCell>
            <TableCell align="right">{order.user.person.phoneNumber}</TableCell>
            <TableCell align="right">{order.ma}</TableCell>
            <TableCell align="right">{this.formatDate(order.ngayDatHang)}</TableCell>
            <TableCell align="right">{this.formatDate(order.ngayGiaoHang)}</TableCell>
            <TableCell align="right">{this.formatPrice(order.tongGia)} đ</TableCell>
            <TableCell align="right">{this.formatPrice(order.giamGia)} đ</TableCell>
            <TableCell align="right">{this.formatPrice(order.thanhTien)} đ</TableCell>
            <TableCell align="right">{this.formatStatus(order.trangThai)}</TableCell>
            <TableCell align="right">{this.formatPaymentType(order.paymentType)}</TableCell>
          </TableRow>
        )
      }
      )
      return (
        <React.Fragment>
          <CardBody>
            <Row>
              <Col className="text-center" sm="12">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Người đặt hàng</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell align="right">Mã đơn hàng</TableCell>
                        <TableCell align="right">Ngày đặt hàng</TableCell>
                        <TableCell align="right">Ngày giao hàng</TableCell>
                        <TableCell align="right">Tổng tiền đơn hàng</TableCell>
                        <TableCell align="right">Giảm giá</TableCell>
                        <TableCell align="right">Thành tiền</TableCell>
                        <TableCell align="right">Trạng thái</TableCell>
                        <TableCell align="right">Hình thức thanh toán</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {renderOrders}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Col>
            </Row>
          </CardBody>
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <CardBody>
            <Row>
              <Col className="text-center" sm="12">
                <a className="bold" href={ConstantList.ROOT_PATH + "/ecommerce/shop"}>Bạn chưa có đơn hàng nào! Xin mời chọn các mẫu giầy của shop.</a>
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