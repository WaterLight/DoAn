package com.globits.da.dto.search;

import java.util.UUID;

public class SearchDto {
	private UUID id;
	private int pageIndex;
	private int pageSize;
	private String keyword;
	private Boolean voided;
	private UUID khoId;
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Boolean getVoided() {
		return voided;
	}
	public void setVoided(Boolean voided) {
		this.voided = voided;
	}
	public UUID getKhoId() {
		return khoId;
	}
	public void setKhoId(UUID khoId) {
		this.khoId = khoId;
	}
	
	
}
