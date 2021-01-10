package com.globits.da.dto;

import com.globits.da.domain.Kho;
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamKho;

public class SanPhamKhoDto extends BaseObjectDto{
	private KhoDto kho;
	private SanPhamDto sanPham;
	private float soLuong;
	public KhoDto getKho() {
		return kho;
	}
	public void setKho(KhoDto kho) {
		this.kho = kho;
	}
	public SanPhamDto getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}
	public float getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(float soLuong) {
		this.soLuong = soLuong;
	}
	public SanPhamKhoDto() {
		super();
	}
	public SanPhamKhoDto(SanPhamKho p) {
		if(p != null) {
			this.setId(p.getId());
			this.soLuong = p.getSoLuong();
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho(),false);
			}
			if(p.getSanPham() != null) {
				this.sanPham = new SanPhamDto(p.getSanPham(),false);
			}
		}
	}
}
