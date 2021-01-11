import axios from "axios";
import ConstantList from "../../appConfig";

export const getAllStockKeepingUnits = () => {
  return axios.get(ConstantList.API_ENPOINT+"/api/donvitinh/1/100000");  
};

export const searchByPage =  (dto) => {
  var pageIndex = pageIndex;
  return axios.post(ConstantList.API_ENPOINT + "/api/donvitinh/getByPage", dto);
};

export const getUserById = id => {
  return axios.get("/api/user", { data: id });
};
export const deleteItem = id => {
  return axios.delete(ConstantList.API_ENPOINT+"/api/donvitinh/"+id);
};

export const getItemById = id => {
  return axios.get(ConstantList.API_ENPOINT + "/api/donvitinh/" + id);
};

export const checkCode = (id, code) => {
  const config = { params: {id: id, code: code } };
  var url = ConstantList.API_ENPOINT+"/api/donvitinh/checkCode";
  return axios.get(url, config);
};

export const addNewStockKeepingUnit = StockKeepingUnit => {
  return axios.post(ConstantList.API_ENPOINT + "/api/donvitinh/create", StockKeepingUnit);
};
export const updateStockKeepingUnit = StockKeepingUnit => {
  return axios.put(ConstantList.API_ENPOINT + "/api/donvitinh/update/" + StockKeepingUnit.id, StockKeepingUnit);
};
export const deleteCheckItem = id => {
  return axios.delete(ConstantList.API_ENPOINT + "/api/donvitinh/delete/" + id);
};