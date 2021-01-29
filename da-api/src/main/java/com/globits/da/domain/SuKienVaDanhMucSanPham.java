package com.globits.da.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_su_kien_va_danh_muc_san_pham")
public class SuKienVaDanhMucSanPham extends BaseObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name="su_kien_id")
	private SuKien suKien;

	@ManyToOne
	@JoinColumn(name="danh_muc_san_pham_id")
	private DanhMucSanPham danhMucSanPham;

	public SuKien getSuKien() {
		return suKien;
	}

	public void setSuKien(SuKien suKien) {
		this.suKien = suKien;
	}

	public DanhMucSanPham getDanhMucSanPham() {
		return danhMucSanPham;
	}

	public void setDanhMucSanPham(DanhMucSanPham danhMucSanPham) {
		this.danhMucSanPham = danhMucSanPham;
	}

	public SuKienVaDanhMucSanPham() {
		super();
	}

}
