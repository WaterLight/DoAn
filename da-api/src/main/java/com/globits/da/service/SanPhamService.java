package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.SanPham;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.dto.SanPhamSizeDto;
import com.globits.da.dto.search.SearchDto;

@Service
public interface SanPhamService extends GenericService<SanPham, UUID>{
	public Page<SanPhamDto> getPage(int pageSize, int pageIndex);
	public SanPhamDto saveOrUpdate(UUID id,SanPhamDto dto);
	public Boolean deleteKho(UUID id);
	public SanPhamDto getCertificate(UUID id);
	Page<SanPhamDto> searchByPageAdmin(SearchDto dto);
	Page<SanPhamDto> searchByPagePublic(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
	
	Page<SanPhamSizeDto> searchByPageGroupByName(SearchDto dto);
}
