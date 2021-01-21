package com.globits.da.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.PhieuXuatKho;
import com.globits.da.dto.PhieuNhapKhoDto;
import com.globits.da.dto.PhieuXuatKhoDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
@Service
public interface PhieuXuatKhoService extends GenericService<PhieuXuatKho, UUID>{
	public Page< PhieuXuatKhoDto> getPage(int pageSize, int pageIndex);
	public PhieuXuatKhoDto saveOrUpdate(UUID id,PhieuXuatKhoDto dto);
	public Boolean deleteKho(UUID id);
	public PhieuXuatKhoDto getCertificate(UUID id);
	Page<PhieuXuatKhoDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public  List<BaoCaoDto> baoCao(SearchDto dto);
}
