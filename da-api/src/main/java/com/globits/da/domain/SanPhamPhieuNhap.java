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
	@Column(name = "so_luong")
	private Float soLuong;
	@Column(name = "gia")
	private Double gia;
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
	public Float getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Float soLuong) {
		this.soLuong = soLuong;
	}
	public Double getGia() {
		return gia;
	}
	public void setGia(Double gia) {
		this.gia = gia;
	}
	
}
