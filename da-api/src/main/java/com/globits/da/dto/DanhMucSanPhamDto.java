package com.globits.da.dto;

import javax.persistence.Column;

public class DanhMucSanPhamDto extends BaseObjectDto{
	private String ten;
	private String ma;
	public String getTen() {
		return ten;
	}
	public void setTen(String ten) {
		this.ten = ten;
	}
	public String getMa() {
		return ma;
	}
	public void setMa(String ma) {
		this.ma = ma;
	}
	
}
