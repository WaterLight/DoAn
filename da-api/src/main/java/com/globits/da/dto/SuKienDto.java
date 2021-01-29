package com.globits.da.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.globits.da.domain.SuKien;
import com.globits.da.domain.SuKienVaDanhMucSanPham;
import com.globits.da.domain.SuKienVaSanPham;

public class SuKienDto extends BaseObjectDto {
	
	private String tieuDe;
	private String tieuDePhu;
	private String tomTat;
	private Date ngayBatDau;
	private Date ngayKetThuc;
	private String noiDung;
	private Double phanTramGiamGia;
	private Double tienGiamGia;
	private String imageThumbnailUrl;//Đường dẫn đến File ảnh thumbnail (nếu có)
	private String imageBannerUrl;//Đường dẫn đến File ảnh thumbnail (nếu có)
	private Set<SuKienVaSanPhamDto> sanPham;
	private Set<SuKienVaDanhMucSanPhamDto> danhMucSanPham;

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

	public String getImageThumbnailUrl() {
		return imageThumbnailUrl;
	}

	public void setImageThumbnailUrl(String imageThumbnailUrl) {
		this.imageThumbnailUrl = imageThumbnailUrl;
	}

	public String getImageBannerUrl() {
		return imageBannerUrl;
	}

	public void setImageBannerUrl(String imageBannerUrl) {
		this.imageBannerUrl = imageBannerUrl;
	}

	public Set<SuKienVaSanPhamDto> getSanPham() {
		return sanPham;
	}

	public void setSanPham(Set<SuKienVaSanPhamDto> sanPham) {
		this.sanPham = sanPham;
	}

	public Set<SuKienVaDanhMucSanPhamDto> getDanhMucSanPham() {
		return danhMucSanPham;
	}

	public void setDanhMucSanPham(Set<SuKienVaDanhMucSanPhamDto> danhMucSanPham) {
		this.danhMucSanPham = danhMucSanPham;
	}

	public SuKienDto() {
		super();
	}

	public SuKienDto(SuKien entity) {
		if (entity != null) {
			this.tieuDe = entity.getTieuDe();
			this.tieuDePhu = entity.getTieuDePhu();
			this.tomTat = entity.getTomTat();
			this.ngayBatDau = entity.getNgayBatDau();
			this.ngayKetThuc = entity.getNgayKetThuc();
			this.noiDung = entity.getNoiDung();
			this.phanTramGiamGia = entity.getPhanTramGiamGia();
			this.tienGiamGia = entity.getTienGiamGia();
			this.imageThumbnailUrl = entity.getImageThumbnailUrl();
			this.imageBannerUrl = entity.getImageBannerUrl();
			
			if (entity.getSanPham() != null && entity.getSanPham().size() > 0) {
				this.sanPham = new HashSet<SuKienVaSanPhamDto>();
				for (SuKienVaSanPham suKienVaSanPham : entity.getSanPham()) {
					SuKienVaSanPhamDto dto = new SuKienVaSanPhamDto(suKienVaSanPham);
					
					this.sanPham.add(dto);
				}
			}
			if (entity.getDanhMucSanPham() != null && entity.getDanhMucSanPham().size() > 0) {
				this.danhMucSanPham = new HashSet<SuKienVaDanhMucSanPhamDto>();
				for (SuKienVaDanhMucSanPham suKienVaDanhMucSanPham : entity.getDanhMucSanPham()) {
					SuKienVaDanhMucSanPhamDto dto = new SuKienVaDanhMucSanPhamDto(suKienVaDanhMucSanPham);
					
					this.danhMucSanPham.add(dto);
				}
			}
		}
	}

	public SuKienDto(SuKien entity, boolean simple) {
		if (entity != null) {
			this.tieuDe = entity.getTieuDe();
			this.tieuDePhu = entity.getTieuDePhu();
			this.tomTat = entity.getTomTat();
			this.ngayBatDau = entity.getNgayBatDau();
			this.ngayKetThuc = entity.getNgayKetThuc();
			this.noiDung = entity.getNoiDung();
			this.phanTramGiamGia = entity.getPhanTramGiamGia();
			this.tienGiamGia = entity.getTienGiamGia();
			this.imageThumbnailUrl = entity.getImageThumbnailUrl();
			this.imageBannerUrl = entity.getImageBannerUrl();
		}
	}

}
