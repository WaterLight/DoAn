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
import com.globits.da.domain.ThuocTinhSanPham;
import com.globits.da.dto.ThuocTinhSanPhamDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.ThuocTinhSanPhamRepository;
import com.globits.da.service.ThuocTinhSanPhamService;
import com.globits.da.service.ThuocTinhSanPhamService;
@Service
public class ThuocTinhSanPhamServiceImpl extends GenericServiceImpl<ThuocTinhSanPham, UUID> implements ThuocTinhSanPhamService{
	@Autowired
	ThuocTinhSanPhamRepository repos;

	@Override
	public Page<ThuocTinhSanPhamDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public ThuocTinhSanPhamDto saveOrUpdate(UUID id, ThuocTinhSanPhamDto dto) {
		if(dto != null ) {
			ThuocTinhSanPham entity = null;
			if(dto.getId() !=null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  repos.getOne(dto.getId());
			}
			if(entity == null) {
				entity = new ThuocTinhSanPham();
			}
			entity.setTen(dto.getTen());
			entity.setMa(dto.getMa());
			entity.setLoai(dto.getLoai());
			
			entity = repos.save(entity);
			if (entity != null) {
				return new ThuocTinhSanPhamDto(entity);
			}
			}
			return null;
	}

	@Override
	public Boolean deleteThuocTinhSanPham(UUID id) {
		if(id!=null) {
			repos.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public ThuocTinhSanPhamDto getCertificate(UUID id) {
		ThuocTinhSanPham entity = repos.getOne(id);
		if(entity!=null) {
			return new ThuocTinhSanPhamDto(entity);
		}
		return null;
	}

	@Override
	public Page<ThuocTinhSanPhamDto> searchByPage(SearchDto dto) {
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
		
		String sqlCount = "select count(entity.id) from ThuocTinhSanPham as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.ThuocTinhSanPhamDto(entity) from ThuocTinhSanPham as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ten LIKE :text OR entity.ma LIKE :text )";
		}
		
		if(dto.getThuocTinhSanPhamType() != null) {
			whereClause += " AND ( entity.loai = :type)";
		}
		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, ThuocTinhSanPhamDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		
		if (dto.getThuocTinhSanPhamType() != null) {
			q.setParameter("type", dto.getThuocTinhSanPhamType());
			qCount.setParameter("type", dto.getThuocTinhSanPhamType());
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<ThuocTinhSanPhamDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<ThuocTinhSanPhamDto> result = new PageImpl<ThuocTinhSanPhamDto>(entities, pageable, count);
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
