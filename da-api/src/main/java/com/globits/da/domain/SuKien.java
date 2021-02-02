package com.globits.da.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_su_kien")
public class SuKien extends BaseObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "tieu_de")
	private String tieuDe;
	@Column(name = "tieu_de_phu")
	private String tieuDePhu;
	@Column(name = "tom_tat")
	private String tomTat;
	@Column(name = "ngay_bat_dau")
	private Date ngayBatDau;
	@Column(name = "ngay_ket_thuc")
	private Date ngayKetThuc;
	@Column(name = "noi_dung", columnDefinition = "LONGTEXT")
	private String noiDung;
	@Column(name = "phan_tram_giam_gia")
	private Double phanTramGiamGia;
	@Column(name = "tien_giam_gia")
	private Double tienGiamGia;
	@Column(name="image_thumbnail_url")
	private String imageThumbnailUrl;//Đường dẫn đến File ảnh thumbnail (nếu có)
	@Column(name="image_banner_url")
	private String imageBannerUrl;//Đường dẫn đến File ảnh thumbnail (nếu có)
	@Column(name="is_active")
	private Boolean isActive=false;
	@OneToMany(mappedBy = "sanPham", cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
	@NotFound(action = NotFoundAction.IGNORE)
	private Set<SuKienVaSanPham> sanPham;
	
	@OneToMany(mappedBy = "danhMucSanPham", cascade=CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
	@NotFound(action = NotFoundAction.IGNORE)
	private Set<SuKienVaDanhMucSanPham> danhMucSanPham;

	public String getTieuDe() {
		return tieuDe;
	}

	public void setTieuDe(String tieuDe) {
		this.tieuDe = tieuDe;
	}

	public String getTieuDePhu() {
		return tieuDePhu;
	}

	public void setTieuDePhu(String tieuDePhu) {
		this.tieuDePhu = tieuDePhu;
	}

	public String getTomTat() {
		return tomTat;
	}

	public void setTomTat(String tomTat) {
		this.tomTat = tomTat;
	}

	public Date getNgayBatDau() {
		return ngayBatDau;
	}

	public void setNgayBatDau(Date ngayBatDau) {
		this.ngayBatDau = ngayBatDau;
	}

	public Date getNgayKetThuc() {
		return ngayKetThuc;
	}

	public void setNgayKetThuc(Date ngayKetThuc) {
		this.ngayKetThuc = ngayKetThuc;
	}

	public String getNoiDung() {
		return noiDung;
	}

	public void setNoiDung(String noiDung) {
		this.noiDung = noiDung;
	}

	public Double getPhanTramGiamGia() {
		return phanTramGiamGia;
	}

	public void setPhanTramGiamGia(Double phanTramGiamGia) {
		this.phanTramGiamGia = phanTramGiamGia;
	}

	public Double getTienGiamGia() {
		return tienGiamGia;
	}

	public void setTienGiamGia(Double tienGiamGia) {
		this.tienGiamGia = tienGiamGia;
	}

	public Set<SuKienVaSanPham> getSanPham() {
		return sanPham;
	}

	public void setSanPham(Set<SuKienVaSanPham> sanPham) {
		this.sanPham = sanPham;
	}

	public Set<SuKienVaDanhMucSanPham> getDanhMucSanPham() {
		return danhMucSanPham;
	}

	public void setDanhMucSanPham(Set<SuKienVaDanhMucSanPham> danhMucSanPham) {
		this.danhMucSanPham = danhMucSanPham;
	}

	public String getImageThumbnailUrl() {
		return imageThumbnailUrl;
	}

	public void setImageThumbnailUrl(String imageThumbnailUrl) {
		this.imageThumbnailUrl = imageThumbnailUrl;
	}
	

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public String getImageBannerUrl() {
		return imageBannerUrl;
	}

	public void setImageBannerUrl(String imageBannerUrl) {
		this.imageBannerUrl = imageBannerUrl;
	}

	public SuKien() {
		super();
	}
	
}
