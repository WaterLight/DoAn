package com.globits.da.dto;

import java.util.UUID;

import com.globits.da.domain.SanPham;
import com.globits.da.domain.ThuocTinhSanPham;

public class SanPhamSizeDto extends BaseObjectDto {
	private UUID idSP;
	private String tenSP;
	private ThuocTinhSanPhamDto size;
	private Long soLuong;

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

	public SanPhamSizeDto() {

	}

	public SanPhamSizeDto(UUID idSP, String tenSP, ThuocTinhSanPham size, Long soLuong) {
		this.idSP = idSP;
		this.tenSP = tenSP;
		if(size != null) {
			this.size = new ThuocTinhSanPhamDto(size);
		}
		this.soLuong = soLuong;
	}
	
}
