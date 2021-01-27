package com.globits.da.dto;

import javax.persistence.Column;

import com.globits.da.domain.SanPhamPhieuNhap;

public class SanPhamPhieuNhapKhoDto extends BaseObjectDto{
	private SanPhamDto sanPham;
	private KhoDto kho;
	private Integer soLuong;
	private Double gia;
	private Double chietKhau;
	private Double thanhTien;
	private PhieuNhapKhoDto phieuNhapKho;
	private ThuocTinhSanPhamDto size;
	
	public SanPhamDto getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}
	public KhoDto getKho() {
		return kho;
	}
	public void setKho(KhoDto kho) {
		this.kho = kho;
	}
	public Integer getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	public Double getGia() {
		return gia;
	}
	public void setGia(Double gia) {
		this.gia = gia;
	}
	public PhieuNhapKhoDto getPhieuNhapKho() {
		return phieuNhapKho;
	}
	public void setPhieuNhapKho(PhieuNhapKhoDto phieuNhapKho) {
		this.phieuNhapKho = phieuNhapKho;
	}
	
	public Double getChietKhau() {
		return chietKhau;
	}
	public void setChietKhau(Double chietKhau) {
		this.chietKhau = chietKhau;
	}
	public Double getThanhTien() {
		return thanhTien;
	}
	public void setThanhTien(Double thanhTien) {
		this.thanhTien = thanhTien;
	}
	public ThuocTinhSanPhamDto getSize() {
		return size;
	}
	public void setSize(ThuocTinhSanPhamDto size) {
		this.size = size;
	}
	public SanPhamPhieuNhapKhoDto() {
		super();
	}
	public SanPhamPhieuNhapKhoDto(SanPhamPhieuNhap p) {
		if(p != null) {
			this.setId(p.getId());
			if(p.getSanPham() != null) {
				this.sanPham = new SanPhamDto(p.getSanPham());
			}
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho());
			}
			if(p.getPhieuNhapKho() != null) {
				this.phieuNhapKho = new PhieuNhapKhoDto(p.getPhieuNhapKho(),true);
			}
			if(p.getSize() != null) {
				this.size = new ThuocTinhSanPhamDto(p.getSize());
			}
			this.chietKhau = p.getChietKhau();
			this.thanhTien = p.getThanhTien();
			this.soLuong = p.getSoLuong();
			this.gia = p.getGia();
		}
	}
}
