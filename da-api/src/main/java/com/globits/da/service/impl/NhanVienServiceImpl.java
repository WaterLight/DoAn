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
import com.globits.da.domain.Kho;
import com.globits.da.domain.NhanVien;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.NhanVienDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.NhanVienRepository;
import com.globits.da.service.NhanVienService;
@Service
public class NhanVienServiceImpl extends GenericServiceImpl<NhanVien, UUID> implements NhanVienService{
	@Autowired
	NhanVienRepository repos;
	@Override
	public Page<NhanVienDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public NhanVienDto saveOrUpdate(UUID id, NhanVienDto dto) {
		if(dto != null ) {
			NhanVien entity = null;
			if(dto.getId() !=null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  repos.getOne(dto.getId());
			}
			if(entity == null) {
				entity = new NhanVien();
			}
			entity.setMaNV(dto.getMaNV());
			entity.setType(dto.getType());
			
			entity = repos.save(entity);
			if (entity != null) {
				return new NhanVienDto(entity);
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
	public NhanVienDto getCertificate(UUID id) {
		NhanVien entity = repos.getOne(id);
		if(entity!=null) {
			return new NhanVienDto(entity);
		}
		return null;
	}

	@Override
	public Page<NhanVienDto> searchByPage(SearchDto dto) {
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
		
		String sqlCount = "select count(entity.id) from NhanVien as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.NhanVienDto(entity) from NhanVien as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.maNV LIKE :text )";
		}

		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, NhanVienDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<NhanVienDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<NhanVienDto> result = new PageImpl<NhanVienDto>(entities, pageable, count);
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
