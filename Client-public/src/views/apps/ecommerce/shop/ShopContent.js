import React from "react"
import Select from "react-select"
import {
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  Card,
  CardBody,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap"
import {
  Grid,
  List,
  Search,
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Menu
} from "react-feather"
import { Link } from "react-router-dom"
import { searchByPage } from "./ShopService"
import "../../../../assets/scss/plugins/forms/react-select/_react-select.scss"
import ConstantList from "../../../../configs/appConfig";
import imageDefault from "../../../../assets/img/pages/eCommerce/nike7.jfif"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sortOptions = [
  {
    value: "featured",
    label: "Featured"
  },
  {
    value: "lowest",
    label: "Lowest"
  },
  {
    value: "highest",
    label: "Highest"
  }
]

class ShopContent extends React.Component {
  state = {
    inCart: [],
    inWishlist: [],
    view: "grid-view",
    rowsPerPage: 100000,
    page: 0,
    data: [],
    totalElements: 0,
    keyword: "",
    saleOrder : {
      sanPhamDonHang: [],
      totalAmount: 0,
      tongGia: 0,
      giamGia:0
    }
  }

  handleAddToCart = product => {
    toast.info("Thêm thành công " + product.tenSP + " vào giỏ hàng của bạn!");
    if(product && product.id){
      this.state.saleOrder.sanPhamDonHang.push(product);
      this.state.saleOrder.totalAmount +=  product.giaBanHienThoi;
      if(product.giamGia != 0 && product.giamGia != null){
        this.state.saleOrder.giamGia += product.giamGia;
        this.state.saleOrder.tongGia +=  product.giaBanHienThoi*(100 - product.giamGia)/100;
      }else{
        this.state.saleOrder.tongGia +=  product.giaBanHienThoi;
      }
      this.setState({inCart:product.id});
      window.localStorage.setItem("saleOrder", JSON.stringify(this.state.saleOrder));
    }
  }

  handleView = view => {
    this.setState({
      view
    })
  }
  componentDidMount() {
    this.search();
    // this.state.saleOrder = JSON.parse(window.localStorage.getItem("saleOrder"));
    // console.log(this.state.saleOrder);
  }
  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(res => {
        this.setState({ data: [...res.data.content], totalElements: res.data.totalElements })
      }).catch(err => { console.log(err) });
    });
  }
  handleWishlist = i => {
    let wishlistArr = this.state.inWishlist
    if (!wishlistArr.includes(i)) wishlistArr.push(i)
    else wishlistArr.splice(wishlistArr.indexOf(i), 1)
    this.setState({
      inWishlist: wishlistArr
    })
  }
  formatPrice = value => {
    if(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }

render() {
  let renderProducts = this.state.data.map((product, i) => {
    return (
      <Card className="ecommerce-card" key={i}>
        <div className="card-content">
          <div className="item-img text-center">
            <Link to="/ecommerce/product-detail">
              {product.imageUrl? (
                <img
                className="img-fluid"
                src={ConstantList.API_ENPOINT + "/public/getImage/" + product.imageUrl.split(".")[0] + "/" + product.imageUrl.split(".")[1]}
                alt={product.tenSP}
              />
              ):(
                <img
                className="img-fluid"
                src={imageDefault}
                alt="Empty Image"
              />
              )
              }
            </Link>
          </div>
          <CardBody>
            <div className="item-wrapper">
              <div className="item-rating">
                <Badge color="primary" className="badge-md">
                  <span className="mr-50 align-middle">4</span>
                  <Star size={14} />
                </Badge>
              </div>
              <div className="product-price">
                <h6 className="item-price">{this.formatPrice(product.giaBanHienThoi)} đ</h6>
              </div>
            </div>
            <div className="item-name">
              <Link to="/ecommerce/product-detail">
                {" "}
                <span>{product.tenSP}</span>
              </Link>
              <p className="item-company">
                By <span className="company-name">{product.by}</span>
              </p>
            </div>
            <div className="item-desc">
              <p className="item-description">{product.baiViet}</p>
            </div>
          </CardBody>
          <div className="item-options text-center">
            <div className="item-wrapper">
              <div className="item-rating">
                <Badge color="primary" className="badge-md">
                  <span className="mr-50 align-middle">4</span>
                  <Star size={14} />
                </Badge>
              </div>
              <div className="product-price">
                <h6 className="item-price" id="numberformat">{product.price}</h6>
              </div>
            </div>
            <div className="wishlist" onClick={() => this.handleWishlist(i)}>
              <Heart
                size={15}
                fill={
                  this.state.inWishlist.includes(i)
                    ? "#EA5455"
                    : "transparent"
                }
                stroke={
                  this.state.inWishlist.includes(i) ? "#EA5455" : "#626262"
                }
              />
              <span className="align-middle ml-50">Wishlist</span>
            </div>
            <div className="cart">
              <ShoppingCart size={15} />
              <span className="align-middle ml-50">
                {this.state.inCart.includes(product.id) ? (
                  <Link to="checkout" className="text-white">
                    {""}Đơn hàng của tôi
                  </Link>
                ) : (
                  <span onClick={() => this.handleAddToCart(product)}>
                    {""}Thêm vào giỏ hàng
                  </span>
                  )}
              </span>
            </div>
            <div className="ecommerce-application">
        </div>
          </div>
        </div>
      </Card>
    )
  }
  )
  
  return (
    <div className="shop-content">
      <Row>
        <Col sm="6">
          <div className="ecommerce-header-items">
            <div className="result-toggler w-25 d-flex align-items-center">
              <div className="shop-sidebar-toggler d-block d-lg-none">
                <Menu
                  size={26}
                  onClick={() => this.props.mainSidebar(true)}
                />
              </div>
              {/* <div className="search-results">16285 Results Found</div> */}
            </div>
            <div className="view-options d-flex justify-content-end w-75 width-100-per ">
              <Select
                className="React-Select"
                classNamePrefix="select"
                defaultValue={sortOptions[0]}
                name="sort"
                options={sortOptions}
              />
              <div className="view-btn-option">
                <Button
                  color="white"
                  className={`view-btn ml-1 ${this.state.view === "grid-view" ? "active" : ""
                    }`}
                  onClick={() => this.handleView("grid-view")}
                >
                  <Grid size={24} />
                </Button>
                <Button
                  color="white"
                  className={`view-btn ${this.state.view === "list-view" ? "active" : ""
                    }`}
                  onClick={() => this.handleView("list-view")}
                >
                  <List size={24} />
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col sm="6">
          <div className="ecommerce-searchbar mt-1">
            <FormGroup className="position-relative">
              <Input
                className="search-product"
                placeholder="Search Here..."
              />
              <div className="form-control-position">
                <Search size={22} />
              </div>
            </FormGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <div id="ecommerce-products" className={this.state.view}>
            {renderProducts}
          </div>
        </Col>
        <Col sm="12">
          <div className="ecommerce-pagination">
            <Pagination className="d-flex justify-content-center mt-2">
              <PaginationItem className="prev-item">
                <PaginationLink href="#" first>
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">6</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">7</PaginationLink>
              </PaginationItem>
              <PaginationItem href="#" className="next-item">
                <PaginationLink href="#" last>
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  )
}
}

export default ShopContent
