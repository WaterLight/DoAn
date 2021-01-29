package com.globits.da.dto;

import com.globits.da.domain.SuKienVaDanhMucSanPham;

public class SuKienVaDanhMucSanPhamDto extends com.globits.core.dto.BaseObjectDto {
	private SuKienDto suKien;
	private DanhMucSanPhamDto danhMucSanPham;
	public SuKienDto getSuKien() {
		return suKien;
	}
	public void setSuKien(SuKienDto suKien) {
		this.suKien = suKien;
	}
	public DanhMucSanPhamDto getDanhMucSanPham() {
		return danhMucSanPham;
	}
	public void setDanhMucSanPham(DanhMucSanPhamDto danhMucSanPham) {
		this.danhMucSanPham = danhMucSanPham;
	}
	public SuKienVaDanhMucSanPhamDto() {
		super();
	}
	public SuKienVaDanhMucSanPhamDto(SuKienVaDanhMucSanPham entity) {
		if (entity != null) {
			this.id = entity.getId();
			if (entity.getSuKien() != null) {
				this.suKien = new SuKienDto(entity.getSuKien(), false);
			}
			if (entity.getDanhMucSanPham() != null) {
				this.danhMucSanPham = new DanhMucSanPhamDto(entity.getDanhMucSanPham());
			}
		}
	}
	public SuKienVaDanhMucSanPhamDto(SuKienVaDanhMucSanPham entity, boolean simple) {
		if (entity != null) {
			if (entity.getSuKien() != null) {
				this.suKien = new SuKienDto(entity.getSuKien(), false);
			}
			if (entity.getDanhMucSanPham() != null) {
				this.danhMucSanPham = new DanhMucSanPhamDto(entity.getDanhMucSanPham());
			}
		}
	}

}
