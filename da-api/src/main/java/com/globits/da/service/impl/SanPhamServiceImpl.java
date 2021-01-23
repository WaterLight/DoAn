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
import com.globits.da.domain.SanPham;
import com.globits.da.domain.ThuocTinhSanPham;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.dto.SanPhamSizeDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.DanhMucSanPhamRepository;
import com.globits.da.repository.DonViTinhRepository;
import com.globits.da.repository.SanPhamRepository;
import com.globits.da.repository.ThuocTinhSanPhamRepository;
import com.globits.da.service.SanPhamService;

@Service
public class SanPhamServiceImpl extends GenericServiceImpl<SanPham, UUID> implements SanPhamService {
	@Autowired
	SanPhamRepository repos;
	@Autowired
	DonViTinhRepository donViTinhRepository;
	@Autowired
	DanhMucSanPhamRepository danhMucSanPhamRepository;
	@Autowired
	private ThuocTinhSanPhamRepository thuocTinhSanPhamRepository;

	@Override
	public Page<SanPhamDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public SanPhamDto saveOrUpdate(UUID id, SanPhamDto dto) {
		if (dto != null) {
			SanPham entity = null;
			if (dto.getId() != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = repos.getOne(dto.getId());
			}
			if (entity == null) {
				entity = new SanPham();
			}
			entity.setMaSP(dto.getMaSP());
			entity.setTenSP(dto.getTenSP());
			entity.setGiaBanHienThoi(dto.getGiaBanHienThoi());
			entity.setBaiViet(dto.getBaiViet());
			entity.setImageUrl(dto.getImageUrl());
			if (dto.getDonViTinh() != null) {
				DonViTinh nv = donViTinhRepository.getOne(dto.getDonViTinh().getId());
				entity.setDonViTinh(nv);
			}
			if (dto.getDanhMucSanPham() != null) {
				DanhMucSanPham nv = danhMucSanPhamRepository.getOne(dto.getDanhMucSanPham().getId());
				entity.setDanhMucSanPham(nv);
			}
			if (dto.getSize() != null) {
				ThuocTinhSanPham size = thuocTinhSanPhamRepository.getOne(dto.getSize().getId());
				entity.setSize(size);
			}
			entity = repos.save(entity);
			if (entity != null) {
				return new SanPhamDto(entity);
			}
		}
		return null;
	}

	@Override
	public Boolean deleteKho(UUID id) {
		if (id != null) {
			repos.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public SanPhamDto getCertificate(UUID id) {
		SanPham entity = repos.getOne(id);
		if (entity != null) {
			return new SanPhamDto(entity);
		}
		return null;
	}

	@Override
	public Page<SanPhamDto> searchByPage(SearchDto dto) {
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

		String sqlCount = "select count(entity.id) from SanPham as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.SanPhamDto(entity) from SanPham as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.maSP LIKE :text or entity.tenSP LIKE :text )";
		}
		if (dto.getDanhMucSanPhamId() != null) {
			whereClause += " AND ( entity.danhMucSanPham.id  =: danhMucSanPhamId  )";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, SanPhamDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if (dto.getDanhMucSanPhamId() != null) {
			q.setParameter("danhMucSanPhamId", dto.getDanhMucSanPhamId());
			qCount.setParameter("danhMucSanPhamId", dto.getDanhMucSanPhamId());
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<SanPhamDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<SanPhamDto> result = new PageImpl<SanPhamDto>(entities, pageable, count);
		return result;
	}

	@Override
	public Boolean checkCode(UUID id, String code) {
		if (code != null && StringUtils.hasText(code)) {
			Long count = repos.checkCode(code, id);
			return count != 0l;
		}
		return null;
	}

	@Override
	public Boolean deleteCheckById(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Page<SanPhamSizeDto> searchByPageGroupByName(SearchDto dto) {
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


		String sqlCount = "select count(entity.id) from SanPhamKho as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.SanPhamSizeDto(entity.sanPham.id, entity.sanPham.tenSP, entity.sanPham.size, SUM(entity.soLuong)) "
				+ "from SanPhamKho as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.sanPham.maSP LIKE :text or entity.sanPham.tenSP LIKE :text )";
		}
		if (dto.getDanhMucSanPhamId() != null) {
			whereClause += " AND ( entity.sanPham.danhMucSanPham.id  =: danhMucSanPhamId  )";
		}
		String orderBy = " ORDER BY entity.sanPham.createDate DESC";
		String groupBy = " Group BY entity.sanPham.tenSP, entity.sanPham.size";

		sql += whereClause + groupBy + orderBy;
		sqlCount += whereClause + groupBy;

		Query q = manager.createQuery(sql, SanPhamSizeDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if (dto.getDanhMucSanPhamId() != null) {
			q.setParameter("danhMucSanPhamId", dto.getDanhMucSanPhamId());
			qCount.setParameter("danhMucSanPhamId", dto.getDanhMucSanPhamId());
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<SanPhamSizeDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<SanPhamSizeDto> result = new PageImpl<SanPhamSizeDto>(entities, pageable, count);
		return result;
	}

}
