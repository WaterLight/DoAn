import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/kho";

export const searchByPage = (searchObject) => {
  var url = API_PATH + "/getByPage";
  return axios.post(url, searchObject);
};

export const getAllStores = () => {
  return axios.get(API_PATH+"/1/100000");  
};

export const getStoreByPage = (pageIndex, pageSize) => {
  var pageIndex = pageIndex;
  var params = pageIndex + "/" + pageSize;
  var url = API_PATH + "/"  + params;
  return axios.get(url);  
};
export const searchByText =  (keyword, pageIndex, pageSize) => {
  var pageIndex = pageIndex;
  var params = pageIndex + "/" + pageSize;
  return axios.post(API_PATH + "/searchByText/" + params, keyword);
};

export const getUserById = id => {
  return axios.get("/api/user", { data: id });
};
export const deleteItem = id => {
  return axios.delete(API_PATH +"/"+ id);
};

export const getItemById = id => {
  return axios.get(API_PATH +"/"+ id);
};

export const checkCode = (id, code) => {
  const config = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, config);
};

export const updateStore = Store => {
  return axios.post(API_PATH + "/update/" +Store.id , Store);
};
export const addNewStore = Store => {
  return axios.post(API_PATH + "/create" , Store);
};