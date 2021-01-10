package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.NhanVien;
import com.globits.da.dto.NhanVienDto;
import com.globits.da.dto.search.SearchDto;

@Service
public interface NhanVienService extends GenericService<NhanVien, UUID>{
	public Page<NhanVienDto> getPage(int pageSize, int pageIndex);
	public NhanVienDto saveOrUpdate(UUID id,NhanVienDto dto);
	public Boolean deleteKho(UUID id);
	public NhanVienDto getCertificate(UUID id);
	Page<NhanVienDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
}
