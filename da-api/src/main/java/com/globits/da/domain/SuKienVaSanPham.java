package com.globits.da.domain;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.globits.core.domain.BaseObject;

public class SuKienVaSanPham extends BaseObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name="su_kien_id")
	private SuKien suKien;
	
	@ManyToOne
	@JoinColumn(name="san_pham_id")
	private SanPham sanPham;

	public SuKien getSuKien() {
		return suKien;
	}

	public void setSuKien(SuKien suKien) {
		this.suKien = suKien;
	}

	public SanPham getSanPham() {
		return sanPham;
	}

	public void setSanPham(SanPham sanPham) {
		this.sanPham = sanPham;
	}

	public SuKienVaSanPham() {
		super();
	}

}
