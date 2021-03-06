package com.globits.da.dto;

import com.globits.da.domain.DonViTinh;

public class DonViTinhDto extends BaseObjectDto{
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
	public DonViTinhDto() {
		super();
	}
	public DonViTinhDto(DonViTinh entity) {
		if(entity != null) {
			this.setId(entity.getId());
			this.ma = entity.getMa();
			this.ten = entity.getTen();
		}
	}
}
