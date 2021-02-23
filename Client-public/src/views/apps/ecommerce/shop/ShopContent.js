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
  Badge
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
import { searchByPage, getNumberOfProductBySize } from "./ShopService"
import "../../../../assets/scss/plugins/forms/react-select/_react-select.scss"
import ConstantList from "../../../../configs/appConfig";
import imageDefault from "../../../../assets/img/pages/eCommerce/nike7.jfif"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import { history } from "../../../../history";
import DetailPage from "./Detail";
import Pagination from '@material-ui/lab/Pagination';

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
  constructor() {
    super();
    window.CallOutSideComponent = this;
  }
  state = {
    product: {},
    inCart: [],
    inWishlist: [],
    view: "grid-view",
    rowsPerPage: 3,
    page: 0,
    data: [],
    listProduct: [],
    totalElements: 0,
    totalPages: 1,
    numberOfProduct: 0,
    keyword: "",
    saleOrder: {
      sanPhamDonHang: [],
      totalAmount: 0,
      tongGia: 0,
      giamGia: 0
    }
  }

  handleAddToCart = product => {
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
      this.setState({ inCart: product.id });
      toast.info("Thêm thành công " + product.tenSP + " vào giỏ hàng của bạn!");
      window.localStorage.setItem("saleOrder", JSON.stringify(saleOrder));
    }
  }

  handleView = view => {
    this.setState({
      view
    })
  }
  componentDidMount() {
    this.search();
  }
  componentWillUnmount() {
  }
  search = () => {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(res => {
        this.setState({ data: [...res.data.content], totalElements: res.data.totalElements , totalPages:res.data.totalPages})
      }).catch(err => { console.log(err) });
    });
  }
  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () { });
  };
  handleKeyDownEnterSearch = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };
  handleChangePage = (event, value) =>{
    var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = value;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(res => {
        this.setState({ data: [...res.data.content], totalElements: res.data.totalElements , totalPages:res.data.totalPages})
      }).catch(err => { console.log(err) });
  }
  filterProduct = (dto) => {
    if (dto != null) {
      var searchObject = {};
      searchObject.danhMucSanPhamId = dto.danhMucSanPhamId;
      searchObject.priceMin = dto.priceMin;
      searchObject.priceMax = dto.priceMax;
      searchObject.pageIndex = dto.pageIndex;
      searchObject.pageSize = dto.pageSize;
      searchByPage(searchObject).then(res => {
        this.setState({ data: [...res.data.content], totalElements: res.data.totalElements, totalPages:res.data.totalPages})
      }).catch(err => { toast.error("Có lỗi xảy ra khi tải danh sách sản phẩm") });
    }
  }
  getProductDetail = (productId) => {
    if (productId != null) {
      history.push(ConstantList.ROOT_PATH + "/ecommerce/product-detail/" + productId);
      return (
        <DetailPage productDetail={productId} >
        </DetailPage>
      )
    }
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
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
  promatterContent = (value) => {
    if (value != null && value.length > 0) {
      return value.slice(3, value.length - 4);
    }
  }
  selectProductSize = (product, size, i) => {
    if (size != null && product != null) {
      let productSize = {};

      productSize.size = size;
      productSize.product = product;
      this.setState({ productSize: productSize });

      //check số lượng xem còn không
      getNumberOfProductBySize(product.id, size.id).then(res => {
        if (res.data != null) {
          this.setState({ numberOfProduct: res.data, productSelected: i })
        }
      }).catch(err => { toast.error("Có lỗi xảy ra vui lòng thử lại") });
    }
  }
  render() {
    let { data, totalPages } = this.state;
    if (data && data.length > 0) {
      let renderProducts = data.map((product, i) => {
        let renderProductSizes = product.size.map((ps, j) => {
          return (
            <Radio
              onClick={() => this.selectProductSize(product, ps, i)}
              key={j}
              label={ps.ma}
              defaultChecked={false}
              name="shopRadio"
              className="py-25 pd-5"
            />
          )
        })
        return (
          <Card className="ecommerce-card" key={i}>
            <div className="card-content">
              <div className="item-img text-center">
                <Link onClick={() => this.getProductDetail(product.id)}>
                  {product.imageUrl ? (
                    <img
                      className="img-fluid"
                      src={ConstantList.API_ENPOINT + "/public/getImage/" + product.imageUrl.split(".")[0] + "/" + product.imageUrl.split(".")[1]}
                      alt={product.tenSP}
                    />
                  ) : (
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
                      <Star size={14} />
                    </Badge>
                  </div>
                  <div className="product-price">
                    <h6 className="item-price">{this.formatPrice(product.giaBanHienThoi)} đ</h6>
                  </div>
                </div>
                <div className="item-wrapper">
                  <Link onClick={() => this.getProductDetail(product.id)}>
                    {" "}
                    <span className="item-name">{product.tenSP}</span>
                  </Link>
                  <p className="product-price">
                    Còn lại:
                    {this.state.numberOfProduct >= 0 && i === this.state.productSelected ? (
                      <span className="company-name" key={i}>{this.state.numberOfProduct}</span>
                    ) : (<span className="company-name">{product.soLuongDangCo}</span>)
                    }
                  </p>
                </div>
                <div className="item-wrapper">
                  <ul className="list-unstyled categories-list size-list">
                    <span className="size-product">Size:</span> {renderProductSizes}
                  </ul>
                </div>
                <div className="item-desc">
                  <p className="item-description">{product.shortContent}</p>
                </div>
              </CardBody>
              <div className="item-options text-center">
                <div className="item-wrapper">
                  <div className="item-rating">
                    <Badge color="primary" className="badge-md">
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
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    defaultValue={sortOptions[0]}
                    name="sort"
                    options={sortOptions}
                  /> */}
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
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeyDownEnterSearch}
                    className="search-product"
                    placeholder="Tìm kiếm sản phẩm..."
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
                <Pagination className="d-flex justify-content-center mt-2" count={totalPages} onChange={(event, value) =>this.handleChangePage(event, value)}>
                </Pagination>
              </div>
            </Col>
          </Row>
        </div>
      )
    } else {
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
                  {/* <Select
                    className="React-Select"
                    classNamePrefix="select"
                    defaultValue={sortOptions[0]}
                    name="sort"
                    options={sortOptions}
                  /> */}
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
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeyDownEnterSearch}
                    className="search-product"
                    placeholder="Tìm kiếm sản phẩm..."
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
              <div className="center-content none-data">
                <span className="bold">Không có sản phẩm nào phù hợp.</span>
              </div>
            </Col>
            <Col sm="12">
              <div className="ecommerce-pagination">
                <Pagination className="d-flex justify-content-center mt-2">
                </Pagination>
              </div>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default ShopContent
