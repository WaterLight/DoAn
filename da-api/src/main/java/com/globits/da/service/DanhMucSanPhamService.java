package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.DanhMucSanPham;
import com.globits.da.dto.DanhMucSanPhamDto;
import com.globits.da.dto.search.SearchDto;

@Service
public interface DanhMucSanPhamService extends GenericService<DanhMucSanPham, UUID>{
	public Page<DanhMucSanPhamDto> getPage(int pageSize, int pageIndex);
	public DanhMucSanPhamDto saveOrUpdate(UUID id,DanhMucSanPhamDto dto);
	public Boolean deleteKho(UUID id);
	public DanhMucSanPhamDto getCertificate(UUID id);
	Page<DanhMucSanPhamDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
}
