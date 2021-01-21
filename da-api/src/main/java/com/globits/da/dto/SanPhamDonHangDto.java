package com.globits.da.dto;

import com.globits.da.domain.DonHang;
import com.globits.da.domain.DonViTinh;
import com.globits.da.domain.Kho;
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamDonHang;

public class SanPhamDonHangDto extends BaseObjectDto {
	private SanPhamDto sanPham;
	private DonHangDto donHang;
	private Integer soLuong;
	private Double donGia;
	private Double thanhTien;
	private Double trietKhau;
	private DonViTinhDto donViTinh;
	
	public SanPhamDto getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}
	public DonHangDto getDonHang() {
		return donHang;
	}
	public void setDonHang(DonHangDto donHang) {
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
	public DonViTinhDto getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(DonViTinhDto donViTinh) {
		this.donViTinh = donViTinh;
	}
	
	public SanPhamDonHangDto() {
		super();
	}
	public SanPhamDonHangDto(SanPhamDonHang entity) {
		if(entity != null) {
			this.setId(entity.getId());
			if(entity.getSanPham() != null && entity.getSanPham().getId() != null) {
				this.setSanPham(new SanPhamDto(entity.getSanPham()));
			}
//			if(entity.getDonHang() != null && entity.getDonHang().getId() != null) {
//				this.setDonHang(new DonHangDto(entity.getDonHang()));
//			}
			this.setSoLuong(entity.getSoLuong());
			this.setDonGia(entity.getDonGia());
			this.setThanhTien(entity.getThanhTien());
			this.setTrietKhau(entity.getTrietKhau());
			if(entity.getDonViTinh() != null && entity.getDonViTinh().getId() != null)  {
				this.setDonViTinh(new DonViTinhDto(entity.getDonViTinh()));
			}
		}
	}
}
