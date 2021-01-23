package com.globits.da;

public final class Constants {
	public static final String EventApplication = "Da"; 
	public static final String ROLE_ADMIN ="ROLE_ADMIN";
	public static final String ROLE_STAFF ="ROLE_STAFF";
	public static final String ROLE_USER ="ROLE_USER";
	
	public static enum ThuocTinhSanPhamType{
		size(1),// size
		color(2);// màu sắc
		
		private Integer value;
		private ThuocTinhSanPhamType(Integer value) {
		    this.value = value;
		}
		public Integer getValue() {
			return value;
		}
	}
}
