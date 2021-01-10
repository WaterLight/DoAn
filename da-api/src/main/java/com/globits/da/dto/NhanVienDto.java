package com.globits.da.dto;

import com.globits.da.domain.NhanVien;

public class NhanVienDto extends BaseObjectDto {
	private String maNV;
	private String type;
	public String getMaNV() {
		return maNV;
	}
	public void setMaNV(String maNV) {
		this.maNV = maNV;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public NhanVienDto() {
		super();
	}
	public NhanVienDto(NhanVien e) {
		if(e != null) {
			this.setId(e.getId());
			this.maNV = e.getMaNV();
			this.type = e.getType();
		}
	}
}
