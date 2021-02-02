import axios from "axios";
import ConstantList from "../../configs/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/donHang/searchByPage";

//get list order by user
export const getListOrder= (dto) => {
  return axios.post(API_PATH, dto);
};
export const getCurrentUser =() =>{
  let url = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";
  return axios.get(url);
};