package com.globits.da.domain;

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
	@Column(name = "giam_gia")
	private Double giamGia;
	@Column(name = "is_show_home")
	private Boolean isShowHome = false;
	@ManyToOne
	@JoinColumn(name="don_vi_tinh_id")
	private DonViTinh donViTinh;
	@Column(name="bai_viet", columnDefinition = "LONGTEXT")
	private String baiViet;
	@OneToMany(mappedBy = "sanPham", cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
	private Set<SanPhamKho> sanPhamKho;
	@Column(name="image_url")
	private String imageUrl;//Đường dẫn đến File ảnh tiêu đề bài báo (nếu có)
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
	public DonViTinh getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(DonViTinh donViTinh) {
		this.donViTinh = donViTinh;
	}
	public String getBaiViet() {
		return baiViet;
	}
	public void setBaiViet(String baiViet) {
		this.baiViet = baiViet;
	}
	public Set<SanPhamKho> getSanPhamKho() {
		return sanPhamKho;
	}
	public void setSanPhamKho(Set<SanPhamKho> sanPhamKho) {
		this.sanPhamKho = sanPhamKho;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public Double getGiamGia() {
		return giamGia;
	}
	public void setGiamGia(Double giamGia) {
		this.giamGia = giamGia;
	}
	public Boolean getIsShowHome() {
		return isShowHome;
	}
	public void setIsShowHome(Boolean isShowHome) {
		this.isShowHome = isShowHome;
	}

	
}
