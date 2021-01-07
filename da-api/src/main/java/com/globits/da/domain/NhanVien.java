package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.globits.core.domain.Person;
@Entity
@Table(name = "tbl_nhan_vien")
public class NhanVien extends Person{
	@Column(name = "ma_nv")
	private String maNV;
	@Column(name = "email")
	private String email;
	public String getMaNV() {
		return maNV;
	}
	public void setMaNV(String maNV) {
		this.maNV = maNV;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}
