package com.globits.da.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;

import com.globits.da.domain.DanhMucSanPham;
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.domain.SanPhamSize;
import com.globits.da.domain.ThuocTinhSanPham;

public class SanPhamDto extends BaseObjectDto{
	private String tenSP;
	private String maSP;
	private String shortContent;
	private Double giaBanHienThoi;
	private Date ngayCapNhat;
	private Date ngayTao;
	private NhanVienDto nguoiTao;
	private NhanVienDto nguoiCapNhat;
	private DonViTinhDto donViTinh;
	private String baiViet;
	private Integer soLuongDangCo;
	private Set<SanPhamKhoDto> sanPhamKho;
	private String imageUrl;//Đường dẫn đến File ảnh tiêu đề bài báo (nếu có)
	private DanhMucSanPhamDto danhMucSanPham;
	private Set<ThuocTinhSanPhamDto> size = new HashSet<ThuocTinhSanPhamDto>();
	private Boolean isPopular = false;
	
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
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public DanhMucSanPhamDto getDanhMucSanPham() {
		return danhMucSanPham;
	}
	public void setDanhMucSanPham(DanhMucSanPhamDto danhMucSanPham) {
		this.danhMucSanPham = danhMucSanPham;
	}
	public Set<ThuocTinhSanPhamDto> getSize() {
		return size;
	}
	public void setSize(Set<ThuocTinhSanPhamDto> size) {
		this.size = size;
	}
	public String getShortContent() {
		return shortContent;
	}
	public void setShortContent(String shortContent) {
		this.shortContent = shortContent;
	}
	
	public Boolean getIsPopular() {
		return isPopular;
	}
	public void setIsPopular(Boolean isPopular) {
		this.isPopular = isPopular;
	}
	public SanPhamDto() {
		super();
	}
	public SanPhamDto(SanPham e, int hasProductNumber) {
		if (e.getSanPhamKho() != null && e.getSanPhamKho().size() >0) {
			Integer count =  0;
			this.sanPhamKho = new HashSet<SanPhamKhoDto>();
			for (SanPhamKho sanPhamPhieuNhapDto : e.getSanPhamKho()) {
				count = count + sanPhamPhieuNhapDto.getSoLuong();
				this.sanPhamKho.add(new SanPhamKhoDto(sanPhamPhieuNhapDto,false));
			}
			if(count > 0) {
				this.soLuongDangCo = count;
				this.setId(e.getId());
				this.maSP = e.getMaSP();
				this.giaBanHienThoi = e.getGiaBanHienThoi();
				this.tenSP = e.getTenSP();
				this.baiViet = e.getBaiViet();
				this.imageUrl = e.getImageUrl();
				this.shortContent = e.getShortConent();
				this.isPopular = e.getIsPopular();
				if(e.getDonViTinh() != null) {
					this.donViTinh = new DonViTinhDto(e.getDonViTinh());
				}
				if(e.getDanhMucSanPham() != null) {
					this.danhMucSanPham = new DanhMucSanPhamDto(e.getDanhMucSanPham());
				}
				if(e.getSize()!=null && e.getSize().size()>0){
					for (SanPhamSize item : e.getSize()) {
						this.size.add(new ThuocTinhSanPhamDto(item.getSize()));				
					}
				}
			}
		}
	}
	public SanPhamDto(SanPham e) {
		this.setId(e.getId());
		this.maSP = e.getMaSP();
		this.giaBanHienThoi = e.getGiaBanHienThoi();
		this.tenSP = e.getTenSP();
		this.baiViet = e.getBaiViet();
		this.imageUrl = e.getImageUrl();
		this.shortContent = e.getShortConent();
		this.isPopular = e.getIsPopular();
		if(e.getDonViTinh() != null) {
			this.donViTinh = new DonViTinhDto(e.getDonViTinh());
		}
		if(e.getDanhMucSanPham() != null) {
			this.danhMucSanPham = new DanhMucSanPhamDto(e.getDanhMucSanPham());
		}
		if(e.getSize()!=null && e.getSize().size()>0){
			for (SanPhamSize item : e.getSize()) {
				this.size.add(new ThuocTinhSanPhamDto(item.getSize()));				
			}
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
		this.imageUrl = e.getImageUrl();
		this.shortContent = e.getShortConent();
		this.isPopular = e.getIsPopular();
		if(e.getDonViTinh() != null) {
			this.donViTinh = new DonViTinhDto(e.getDonViTinh());
		}
		if(e.getDanhMucSanPham() != null) {
			this.danhMucSanPham = new DanhMucSanPhamDto(e.getDanhMucSanPham());
		}
		if(e.getSize()!=null && e.getSize().size()>0){
			for (SanPhamSize item : e.getSize()) {
				this.size.add(new ThuocTinhSanPhamDto(item.getSize()));				
			}
		}
	}
}
