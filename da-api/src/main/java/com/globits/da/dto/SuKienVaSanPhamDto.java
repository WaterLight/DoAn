package com.globits.da.dto;

import com.globits.da.domain.SuKienVaSanPham;

public class SuKienVaSanPhamDto extends com.globits.core.dto.BaseObjectDto {
	private SuKienDto suKien;
	private SanPhamDto sanPham;
	public SuKienDto getSuKien() {
		return suKien;
	}
	public void setSuKien(SuKienDto suKien) {
		this.suKien = suKien;
	}
	public SanPhamDto getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}
	public SuKienVaSanPhamDto() {
		super();
	}

	public SuKienVaSanPhamDto(SuKienVaSanPham entity) {
		if (entity != null) {
			this.id = entity.getId();
			if (entity.getSuKien() != null) {
				this.suKien = new SuKienDto(entity.getSuKien(), false);
			}
			if (entity.getSanPham() != null) {
				this.sanPham = new SanPhamDto(entity.getSanPham());
			}
		}
	}

}
