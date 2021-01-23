package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;
@Entity
@Table(name = "tbl_danh_muc_san_pham")
public class DanhMucSanPham extends BaseObject{
	@Column(name = "ten")
	private String ten;
	@Column(name = "ma")
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
