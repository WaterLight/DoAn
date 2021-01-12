package com.globits.da.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;
@Entity
@Table(name = "tbl_don_hang")
public class DonHang extends BaseObject{
	@Column(name = "ten")
	private String ten;
	@Column(name = "ma")
	private String ma;
	@Column(name = "ngay_dat_hang")
	private Date ngayDatHang;
	@Column(name = "ngay_giao_hang")
	private Date ngayGiaoHang;
	@Column(name = "tong_gia")
	private Double tongGia;
	@Column(name = "giam_gia")
	private Double giamGia;
	@Column(name = "thanh_tien")
	private Double thanhTien;
	@Column(name = "trang_thai")
	private Integer trangThai;
	@ManyToOne
	@JoinColumn(name="nguoi_ban")
	private NhanVien nguoiBan;
	@Column(name = "ghi_chu")
	private String ghiChu;
	public String getTen() {
		return ten;
	}
	public void setTen(String ten) {
		this.ten = ten;
	}
	public String getMa() {
		return ma;
	}
	public void setMa(String ma) {
		this.ma = ma;
	}
	public Date getNgayDatHang() {
		return ngayDatHang;
	}
	public void setNgayDatHang(Date ngayDatHang) {
		this.ngayDatHang = ngayDatHang;
	}
	public Date getNgayGiaoHang() {
		return ngayGiaoHang;
	}
	public void setNgayGiaoHang(Date ngayGiaoHang) {
		this.ngayGiaoHang = ngayGiaoHang;
	}
	public Double getTongGia() {
		return tongGia;
	}
	public void setTongGia(Double tongGia) {
		this.tongGia = tongGia;
	}
	public Double getGiamGia() {
		return giamGia;
	}
	public void setGiamGia(Double giamGia) {
		this.giamGia = giamGia;
	}
	public Double getThanhTien() {
		return thanhTien;
	}
	public void setThanhTien(Double thanhTien) {
		this.thanhTien = thanhTien;
	}
	public Integer getTrangThai() {
		return trangThai;
	}
	public void setTrangThai(Integer trangThai) {
		this.trangThai = trangThai;
	}
	public NhanVien getNguoiBan() {
		return nguoiBan;
	}
	public void setNguoiBan(NhanVien nguoiBan) {
		this.nguoiBan = nguoiBan;
	}
	public String getGhiChu() {
		return ghiChu;
	}
	public void setGhiChu(String ghiChu) {
		this.ghiChu = ghiChu;
	}
	

}
