import axios from "axios";
import ConstantList from "../../../../configs/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/public/";

//get list product
export const searchByPage = (searchObject) => {
  return axios.post(API_PATH +  "getListProductByPage", searchObject);
};
//get list product category
export const searchProductCategoryByPage = (searchObject) => {
  return axios.post(API_PATH +  "getListProductCategoryByPage", searchObject);
};