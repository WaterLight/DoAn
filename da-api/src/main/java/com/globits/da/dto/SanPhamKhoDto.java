package com.globits.da.dto;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.globits.da.domain.SanPhamKho;
import com.globits.da.domain.ThuocTinhSanPham;

public class SanPhamKhoDto extends BaseObjectDto{
	private KhoDto kho;
	private SanPhamDto sanPham;
	private Integer soLuong;
	private ThuocTinhSanPhamDto size;
	public KhoDto getKho() {
		return kho;
	}
	public void setKho(KhoDto kho) {
		this.kho = kho;
	}
	public SanPhamDto getSanPham() {
		return sanPham;
	}
	public void setSanPham(SanPhamDto sanPham) {
		this.sanPham = sanPham;
	}
	public float getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}
	
	public ThuocTinhSanPhamDto getSize() {
		return size;
	}
	public void setSize(ThuocTinhSanPhamDto size) {
		this.size = size;
	}
	public SanPhamKhoDto() {
		super();
	}
	public SanPhamKhoDto(SanPhamKho p) {
		if(p != null) {
			this.setId(p.getId());
			this.soLuong = p.getSoLuong();
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho(),false);
			}
			if(p.getSanPham() != null) {
				this.sanPham = new SanPhamDto(p.getSanPham());
			}
			if(p.getSize() != null) {
				this.size = new ThuocTinhSanPhamDto(p.getSize());
			}
		}
	}
	public SanPhamKhoDto(SanPhamKho p,Boolean simple) {
		if(p != null) {
			this.setId(p.getId());
			this.soLuong = p.getSoLuong();
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho(),false);
			}
			if(p.getSanPham() != null) {
				this.sanPham = new SanPhamDto(p.getSanPham(),false);
			}
		}
	}
}
