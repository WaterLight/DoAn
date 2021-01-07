package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.globits.core.domain.BaseObject;

public class SanPhamPhieuXuat extends BaseObject{
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;
	@ManyToOne
	@JoinColumn(name="phieu_id")
	private PhieuXuatKho phieu;
	@Column(name = "so_luong")
	private float so_luong;
	
	public SanPham getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPham sanPham) {
		this.sanPham = sanPham;
	}
	public PhieuXuatKho getPhieu() {
		return phieu;
	}
	public void setPhieu(PhieuXuatKho phieu) {
		this.phieu = phieu;
	}
	public float getSo_luong() {
		return so_luong;
	}
	public void setSo_luong(float so_luong) {
		this.so_luong = so_luong;
	}
	
}
