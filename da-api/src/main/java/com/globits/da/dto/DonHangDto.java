package com.globits.da.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.globits.da.domain.DonHang;
import com.globits.da.domain.Kho;
import com.globits.da.domain.NhanVien;
import com.globits.da.domain.SanPhamDonHang;

public class DonHangDto extends BaseObjectDto {
	private String ten;
	private String ma;
	private Date ngayDatHang;
	private Date ngayGiaoHang;
	private Double tongGia;
	private Double giamGia;
	private Double thanhTien;
	private Integer trangThai;
	private String ghiChu;
	private NhanVienDto nguoiBan;
	private Set<SanPhamDonHangDto> sanPhamDonHang;
	private Integer paymentType;// hình thức thanh toán, 1: thanh toán qua ngân hàng, 2: thanh toán khi nhận hàng
	
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
	public String getGhiChu() {
		return ghiChu;
	}
	public void setGhiChu(String ghiChu) {
		this.ghiChu = ghiChu;
	}
	public NhanVienDto getNguoiBan() {
		return nguoiBan;
	}
	public void setNguoiBan(NhanVienDto nguoiBan) {
		this.nguoiBan = nguoiBan;
	}
	
	public Set<SanPhamDonHangDto> getSanPhamDonHang() {
		return sanPhamDonHang;
	}
	public void setSanPhamDonHang(Set<SanPhamDonHangDto> sanPhamDonHang) {
		this.sanPhamDonHang = sanPhamDonHang;
	}
	
	public Integer getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
	}
	public DonHangDto() {
		super();
	}
	public DonHangDto(DonHang entity) {
		if(entity != null) {
			this.setId(entity.getId());
			this.setTen(entity.getTen());
			this.setMa(entity.getMa());
			this.setNgayDatHang(entity.getNgayDatHang());
			this.setNgayGiaoHang(entity.getNgayGiaoHang());
			this.setTongGia(entity.getTongGia());
			this.setGiamGia(entity.getGiamGia());
			this.setThanhTien(entity.getThanhTien());
			this.setTrangThai(entity.getTrangThai());
			this.setGhiChu(entity.getGhiChu());
			this.setPaymentType(entity.getPaymentType());
			if(entity.getNguoiBan() != null && entity.getNguoiBan().getId() != null) {
				this.setNguoiBan(new NhanVienDto(entity.getNguoiBan()));
			}
			if(entity.getSanPhamDonHang() != null && entity.getSanPhamDonHang().size() > 0) {
				this.sanPhamDonHang = new HashSet<SanPhamDonHangDto>();
				for (SanPhamDonHang spdh : entity.getSanPhamDonHang()) {
					if(spdh != null && spdh.getId() != null) {
						this.sanPhamDonHang.add(new SanPhamDonHangDto(spdh));
					}
				}
			}
		}
	}
}
