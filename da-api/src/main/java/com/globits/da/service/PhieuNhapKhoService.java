package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.PhieuNhapKho;
import com.globits.da.dto.PhieuNhapKhoDto;
import com.globits.da.dto.search.SearchDto;
@Service
public interface PhieuNhapKhoService extends GenericService<PhieuNhapKho, UUID>{
	public Page<PhieuNhapKhoDto> getPage(int pageSize, int pageIndex);
	public PhieuNhapKhoDto saveOrUpdate(UUID id,PhieuNhapKhoDto dto);
	public Boolean deleteKho(UUID id);
	public PhieuNhapKhoDto getCertificate(UUID id);
	Page<PhieuNhapKhoDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
}
