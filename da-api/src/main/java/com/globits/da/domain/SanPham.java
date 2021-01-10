package com.globits.da.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;
@Entity
@Table(name = "tbl_san_pham")
public class SanPham extends BaseObject{
	@Column(name = "ten_san_pham")
	private String tenSP;
	@Column(name = "ma_san_pham")
	private String maSP;
	@Column(name = "gia_ban_hien_Thoi")
	private Double giaBanHienThoi;
	@Column(name = "ngay_cap_nhat")
	private Date ngayCapNhat;
	@Column(name = "ngay_tao")
	private Date ngayTao;
	@ManyToOne
	@JoinColumn(name="nguoi_tao")
	private NhanVien nguoiTao;
	@ManyToOne
	@JoinColumn(name="nguoi_cap_nhat")
	private NhanVien nguoiCapNhat;
	
	@ManyToOne
	@JoinColumn(name="don_vi_tinh_id")
	private DonViTinh donViTinh;
	
//	@OneToMany(mappedBy = "phieu", cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
//	private Set<SanPhamPhieuXuat> sanPhamPhieuXuat;
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
	public NhanVien getNguoiTao() {
		return nguoiTao;
	}
	public void setNguoiTao(NhanVien nguoiTao) {
		this.nguoiTao = nguoiTao;
	}
	public NhanVien getNguoiCapNhat() {
		return nguoiCapNhat;
	}
	public void setNguoiCapNhat(NhanVien nguoiCapNhat) {
		this.nguoiCapNhat = nguoiCapNhat;
	}
	public DonViTinh getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(DonViTinh donViTinh) {
		this.donViTinh = donViTinh;
	}

	
}
