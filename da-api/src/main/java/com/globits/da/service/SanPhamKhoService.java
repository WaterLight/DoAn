package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.dto.SanPhamKhoDto;
import com.globits.da.dto.search.SearchDto;
@Service
public interface SanPhamKhoService extends GenericService<SanPhamKho, UUID>{
	Page<SanPhamKhoDto> searchByPage(SearchDto dto);
	Integer numberOfProductBySize(UUID productId, UUID sizeId);
}
