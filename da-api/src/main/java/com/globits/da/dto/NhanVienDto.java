package com.globits.da.dto;

import java.util.Date;

import com.globits.da.domain.NhanVien;

public class NhanVienDto extends BaseObjectDto {
	private String maNV;
	private String type;
	private String displayName;
	private String gender;
	private Date birthDate;
	private String phoneNumber;
	private String email;

	public String getMaNV() {
		return maNV;
	}

	public void setMaNV(String maNV) {
		this.maNV = maNV;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public NhanVienDto() {
		super();
	}

	public NhanVienDto(NhanVien e) {
		if (e != null) {
			this.setId(e.getId());
			this.maNV = e.getMaNV();
			this.type = e.getType();
			this.displayName = e.getDisplayName();
			this.gender = e.getGender();
			this.birthDate = e.getBirthDate();
			this.phoneNumber = e.getPhoneNumber();
			this.email = e.getEmail();
		}
	}
}
