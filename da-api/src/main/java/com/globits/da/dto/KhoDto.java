package com.globits.da.dto;

import com.globits.da.domain.Kho;

public class KhoDto extends BaseObjectDto {
	private String tenKho;
	private String maKho;
	private String diaChi;
	public String getTenKho() {
		return tenKho;
	}
	public void setTenKho(String tenKho) {
		this.tenKho = tenKho;
	}
	public String getMaKho() {
		return maKho;
	}
	public void setMaKho(String maKho) {
		this.maKho = maKho;
	}
	public String getDiaChi() {
		return diaChi;
	}
	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}
	public KhoDto() {
		super();
	}
	public KhoDto(Kho entity) {
		if(entity != null) {
			this.setId(entity.getId());
			this.diaChi= entity.getDiaChi();
			this.tenKho = entity.getTenKho();
			this.maKho = entity.getMaKho();
		}
	}
}
