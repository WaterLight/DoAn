package com.globits.da.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_san_pham_size")
public class SanPhamSize extends BaseObject{
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;
	
	@ManyToOne
	@JoinColumn(name="size_id")
	private ThuocTinhSanPham size;
	
	public SanPham getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPham sanPham) {
		this.sanPham = sanPham;
	}
	public ThuocTinhSanPham getSize() {
		return size;
	}
	public void setSize(ThuocTinhSanPham size) {
		this.size = size;
	}
	
}
