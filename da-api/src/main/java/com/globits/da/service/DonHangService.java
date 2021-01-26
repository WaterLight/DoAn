package com.globits.da.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.da.domain.DonHang;
import com.globits.da.domain.Kho;
import com.globits.da.dto.DonHangDto;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
@Service
public interface DonHangService  extends GenericService<DonHang, UUID>{
	public Page<DonHangDto> getPage(int pageSize, int pageIndex);
	public DonHangDto saveOrUpdate(UUID id,DonHangDto dto);
	public Boolean deleteDonHang(UUID id);
	public DonHangDto getCertificate(UUID id);
	Page<DonHangDto> searchByPage(SearchDto dto);
	Boolean checkCode (UUID id,String code);
	public Boolean deleteCheckById(UUID id);
	public List<BaoCaoDto> baoCao(SearchDto dto);
}
