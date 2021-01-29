package com.globits.da.dto;

import java.util.UUID;

import com.globits.da.domain.SanPham;
import com.globits.da.domain.ThuocTinhSanPham;

public class SanPhamSizeDto extends BaseObjectDto {
	private UUID idSP;
	private String tenSP;
	private String imageUrl;
	private ThuocTinhSanPhamDto size;
	private Long soLuong;
	private Double giaBanHienThoi;

	public UUID getIdSP() {
		return idSP;
	}

	public void setIdSP(UUID idSP) {
		this.idSP = idSP;
	}

	public String getTenSP() {
		return tenSP;
	}

	public void setTenSP(String tenSP) {
		this.tenSP = tenSP;
	}

	public ThuocTinhSanPhamDto getSize() {
		return size;
	}

	public void setSize(ThuocTinhSanPhamDto size) {
		this.size = size;
	}

	public Long getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(Long soLuong) {
		this.soLuong = soLuong;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Double getGia() {
		return giaBanHienThoi;
	}

	public void setGia(Double giaBanHienThoi) {
		this.giaBanHienThoi = giaBanHienThoi;
	}

	public SanPhamSizeDto() {
		super();
	}

	public SanPhamSizeDto(UUID idSP, String tenSP, String imageUrl, Double giaBanHienThoi, ThuocTinhSanPham size, Long soLuong) {
		this.idSP = idSP;
		this.tenSP = tenSP;
		this.imageUrl = imageUrl;
		this.giaBanHienThoi = giaBanHienThoi;
		if(size != null) {
			this.size = new ThuocTinhSanPhamDto(size);
		}
		this.soLuong = soLuong;
	}
	
}
