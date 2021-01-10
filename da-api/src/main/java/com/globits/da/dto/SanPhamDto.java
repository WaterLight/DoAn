package com.globits.da.dto;

import java.util.Date;

import com.globits.da.domain.SanPham;

public class SanPhamDto extends BaseObjectDto{
	private String tenSP;
	private String maSP;
	private Double giaBanHienThoi;
	private Date ngayCapNhat;
	private Date ngayTao;
	private NhanVienDto nguoiTao;
	private NhanVienDto nguoiCapNhat;
	private DonViTinhDto donViTinh;
	public String getTenSP() {
		return tenSP;
	}
	public void setTenSP(String tenSP) {
		this.tenSP = tenSP;
	}
	public String getMaSP() {
		return maSP;
	}
	public void setMaSP(String maSP) {
		this.maSP = maSP;
	}
	public Double getGiaBanHienThoi() {
		return giaBanHienThoi;
	}
	public void setGiaBanHienThoi(Double giaBanHienThoi) {
		this.giaBanHienThoi = giaBanHienThoi;
	}
	public Date getNgayCapNhat() {
		return ngayCapNhat;
	}
	public void setNgayCapNhat(Date ngayCapNhat) {
		this.ngayCapNhat = ngayCapNhat;
	}
	public Date getNgayTao() {
		return ngayTao;
	}
	public void setNgayTao(Date ngayTao) {
		this.ngayTao = ngayTao;
	}
	public NhanVienDto getNguoiTao() {
		return nguoiTao;
	}
	public void setNguoiTao(NhanVienDto nguoiTao) {
		this.nguoiTao = nguoiTao;
	}
	public NhanVienDto getNguoiCapNhat() {
		return nguoiCapNhat;
	}
	public void setNguoiCapNhat(NhanVienDto nguoiCapNhat) {
		this.nguoiCapNhat = nguoiCapNhat;
	}
	public DonViTinhDto getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(DonViTinhDto donViTinh) {
		this.donViTinh = donViTinh;
	}
	public SanPhamDto() {
		super();
	}
	public SanPhamDto(SanPham e) {
		this.setId(e.getId());
		this.maSP = e.getMaSP();
		this.giaBanHienThoi = e.getGiaBanHienThoi();
		this.ngayCapNhat = e.getNgayCapNhat();
		this.ngayTao = e.getNgayTao();
		this.tenSP = e.getTenSP();
		if(e.getNguoiTao() != null) {
			this.nguoiTao = new NhanVienDto(e.getNguoiTao());
		}
		if(e.getNguoiCapNhat() != null) {
			this.nguoiCapNhat = new NhanVienDto(e.getNguoiCapNhat());
		}
		if(e.getDonViTinh() != null) {
			this.donViTinh = new DonViTinhDto(e.getDonViTinh());
		}
	}
	public SanPhamDto(SanPham e,Boolean simple) {
		this.setId(e.getId());
		this.maSP = e.getMaSP();
		this.giaBanHienThoi = e.getGiaBanHienThoi();
		this.ngayCapNhat = e.getNgayCapNhat();
		this.ngayTao = e.getNgayTao();
		this.tenSP = e.getTenSP();
		if(e.getNguoiTao() != null) {
			this.nguoiTao = new NhanVienDto(e.getNguoiTao());
		}
		if(e.getNguoiCapNhat() != null) {
			this.nguoiCapNhat = new NhanVienDto(e.getNguoiCapNhat());
		}
		if(e.getDonViTinh() != null) {
			this.donViTinh = new DonViTinhDto(e.getDonViTinh());
		}
	}
}
