package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.Kho;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.search.SearchDto;
@Service
public interface KhoService  extends GenericService<Kho, UUID>{
	public Page<KhoDto> getPage(int pageSize, int pageIndex);
	public KhoDto saveOrUpdate(UUID id,KhoDto dto);
	public Boolean deleteKho(UUID id);
	public KhoDto getCertificate(UUID id);
	Page<KhoDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
}
