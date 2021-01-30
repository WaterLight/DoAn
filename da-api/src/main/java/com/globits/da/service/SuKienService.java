package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;

import com.globits.core.service.GenericService;
import com.globits.da.domain.SuKien;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.SuKienDto;
import com.globits.da.dto.search.SearchDto;

public interface SuKienService extends GenericService<SuKien, UUID>{

	Page<SuKienDto> searchByPage(SearchDto searchDto);

	SuKienDto saveOrUpdate(UUID id, SuKienDto dto);

	Boolean deleteById(UUID id);

	SuKienDto getById(UUID id);

}
