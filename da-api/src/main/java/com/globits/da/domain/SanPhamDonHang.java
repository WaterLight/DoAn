package com.globits.da.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_san_pham_don_hang")
public class SanPhamDonHang extends BaseObject{
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;
	@ManyToOne
	@JoinColumn(name="don_hang_id")
	private DonHang donHang;
	@Column(name = "so_luong")
	private Integer soLuong;
	@Column(name = "don_gia")
	private Double donGia;
	@Column(name = "thanh_tien")
	private Double thanhTien;
	@Column(name = "triet_khau")
	private Double trietKhau;
	@ManyToOne
	@JoinColumn(name="don_vi_tinh_id")
	private DonViTinh donViTinh;
	@ManyToOne
	@JoinColumn(name="size_id")
	private ThuocTinhSanPham size;
	
	public SanPham getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPham sanPham) {
		this.sanPham = sanPham;
	}
	public DonHang getDonHang() {
		return donHang;
	}
	public void setDonHang(DonHang donHang) {
		this.donHang = donHang;
	}
	public Integer getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	public Double getDonGia() {
		return donGia;
	}
	public void setDonGia(Double donGia) {
		this.donGia = donGia;
	}
	public Double getThanhTien() {
		return thanhTien;
	}
	public void setThanhTien(Double thanhTien) {
		this.thanhTien = thanhTien;
	}
	public Double getTrietKhau() {
		return trietKhau;
	}
	public void setTrietKhau(Double trietKhau) {
		this.trietKhau = trietKhau;
	}
	public DonViTinh getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(DonViTinh donViTinh) {
		this.donViTinh = donViTinh;
	}
	public ThuocTinhSanPham getSize() {
		return size;
	}
	public void setSize(ThuocTinhSanPham size) {
		this.size = size;
	}
}
