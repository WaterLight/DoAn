import React from "react"
import { Card, CardBody, Button } from "reactstrap"
import Slider from "rc-slider"
import { Check, Star } from "react-feather"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "rc-slider/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"
import "../../../../assets/scss/plugins/extensions/slider.scss"
import { searchProductCategoryByPage, searchByPage as searchProduct } from "./ShopService"

class ShopSidebar extends React.Component {
  state = {
    listCategory: [],
    rowsPerPage: 100000,
    page: 0,
    rowsPerPage: 100000,
    totalElements: 0
  }
  componentDidMount() {
    this.search();
  }
  componentWillUnmount() {

  }
  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchProductCategoryByPage(searchObject).then(res => {
        this.setState({ listCategory: [...res.data.content], totalElements: res.data.totalElements })
      }).catch(err => { console.log(err) });
    });
  }
  filter = (valueMin, valueMax, type) =>{
    //type = 1: filter by Price, type = 2: filter by Product Category
    if(type == 1 && (valueMin != null || valueMax != null)){
      let searchDto = {};
     searchDto.priceMin = valueMin;
     searchDto.priceMax = valueMax;
     searchDto.pageIndex = this.state.page + 1;
     searchDto.pageSize = this.state.rowsPerPage;
      window.CallOutSideComponent.filterProduct(searchDto);
    }
    else if(type == 2 && valueMin != null){
      let searchDto = {};
      searchDto.danhMucSanPhamId = valueMin;
      searchDto.pageIndex = this.state.page + 1;
      searchDto.pageSize = this.state.rowsPerPage;
      window.CallOutSideComponent.filterProduct(searchDto);
    }
    else{
      let searchDto = {};
      searchDto.pageIndex = this.state.page + 1;
      searchDto.pageSize = this.state.rowsPerPage;
      window.CallOutSideComponent.filterProduct(searchDto);
    }
  }
  render() {
    let { listCategory } = this.state;
    let renderProductCategorys = listCategory.map((pc, i) => {
      return (
        <Radio
        onClick = {()=> this.filter(pc.id,null,2)}
          key={i}
          label={pc.ten}
          defaultChecked={false}
          name="shopRadio"
          className="py-25"
        />
      )
    })
    return (
      <React.Fragment>
        <h6 className="filter-heading d-none d-lg-block">Danh mục sản phẩm</h6>
        <Card>
          <CardBody className="p-2">
            <div className="multi-range-price">
              <div className="multi-range-title pb-75">
                <h6 className="filter-title mb-0">Lọc theo giá</h6>
              </div>
              <ul className="list-unstyled price-range">
                <li>
                  <Radio
                    onClick = {()=> this.filter(null,null,1)}
                    label="Tất cả"
                    defaultChecked={true}
                    name="shopRadio"
                    className="py-25"
                  />
                </li>
                <li>
                  <Radio
                    onClick = {()=> this.filter(300000,null,1)}
                    label="<= 300.000 đ"
                    defaultChecked={false}
                    name="shopRadio"
                    className="py-25"
                  />
                </li>
                <li>
                  <Radio
                    onClick = {()=> this.filter(300000,600000,1)}
                    label="300.000 đ - 600.000 đ"
                    defaultChecked={false}
                    name="shopRadio"
                    className="py-25"
                  />
                </li>
                <li>
                  <Radio
                    onClick = {()=> this.filter(600000,1000000,1)}
                    label="600.000 đ - 1.000.000 đ"
                    defaultChecked={false}
                    name="shopRadio"
                    className="py-25"
                  />
                </li>
                <li>
                  <Radio
                    onClick = {()=> this.filter(null,1000000,1)}
                    label="> 1.000.000 đ"
                    defaultChecked={false}
                    name="shopRadio"
                    className="py-25"
                  />
                </li>
              </ul>
            </div>
            <hr />
            <div className="product-categories">
              <div className="product-category-title">
                <h6 className="filter-title mb-1">Loại sản phẩm</h6>
              </div>
              <ul className="list-unstyled categories-list">
                {renderProductCategorys}
              </ul>
            </div>
            <hr />
          </CardBody>
        </Card>
      </React.Fragment >
    )
  }
}
export default ShopSidebar
