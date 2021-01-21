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
import com.globits.da.domain.DanhMucSanPham;
import com.globits.da.domain.DonViTinh;
import com.globits.da.dto.DanhMucSanPhamDto;
import com.globits.da.dto.DonViTinhDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.DanhMucSanPhamRepository;
import com.globits.da.service.DanhMucSanPhamService;
@Service
public class DanhMucSanPhamServiceImpl extends GenericServiceImpl<DanhMucSanPham, UUID> implements DanhMucSanPhamService{
	@Autowired
	DanhMucSanPhamRepository repos;
	@Override
	public Page<DanhMucSanPhamDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public DanhMucSanPhamDto saveOrUpdate(UUID id, DanhMucSanPhamDto dto) {
		if(dto != null ) {
			DanhMucSanPham entity = null;
			if(dto.getId() !=null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  repos.getOne(dto.getId());
			}
			if(entity == null) {
				entity = new DanhMucSanPham();
			}
			entity.setMa(dto.getMa());
			entity.setTen(dto.getTen());
			
			entity = repos.save(entity);
			if (entity != null) {
				return new DanhMucSanPhamDto(entity);
			}
			}
			return null;
	}

	@Override
	public Boolean deleteKho(UUID id) {
		if(id!=null) {
			repos.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public DanhMucSanPhamDto getCertificate(UUID id) {
		DanhMucSanPham entity = repos.getOne(id);
		if(entity!=null) {
			return new DanhMucSanPhamDto(entity);
		}
		return null;
	}

	@Override
	public Page<DanhMucSanPhamDto> searchByPage(SearchDto dto) {
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
		
		String sqlCount = "select count(entity.id) from DanhMucSanPham as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.DanhMucSanPhamDto(entity) from DanhMucSanPham as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ten LIKE :text OR entity.ma LIKE :text )";
		}

		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, DanhMucSanPhamDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<DanhMucSanPhamDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<DanhMucSanPhamDto> result = new PageImpl<DanhMucSanPhamDto>(entities, pageable, count);
		return result;
	}

	@Override
	public Boolean checkCode(UUID id, String code) {
		if(code != null && StringUtils.hasText(code)) {
			Long count = repos.checkCode(code,id);
				return count != 0l;
			}
		return null;
	}

	@Override
	public Boolean deleteCheckById(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

}
