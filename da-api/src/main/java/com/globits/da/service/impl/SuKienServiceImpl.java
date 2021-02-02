package com.globits.da.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SuKien;
import com.globits.da.domain.SuKienVaDanhMucSanPham;
import com.globits.da.domain.SuKienVaSanPham;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.dto.SuKienDto;
import com.globits.da.dto.SuKienVaDanhMucSanPhamDto;
import com.globits.da.dto.SuKienVaSanPhamDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.DanhMucSanPhamRepository;
import com.globits.da.repository.SanPhamRepository;
import com.globits.da.repository.SuKienRepository;
import com.globits.da.repository.SuKienVaDanhMucSanPhamRepository;
import com.globits.da.repository.SuKienVaSanPhamRepository;
import com.globits.da.service.SuKienService;

@Service
public class SuKienServiceImpl extends GenericServiceImpl<SuKien, UUID> implements SuKienService {
	@Autowired
	SuKienRepository repository;
	@Autowired
	SuKienVaSanPhamRepository suKienVaSanPhamRepository;
	@Autowired
	SuKienVaDanhMucSanPhamRepository suKienVaDanhMucSanPhamRepository;
	@Autowired
	SanPhamRepository sanPhamRepository;
	@Autowired
	DanhMucSanPhamRepository danhMucSanPhamRepository;
	
	@Override
	public Page<SuKienDto> searchByPage(SearchDto dto) {
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
		String sqlCount = "select count(entity.id) from SuKien as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.SuKienDto(entity) from SuKien as entity where (1=1)  ";
		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.tieuDe LIKE :text or entity.tieuDePhu LIKE :text )";
		}
		if (dto.getIsActive() != null && dto.getIsActive() == true) {
			whereClause += " AND ( entity.isActive is not null and entity.isActive is TRUE ) ";
		}
		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, SuKienDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<SuKienDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<SuKienDto> result = new PageImpl<SuKienDto>(entities, pageable, count);
		return result;
	}

	@Override
	public SuKienDto saveOrUpdate(UUID id, SuKienDto dto) {
		if (dto != null) {
			SuKien entity = null;
			if (dto.getId() != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = repository.getOne(dto.getId());
			}
			if (entity == null) {
				entity = new SuKien();
			}
			entity.setTieuDe(dto.getTieuDe());
			entity.setTieuDePhu(dto.getTieuDePhu());
			entity.setNgayBatDau(dto.getNgayBatDau());
			entity.setNgayKetThuc(dto.getNgayKetThuc());
			entity.setImageBannerUrl(dto.getImageBannerUrl());
			entity.setImageThumbnailUrl(dto.getImageThumbnailUrl());
			entity.setTomTat(dto.getTomTat());
			entity.setNoiDung(dto.getNoiDung());
			entity.setPhanTramGiamGia(dto.getPhanTramGiamGia());
			entity.setTienGiamGia(dto.getTienGiamGia());
			entity.setIsActive(dto.getIsActive());
			Set<SuKienVaSanPham> listSKSP = new HashSet<SuKienVaSanPham>();
			if (dto.getSanPham() != null && dto.getSanPham().size() > 0) {
				for (SuKienVaSanPhamDto skspDto : dto.getSanPham()) {
					SuKienVaSanPham sksp = new SuKienVaSanPham();
					if (skspDto.getId() != null) {
						sksp = suKienVaSanPhamRepository.getOne(skspDto.getId());
					}
					if (skspDto.getSanPham() != null && skspDto.getSanPham().getId() != null) {
						SanPham sp = sanPhamRepository.getOne(skspDto.getSanPham().getId());
						if (sp != null) {
							sksp.setSanPham(sp);
							sksp.setSuKien(entity);
							
							listSKSP.add(sksp);
						}
					}
				}
				if (listSKSP != null && listSKSP.size() > 0) {
					if (entity.getSanPham() == null) {
						entity.setSanPham(listSKSP);
					} else {
						entity.getSanPham().clear();
						entity.getSanPham().addAll(listSKSP);
					}
				}

			} else {// Nếu submit list trống lên thì xóa hết
				if (entity.getSanPham() != null) {
					entity.getSanPham().clear();
				}
			}
			
			Set<SuKienVaDanhMucSanPham> listSKDMSP = new HashSet<SuKienVaDanhMucSanPham>();
			if (dto.getDanhMucSanPham() != null && dto.getDanhMucSanPham().size() > 0) {
				for (SuKienVaDanhMucSanPhamDto skdmspDto : dto.getDanhMucSanPham()) {
					SuKienVaDanhMucSanPham skdmsp = new SuKienVaDanhMucSanPham();
					if (skdmspDto.getId() != null) {
						skdmsp = suKienVaDanhMucSanPhamRepository.getOne(skdmspDto.getId());
					}
					if (skdmspDto.getDanhMucSanPham() != null && skdmspDto.getDanhMucSanPham().getId() != null) {
						DanhMucSanPham dmsp = danhMucSanPhamRepository.getOne(skdmspDto.getDanhMucSanPham().getId());
						if (dmsp != null) {
							skdmsp.setDanhMucSanPham(dmsp);
							skdmsp.setSuKien(entity);
							
							listSKDMSP.add(skdmsp);
						}
					}
				}
				if (listSKDMSP != null && listSKDMSP.size() > 0) {
					if (entity.getDanhMucSanPham() == null) {
						entity.setDanhMucSanPham(listSKDMSP);
					} else {
						entity.getDanhMucSanPham().clear();
						entity.getDanhMucSanPham().addAll(listSKDMSP);
					}
				}

			} else {// Nếu submit list trống lên thì xóa hết
				if (entity.getDanhMucSanPham() != null) {
					entity.getDanhMucSanPham().clear();
				}
			}
			
			entity = repository.save(entity);
			if (entity != null) {
				return new SuKienDto(entity);
			}
		}
		return null;
	}

	@Override
	public Boolean deleteById(UUID id) {
		if (id != null) {
			repository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public SuKienDto getById(UUID id) {
		// TODO Auto-generated method stub
		SuKien entity = repository.getOne(id);
		if (entity != null) {
			return new SuKienDto(entity);
		}
		return null;
	}


}
