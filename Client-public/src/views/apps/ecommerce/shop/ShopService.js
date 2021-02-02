import axios from "axios";
import ConstantList from "../../../../configs/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/public/";

//get list product
export const searchByPage = (searchObject) => {
  return axios.post(API_PATH +  "getListProductByPage", searchObject);
};
//get product Detail
export const getProductById = (id) => {
  if(id != null){
    return axios.get(API_PATH +  "getProductById/" +id);
  }
};
//get list product category
export const searchProductCategoryByPage = (searchObject) => {
  return axios.post(API_PATH +  "getListProductCategoryByPage", searchObject);
};
//get number of product by size
export const getNumberOfProductBySize = (productId, sizeId) =>{
  if(productId != null && sizeId != null){
    return axios.get(API_PATH +  "getNumberOfProduct/" + productId + "/" + sizeId);
  }
}