package com.globits.da.dto;

import com.globits.da.domain.PhieuXuatKho;
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamPhieuXuat;

public class SanPhamPhieuXuatDto extends BaseObjectDto{
	private SanPhamDto sanPham;
	private PhieuXuatKhoDto phieu;
	private Integer soLuong;
	public SanPhamDto getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}
	public PhieuXuatKhoDto getPhieu() {
		return phieu;
	}
	public void setPhieu(PhieuXuatKhoDto phieu) {
		this.phieu = phieu;
	}
	public Integer getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	public SanPhamPhieuXuatDto() {
		super();
	}
	public SanPhamPhieuXuatDto(SanPhamPhieuXuat p) {
		if(p != null) {
			this.setId(p.getId());
			if(p.getSanPham() != null) {
				this.sanPham = new SanPhamDto(p.getSanPham());
			}
			if(p.getPhieu() != null) {
				this.phieu= new PhieuXuatKhoDto(p.getPhieu(),true);
			}
			this.soLuong = p.getSoLuong();
		}
	}
}
