package com.globits.da.service.impl;

import java.util.List;
import java.util.UUID;

import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.dto.NhanVienDto;
import com.globits.da.dto.SanPhamKhoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.SanPhamKhoRepository;
import com.globits.da.service.SanPhamKhoService;
@Service
public class SanPhamKhoServiceImpl extends GenericServiceImpl<SanPhamKho, UUID> implements SanPhamKhoService{

	@Autowired
	SanPhamKhoRepository sanPhamKhoRepository;
	@Override
	public Page<SanPhamKhoDto> searchByPage(SearchDto dto) {
		if (dto == null) {
			return null;
		}
		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0) {
			pageIndex--;
		} else {
			pageIndex = 0;
		}

		String whereClause = "";
		
		String orderBy = " ORDER BY entity.createDate DESC";
		
		String sqlCount = "select count(entity.id) from SanPhamKho as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.SanPhamKhoDto(entity) from SanPhamKho as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.sanPham.tenSP LIKE :text entity.kho.tenKho LIKE :text )";
		}
		if(dto.getKhoId() != null ) {
			whereClause += " AND ( entity.kho.id =: khoId ) " ;
		}
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, SanPhamKhoDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if(dto.getKhoId() != null ) {
			q.setParameter("khoId", dto.getKhoId());
			qCount.setParameter("khoId",dto.getKhoId());
		}
		
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<SanPhamKhoDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<SanPhamKhoDto> result = new PageImpl<SanPhamKhoDto>(entities, pageable, count);
		return result;
	}

	@Override
	public Integer numberOfProductBySize(UUID productId, UUID sizeId) {
		if(productId != null && sizeId != null){
			Integer num =0;
			num = sanPhamKhoRepository.getNumberOfProductBySie(productId, sizeId);
			if(num != null && num >0) {
				return num;
			}
		}
		return 0;
	}

}
