package com.globits.da.dto.search;

import java.util.Date;
import java.util.UUID;

public class SearchDto {
	private UUID id;
	private int pageIndex;
	private int pageSize;
	private String keyword;
	private Boolean voided;
	private UUID khoId;
	private Date fromDate;
	private Date toDate;
	private UUID danhMucSanPhamId;
	private Integer thuocTinhSanPhamType;
	private Double priceMin;
	private Double priceMax;
	private Date dateOrder;
	private int statusOrder;
	private Boolean isPopular;
	private Boolean isActive;
	private Long userId;
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
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public UUID getDanhMucSanPhamId() {
		return danhMucSanPhamId;
	}
	public void setDanhMucSanPhamId(UUID danhMucSanPhamId) {
		this.danhMucSanPhamId = danhMucSanPhamId;
	}
	public Integer getThuocTinhSanPhamType() {
		return thuocTinhSanPhamType;
	}
	public void setThuocTinhSanPhamType(Integer thuocTinhSanPhamType) {
		this.thuocTinhSanPhamType = thuocTinhSanPhamType;
	}
	public Double getPriceMin() {
		return priceMin;
	}
	public void setPriceMin(Double priceMin) {
		this.priceMin = priceMin;
	}
	public Double getPriceMax() {
		return priceMax;
	}
	public void setPriceMax(Double priceMax) {
		this.priceMax = priceMax;
	}
	public Date getDateOrder() {
		return dateOrder;
	}
	public void setDateOrder(Date dateOrder) {
		this.dateOrder = dateOrder;
	}
	public int getStatusOrder() {
		return statusOrder;
	}
	public void setStatusOrder(int statusOrder) {
		this.statusOrder = statusOrder;
	}
	public Boolean getIsPopular() {
		return isPopular;
	}
	public void setIsPopular(Boolean isPopular) {
		this.isPopular = isPopular;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
