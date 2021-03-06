package com.globits.da.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_san_pham_kho")
public class SanPhamKho extends BaseObject{
	@ManyToOne
	@JoinColumn(name="kho_id")
	private Kho kho;
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;
	@JoinColumn(name="so_luong")
	private Integer soLuong;
	@ManyToOne
	@JoinColumn(name="size_id")
	private ThuocTinhSanPham size;
	public Kho getKho() {
		return kho;
	}
	public void setKho(Kho kho) {
		this.kho = kho;
	}
	public SanPham getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPham sanPham) {
		this.sanPham = sanPham;
	}
	public Integer getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	public ThuocTinhSanPham getSize() {
		return size;
	}
	public void setSize(ThuocTinhSanPham size) {
		this.size = size;
	}
	
}
