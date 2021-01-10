package com.globits.da.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.globits.da.domain.PhieuNhapKho;
import com.globits.da.domain.SanPhamPhieuNhap;

public class PhieuNhapKhoDto extends BaseObjectDto{
	private KhoDto kho;
	private String ten;
	private String ma;
	private NhanVienDto nguoiNhap;
	private Date ngayNhap;
	private Set<SanPhamPhieuNhapKhoDto> sanPhamPhieuNhap;
	public KhoDto getKho() {
		return kho;
	}
	public void setKho(KhoDto kho) {
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
	public NhanVienDto getNguoiNhap() {
		return nguoiNhap;
	}
	public void setNguoiNhap(NhanVienDto nguoiNhap) {
		this.nguoiNhap = nguoiNhap;
	}
	public Date getNgayNhap() {
		return ngayNhap;
	}
	public void setNgayNhap(Date ngayNhap) {
		this.ngayNhap = ngayNhap;
	}
	public Set<SanPhamPhieuNhapKhoDto> getSanPhamPhieuNhap() {
		return sanPhamPhieuNhap;
	}
	public void setSanPhamPhieuNhap(Set<SanPhamPhieuNhapKhoDto> sanPhamPhieuNhap) {
		this.sanPhamPhieuNhap = sanPhamPhieuNhap;
	}
	public PhieuNhapKhoDto() {
		super();
	}
	public PhieuNhapKhoDto(PhieuNhapKho p) {
		if(p != null) {
			this.setId(p.getId());
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho());
			}
			
			this.ten = p.getTen();
			this.ma = p.getMa();
			if(p.getNguoiNhan() != null) {
				this.nguoiNhap = new NhanVienDto(p.getNguoiNhan());
			}
			this.ngayNhap = p.getNgayNhap();
			if (p.getSanPhamPhieuNhap() != null) {
				this.sanPhamPhieuNhap = new HashSet<SanPhamPhieuNhapKhoDto>();
				for (SanPhamPhieuNhap sanPhamPhieuNhapDto : p.getSanPhamPhieuNhap()) {
					this.sanPhamPhieuNhap.add(new SanPhamPhieuNhapKhoDto(sanPhamPhieuNhapDto));
				}
			}
		}
	}
	public PhieuNhapKhoDto(PhieuNhapKho p,Boolean isCheck) {
		if(p != null) {
			this.setId(p.getId());
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho());
			}
			
			this.ten = p.getTen();
			this.ma = p.getMa();
			if(p.getNguoiNhan() != null) {
				this.nguoiNhap = new NhanVienDto(p.getNguoiNhan());
			}
			this.ngayNhap = p.getNgayNhap();
		}
	}
}
