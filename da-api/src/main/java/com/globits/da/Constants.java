package com.globits.da;

public final class Constants {
	public static final String EventApplication = "Da"; 
	public static final String ROLE_ADMIN ="ROLE_ADMIN";
	public static final String ROLE_STAFF ="ROLE_STAFF";
	public static final String ROLE_USER ="ROLE_USER";
	
	public static enum VoucherType{
		Liquidate(-2),// Thanh lý
		StockOut(-1),//Xuất kho vật tư
		StockIn(1),//Nhập kho vật tư
		Allocation(2),//Cấp phát
		Transfer(3),//Điều chuyển
		Receiving(4),//Tiếp nhận
		TransferToAnotherUnit(5);// Điều chuyển đơn vị khác
		private Integer value;
		private VoucherType(Integer value) {
		    this.value = value;
		}
		public Integer getValue() {
			return value;
		}
	}
}
