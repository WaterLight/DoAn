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
import com.globits.da.domain.DonViTinh;
import com.globits.da.domain.Kho;
import com.globits.da.dto.DonViTinhDto;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.DonViTinhRepository;
import com.globits.da.service.DonViTinhService;
@Service
public class DonViTinhServiceImpl extends GenericServiceImpl<DonViTinh, UUID> implements DonViTinhService{
	@Autowired
	DonViTinhRepository repos;
	@Override
	public Page<DonViTinhDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public DonViTinhDto saveOrUpdate(UUID id, DonViTinhDto dto) {
		if(dto != null ) {
			DonViTinh entity = null;
			if(dto.getId() !=null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  repos.getOne(dto.getId());
			}
			if(entity == null) {
				entity = new DonViTinh();
			}
			entity.setMa(dto.getMa());
			entity.setTen(dto.getTen());
			
			entity = repos.save(entity);
			if (entity != null) {
				return new DonViTinhDto(entity);
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
	public DonViTinhDto getCertificate(UUID id) {
		DonViTinh entity = repos.getOne(id);
		if(entity!=null) {
			return new DonViTinhDto(entity);
		}
		return null;
	}

	@Override
	public Page<DonViTinhDto> searchByPage(SearchDto dto) {
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
		
		String sqlCount = "select count(entity.id) from DonViTinh as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.DonViTinhDto(entity) from DonViTinh as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ten LIKE :text OR entity.ma LIKE :text )";
		}

		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, DonViTinhDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<DonViTinhDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<DonViTinhDto> result = new PageImpl<DonViTinhDto>(entities, pageable, count);
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
