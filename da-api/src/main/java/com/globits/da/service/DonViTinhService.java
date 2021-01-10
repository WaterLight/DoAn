package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.DonViTinh;
import com.globits.da.dto.DonViTinhDto;
import com.globits.da.dto.search.SearchDto;

@Service
public interface DonViTinhService extends GenericService<DonViTinh, UUID>{
	public Page<DonViTinhDto> getPage(int pageSize, int pageIndex);
	public DonViTinhDto saveOrUpdate(UUID id,DonViTinhDto dto);
	public Boolean deleteKho(UUID id);
	public DonViTinhDto getCertificate(UUID id);
	Page<DonViTinhDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
}
