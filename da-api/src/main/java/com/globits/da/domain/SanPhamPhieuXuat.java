package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;
@Entity
@Table(name = "tbl_sp_phieu_xuat_kho")
public class SanPhamPhieuXuat extends BaseObject{
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;
	@ManyToOne
	@JoinColumn(name="phieu_id")
	private PhieuXuatKho phieu;
	@Column(name = "soLuong")
	private Integer soLuong;
	@ManyToOne
	@JoinColumn(name="size_id")
	private ThuocTinhSanPham size;
	
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
	public Integer getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	public ThuocTinhSanPham getSize() {
		return size;
	}
	public void setSize(ThuocTinhSanPham size) {
		this.size = size;
	}
}
