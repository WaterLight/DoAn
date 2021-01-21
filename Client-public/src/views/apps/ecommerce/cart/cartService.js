import axios from "axios";
import ConstantList from "../../../../configs/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/donHang";

//save order
export const saveOrder = (order) => {
  return axios.post(API_PATH, order);
};