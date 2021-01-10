package com.globits.da.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.globits.da.domain.PhieuXuatKho;
import com.globits.da.domain.SanPhamPhieuXuat;

public class PhieuXuatKhoDto extends BaseObjectDto{
	private KhoDto kho;
	private String ten;
	private String ma;
	private NhanVienDto nguoiXuat;
	private Date ngayXuat;
	private Set<SanPhamPhieuXuatDto> sanPhamPhieuXuat;
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
	public NhanVienDto getNguoiXuat() {
		return nguoiXuat;
	}
	public void setNguoiXuat(NhanVienDto nguoiXuat) {
		this.nguoiXuat = nguoiXuat;
	}
	public Date getNgayXuat() {
		return ngayXuat;
	}
	public void setNgayXuat(Date ngayXuat) {
		this.ngayXuat = ngayXuat;
	}
	public Set<SanPhamPhieuXuatDto> getSanPhamPhieuXuat() {
		return sanPhamPhieuXuat;
	}
	public void setSanPhamPhieuXuat(Set<SanPhamPhieuXuatDto> sanPhamPhieuXuat) {
		this.sanPhamPhieuXuat = sanPhamPhieuXuat;
	}
	public PhieuXuatKhoDto() {
		super();
	}
	public PhieuXuatKhoDto(PhieuXuatKho p) {
		if(p != null) {
			this.setId(p.getId());
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho());
			}
			
			this.ten = p.getTen();
			this.ma = p.getMa();
			if(p.getNguoiXuat() != null) {
				this.nguoiXuat = new NhanVienDto(p.getNguoiXuat());
			}
			this.ngayXuat = p.getNgayXuat();
			if (p.getSanPhamPhieuXuat()!= null) {
				this.sanPhamPhieuXuat = new HashSet<SanPhamPhieuXuatDto>();
				for (SanPhamPhieuXuat sanPhamPhieuXuatDto : p.getSanPhamPhieuXuat()) {
					this.sanPhamPhieuXuat.add(new SanPhamPhieuXuatDto(sanPhamPhieuXuatDto));
				}
			}
		}
	}
	public PhieuXuatKhoDto(PhieuXuatKho p,Boolean isCheck) {
		if(p != null) {
			this.setId(p.getId());
			if(p.getKho() != null) {
				this.kho = new KhoDto(p.getKho());
			}
			
			this.ten = p.getTen();
			this.ma = p.getMa();
			if(p.getNguoiXuat() != null) {
				this.nguoiXuat = new NhanVienDto(p.getNguoiXuat());
			}
		}
	}
}
