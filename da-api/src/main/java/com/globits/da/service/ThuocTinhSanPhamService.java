package com.globits.da.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.Kho;
import com.globits.da.domain.ThuocTinhSanPham;
import com.globits.da.dto.ThuocTinhSanPhamDto;
import com.globits.da.dto.search.SearchDto;
@Service
public interface ThuocTinhSanPhamService  extends GenericService<ThuocTinhSanPham, UUID>{
	public Page<ThuocTinhSanPhamDto> getPage(int pageSize, int pageIndex);
	public ThuocTinhSanPhamDto saveOrUpdate(UUID id,ThuocTinhSanPhamDto dto);
	public Boolean deleteThuocTinhSanPham(UUID id);
	public ThuocTinhSanPhamDto getCertificate(UUID id);
	Page<ThuocTinhSanPhamDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
}
