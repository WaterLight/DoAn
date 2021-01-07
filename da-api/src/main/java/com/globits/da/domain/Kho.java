package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_kho")
public class Kho  extends BaseObject{
	@Column(name = "ten_kho")
	private String tenKho;
	@Column(name = "ma_kho")
	private String maKho;
	@Column(name = "dia_chi")
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
	
	
}
