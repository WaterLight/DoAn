package com.globits.da.dto;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;
import com.globits.da.domain.SanPhamSize;

public class SanPhamSizesDto extends BaseObject {
	private SanPhamDto sanPham;
	private ThuocTinhSanPhamDto size;

	public SanPhamDto getSanPham() {
		return sanPham;
	}

	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}

	public ThuocTinhSanPhamDto getSize() {
		return size;
	}

	public void setSize(ThuocTinhSanPhamDto size) {
		this.size = size;
	}

	public SanPhamSizesDto() {
		super();
	}

	public SanPhamSizesDto(SanPhamSize entity) {
		super();
		if (entity != null) {
			this.setId(entity.getId());
			if (entity.getSize() != null) {
				this.size = new ThuocTinhSanPhamDto(entity.getSize());
			}
			if (entity.getSanPham() != null) {
				this.sanPham = new SanPhamDto(entity.getSanPham());
			}
		}

	}

}
