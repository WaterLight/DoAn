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
	public static enum OrderStatus{
		newOrder(1),// đơn hàng mới
		confirmOrder(2),// đơn hàng đã xác nhận
		cancelOrder(3),// đơn hàng đã hủy
		paymentOrder(4);// đơn hàng đã thanh toán
		
		private Integer value;
		private OrderStatus(Integer value) {
		    this.value = value;
		}
		public Integer getValue() {
			return value;
		}
	}
	public static enum TypeOfPayMent{//Hình thức thanh toán
		transferBanking(1),// chuyển khoản
		cashing(2);// tiền mặt
		
		private Integer value;
		private TypeOfPayMent(Integer value) {
		    this.value = value;
		}
		public Integer getValue() {
			return value;
		}
	}
}
