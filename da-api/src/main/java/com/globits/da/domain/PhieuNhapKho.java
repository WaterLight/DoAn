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
@Table(name = "tbl_phieu_nhap_kho")
public class PhieuNhapKho extends BaseObject{
	@Column(name = "ten")
	private String ten;
	@Column(name = "ma")
	private String ma;
	@ManyToOne
	@JoinColumn(name="nguoi_nhan")
	private NhanVien nguoiNhan;
	@ManyToOne
	@JoinColumn(name="kho_id")
	private Kho kho;
	@Column(name = "ngay_nhap")
	private Date ngayNhap;
	@OneToMany(mappedBy = "phieuNhapKho", cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
	private Set<SanPhamPhieuNhap> sanPhamPhieuNhap;
	
	
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
	public NhanVien getNguoiNhan() {
		return nguoiNhan;
	}
	public void setNguoiNhan(NhanVien nguoiNhan) {
		this.nguoiNhan = nguoiNhan;
	}
	public Kho getKho() {
		return kho;
	}
	public void setKho(Kho kho) {
		this.kho = kho;
	}
	public Date getNgayNhap() {
		return ngayNhap;
	}
	public void setNgayNhap(Date ngayNhap) {
		this.ngayNhap = ngayNhap;
	}
	public Set<SanPhamPhieuNhap> getSanPhamPhieuNhap() {
		return sanPhamPhieuNhap;
	}
	public void setSanPhamPhieuNhap(Set<SanPhamPhieuNhap> sanPhamPhieuNhap) {
		this.sanPhamPhieuNhap = sanPhamPhieuNhap;
	}
	
}
