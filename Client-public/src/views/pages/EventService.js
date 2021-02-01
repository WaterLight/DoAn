import axios from "axios";
import ConstantList from "../../configs/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/public/getListEvent";

//get list event
export const getListEvent= (dto) => {
  return axios.post(API_PATH, dto);
};