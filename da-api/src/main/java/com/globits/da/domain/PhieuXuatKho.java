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
@Table(name = "tbl_phieu_xuat_kho")
public class PhieuXuatKho extends BaseObject{
	@ManyToOne
	@JoinColumn(name="kho_id")
	private Kho kho;
	@Column(name = "ten")
	private String ten;
	@Column(name = "ma")
	private String ma;
	@ManyToOne
	@JoinColumn(name="nguoi_xuat")
	private NhanVien nguoiXuat;
	@Column(name = "ngay_xuat")
	private Date ngayXuat;
	@OneToMany(mappedBy = "phieu", cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
	private Set<SanPhamPhieuXuat> sanPhamPhieuXuat;
	public Kho getKho() {
		return kho;
	}
	public void setKho(Kho kho) {
		this.kho = kho;
	}
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
	public NhanVien getNguoiXuat() {
		return nguoiXuat;
	}
	public void setNguoiXuat(NhanVien nguoiXuat) {
		this.nguoiXuat = nguoiXuat;
	}
	public Date getNgayXuat() {
		return ngayXuat;
	}
	public void setNgayXuat(Date ngayXuat) {
		this.ngayXuat = ngayXuat;
	}
	public Set<SanPhamPhieuXuat> getSanPhamPhieuXuat() {
		return sanPhamPhieuXuat;
	}
	public void setSanPhamPhieuXuat(Set<SanPhamPhieuXuat> sanPhamPhieuXuat) {
		this.sanPhamPhieuXuat = sanPhamPhieuXuat;
	}
	
}
