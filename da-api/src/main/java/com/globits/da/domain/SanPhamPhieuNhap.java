package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;
@Entity
@Table(name = "tbl_sp_phieu_nhap_kho")
public class SanPhamPhieuNhap extends BaseObject{
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;
	@ManyToOne
	@JoinColumn(name="kho_id")
	private Kho kho;
	@ManyToOne
	@JoinColumn(name="phieu_id")
	private PhieuXuatKho phieu;
	@Column(name = "so_luong")
	private float so_luong;
	@Column(name = "gia")
	private float gia;
	@ManyToOne
	@JoinColumn(name="phieu_nhap_kho_id")
	private PhieuNhapKho phieuNhapKho;
	
	public SanPham getSanPham() {
		return sanPham;
	}
	public PhieuNhapKho getPhieuNhapKho() {
		return phieuNhapKho;
	}
	public void setPhieuNhapKho(PhieuNhapKho phieuNhapKho) {
		this.phieuNhapKho = phieuNhapKho;
	}
	public void setSanPham(SanPham sanPham) {
		this.sanPham = sanPham;
	}
	public Kho getKho() {
		return kho;
	}
	public void setKho(Kho kho) {
		this.kho = kho;
	}
	public float getSo_luong() {
		return so_luong;
	}
	public void setSo_luong(float so_luong) {
		this.so_luong = so_luong;
	}
	public float getGia() {
		return gia;
	}
	public void setGia(float gia) {
		this.gia = gia;
	}
	public PhieuXuatKho getPhieu() {
		return phieu;
	}
	public void setPhieu(PhieuXuatKho phieu) {
		this.phieu = phieu;
	}
	
}
