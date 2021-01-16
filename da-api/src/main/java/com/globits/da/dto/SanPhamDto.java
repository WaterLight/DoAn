package com.globits.da.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamKho;

public class SanPhamDto extends BaseObjectDto{
	private String tenSP;
	private String maSP;
	private Double giaBanHienThoi;
	private Date ngayCapNhat;
	private Date ngayTao;
	private NhanVienDto nguoiTao;
	private NhanVienDto nguoiCapNhat;
	private DonViTinhDto donViTinh;
	private String baiViet;
	private Integer soLuongDangCo;
	private Set<SanPhamKhoDto> sanPhamKho;
	public String getTenSP() {
		return tenSP;
	}
	public void setTenSP(String tenSP) {
		this.tenSP = tenSP;
	}
	public String getMaSP() {
		return maSP;
	}
	public void setMaSP(String maSP) {
		this.maSP = maSP;
	}
	public Double getGiaBanHienThoi() {
		return giaBanHienThoi;
	}
	public void setGiaBanHienThoi(Double giaBanHienThoi) {
		this.giaBanHienThoi = giaBanHienThoi;
	}
	public Date getNgayCapNhat() {
		return ngayCapNhat;
	}
	public void setNgayCapNhat(Date ngayCapNhat) {
		this.ngayCapNhat = ngayCapNhat;
	}
	public Date getNgayTao() {
		return ngayTao;
	}
	public void setNgayTao(Date ngayTao) {
		this.ngayTao = ngayTao;
	}
	public NhanVienDto getNguoiTao() {
		return nguoiTao;
	}
	public void setNguoiTao(NhanVienDto nguoiTao) {
		this.nguoiTao = nguoiTao;
	}
	public NhanVienDto getNguoiCapNhat() {
		return nguoiCapNhat;
	}
	public void setNguoiCapNhat(NhanVienDto nguoiCapNhat) {
		this.nguoiCapNhat = nguoiCapNhat;
	}
	public DonViTinhDto getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(DonViTinhDto donViTinh) {
		this.donViTinh = donViTinh;
	}
	public String getBaiViet() {
		return baiViet;
	}
	public void setBaiViet(String baiViet) {
		this.baiViet = baiViet;
	}
	public Set<SanPhamKhoDto> getSanPhamKho() {
		return sanPhamKho;
	}
	public void setSanPhamKho(Set<SanPhamKhoDto> sanPhamKho) {
		this.sanPhamKho = sanPhamKho;
	}
	public Integer getSoLuongDangCo() {
		return soLuongDangCo;
	}
	public void setSoLuongDangCo(Integer soLuongDangCo) {
		this.soLuongDangCo = soLuongDangCo;
	}
	public SanPhamDto() {
		super();
	}
	public SanPhamDto(SanPham e) {
		this.setId(e.getId());
		this.maSP = e.getMaSP();
		this.giaBanHienThoi = e.getGiaBanHienThoi();
		this.tenSP = e.getTenSP();
		this.baiViet = e.getBaiViet();
		if(e.getDonViTinh() != null) {
			this.donViTinh = new DonViTinhDto(e.getDonViTinh());
		}
		if (e.getSanPhamKho()!= null) {
			Integer count =  0;
			this.sanPhamKho = new HashSet<SanPhamKhoDto>();
			for (SanPhamKho sanPhamPhieuNhapDto : e.getSanPhamKho()) {
				count = count + sanPhamPhieuNhapDto.getSoLuong();
				this.sanPhamKho.add(new SanPhamKhoDto(sanPhamPhieuNhapDto,false));
			}
			this.soLuongDangCo = count;
		}
	}
	public SanPhamDto(SanPham e,Boolean simple) {
		this.setId(e.getId());
		this.maSP = e.getMaSP();
		this.giaBanHienThoi = e.getGiaBanHienThoi();
		this.tenSP = e.getTenSP();
		this.baiViet = e.getBaiViet();
		if(e.getDonViTinh() != null) {
			this.donViTinh = new DonViTinhDto(e.getDonViTinh());
		}
		
	}
}
