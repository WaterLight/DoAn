package com.globits.da.dto;
import java.util.Date;

public class RegisterDto {
	private String displayName;					//Họ tên
	private String email;						//email
	private String userName;					//Tên đăng nhập
	private String phoneNumber;					//Điện thoại liên hệ
	private String gender;						//Giới tính
	private Date birthDate;						//Ngày sinh
	private String password;					//Mật khẩu
	private String confirmPassword;				//Nhập lại mật khẩu
	private String address;						//Địa chỉ
	private Boolean hasUserName = false;				//Tên đăng nhâp đã tồn tại ( = true)
	private Boolean hasPhoneNumber = false;				//Số điện thoại đã tồn tại ( = true)
	private Boolean hasEmail = false;					//Email đã tồn tại ( = true)
	private Boolean isConfirmPassword = false;			//Mật khẩu không trùng khớp ( = true)
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Date getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	public Boolean getHasUserName() {
		return hasUserName;
	}
	public void setHasUserName(Boolean hasUserName) {
		this.hasUserName = hasUserName;
	}
	public Boolean getHasPhoneNumber() {
		return hasPhoneNumber;
	}
	public void setHasPhoneNumber(Boolean hasPhoneNumber) {
		this.hasPhoneNumber = hasPhoneNumber;
	}
	public Boolean getHasEmail() {
		return hasEmail;
	}
	public void setHasEmail(Boolean hasEmail) {
		this.hasEmail = hasEmail;
	}
	public Boolean getIsConfirmPassword() {
		return isConfirmPassword;
	}
	public void setIsConfirmPassword(Boolean isConfirmPassword) {
		this.isConfirmPassword = isConfirmPassword;
	}
	
}
