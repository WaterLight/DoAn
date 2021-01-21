package com.globits.da.service.impl;

import java.util.ArrayList;
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
import com.globits.da.domain.Kho;
import com.globits.da.domain.NhanVien;
import com.globits.da.domain.PhieuNhapKho;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.domain.SanPhamPhieuNhap;
import com.globits.da.dto.PhieuNhapKhoDto;
import com.globits.da.dto.SanPhamPhieuNhapKhoDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.KhoRepository;
import com.globits.da.repository.NhanVienRepository;
import com.globits.da.repository.PhieuNhapKhoRepository;
import com.globits.da.repository.SanPhamKhoRepository;
import com.globits.da.repository.SanPhamPhieuNhapRepository;
import com.globits.da.repository.SanPhamRepository;
import com.globits.da.service.PhieuNhapKhoService;
@Service
public class PhieuNhapKhoServiceImpl extends GenericServiceImpl< PhieuNhapKho, UUID> implements  PhieuNhapKhoService{
	@Autowired
	PhieuNhapKhoRepository repos;
	@Autowired
	SanPhamPhieuNhapRepository sanPhamPhieuNhapRepository;
	
	@Autowired
	SanPhamRepository sanPhamRepository;
	@Autowired
	KhoRepository khoRepository;
	@Autowired
	NhanVienRepository nhanVienRepository;
	@Autowired
	SanPhamKhoRepository sanPhamKhoRepository;
	
	
	@Override
	public Page<PhieuNhapKhoDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public PhieuNhapKhoDto saveOrUpdate(UUID id, PhieuNhapKhoDto dto) {
		if(dto != null ) {
			PhieuNhapKho entity = null;
			NhanVien nv = null;
			Kho kho = null;
			if(dto.getId() !=null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  repos.getOne(dto.getId());
			}
			if(entity == null) {
				entity = new PhieuNhapKho();
			}
			entity.setMa(dto.getMa());
			entity.setTen(dto.getTen());
			entity.setNgayNhap(dto.getNgayNhap());
			if(dto.getNguoiNhap() != null) {
				nv = nhanVienRepository.getOne(dto.getNguoiNhap().getId());
			}
			if(dto.getKho() != null) {
				kho = khoRepository.getOne(dto.getKho().getId());
			}
			entity.setKho(kho);
			entity.setNguoiNhan(nv);
			//
			if (dto.getSanPhamPhieuNhap() != null && dto.getSanPhamPhieuNhap().size() > 0) {
				Set<SanPhamPhieuNhap> listSanPhamPhieuNhap = new HashSet<SanPhamPhieuNhap>();
				for (SanPhamPhieuNhapKhoDto sanPhamPhieuNhaplDto : dto.getSanPhamPhieuNhap()) {
					SanPhamPhieuNhap sanPhamPhieuNhap = null;
					SanPhamKho sanPhamKho = null;
					if (sanPhamPhieuNhaplDto.getId() != null) {
						sanPhamPhieuNhap = sanPhamPhieuNhapRepository.getOne(sanPhamPhieuNhaplDto.getId());
					}
					
					if (sanPhamPhieuNhap == null) {
						sanPhamPhieuNhap = new SanPhamPhieuNhap();
					}
					

					if(sanPhamPhieuNhaplDto.getSanPham() != null) {
						sanPhamPhieuNhap.setSanPham(sanPhamRepository.getOne(sanPhamPhieuNhaplDto.getSanPham().getId()));
						if(kho != null && kho.getId() != null) {
							List<SanPhamKho> listData = sanPhamKhoRepository.getListSanPhamKho(sanPhamPhieuNhaplDto.getSanPham().getId(),kho.getId());
							if(listData != null && listData.size() > 0) {
								 sanPhamKho = listData.get(0);
								 if(sanPhamKho != null) {
									 if(sanPhamKho.getSoLuong() != null) {
											sanPhamKho.setSoLuong(sanPhamPhieuNhaplDto.getSoLuong() + sanPhamKho.getSoLuong());
										}else {
											sanPhamKho.setSoLuong(sanPhamPhieuNhaplDto.getSoLuong());
										} 
								 }
								
							}
							if(sanPhamKho == null) {
								sanPhamKho = new SanPhamKho();
								sanPhamKho.setSanPham(sanPhamRepository.getOne(sanPhamPhieuNhaplDto.getSanPham().getId()));
								sanPhamKho.setKho(kho);
								sanPhamKho.setSoLuong(sanPhamPhieuNhaplDto.getSoLuong());
							}
						}
						
					}
					if(sanPhamKho !=null) {
						sanPhamKho = sanPhamKhoRepository.save(sanPhamKho);
					}
					sanPhamPhieuNhap.setKho(kho);
					sanPhamPhieuNhap.setSoLuong(sanPhamPhieuNhaplDto.getSoLuong());

					sanPhamPhieuNhap.setGia(sanPhamPhieuNhaplDto.getGia());
					sanPhamPhieuNhap.setPhieuNhapKho(entity);
					listSanPhamPhieuNhap.add(sanPhamPhieuNhap);
				}

				if (entity.getSanPhamPhieuNhap() == null) {
					entity.setSanPhamPhieuNhap(listSanPhamPhieuNhap);
				} else {
					entity.getSanPhamPhieuNhap().clear();
					entity.getSanPhamPhieuNhap().addAll(listSanPhamPhieuNhap);
				}
			}
			entity = repos.save(entity);
			if (entity != null) {
				return new PhieuNhapKhoDto(entity);
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
	public PhieuNhapKhoDto getCertificate(UUID id) {
		PhieuNhapKho entity = repos.getOne(id);
		if(entity!=null) {
			return new PhieuNhapKhoDto(entity);
		}
		return null;
	}

	@Override
	public Page<PhieuNhapKhoDto> searchByPage(SearchDto dto) {
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
		
		String sqlCount = "select count(entity.id) from PhieuNhapKho as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.PhieuNhapKhoDto(entity) from PhieuNhapKho as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ma LIKE :text or  entity.ten LIKE :text )";
		}

		
		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, PhieuNhapKhoDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<PhieuNhapKhoDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<PhieuNhapKhoDto> result = new PageImpl<PhieuNhapKhoDto>(entities, pageable, count);
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
	public List<BaoCaoDto> baoCao(SearchDto dto) {
		

		String whereClause = "";
		
		String orderBy = " ORDER BY entity.createDate DESC";
		
		String sql = "select new com.globits.da.dto.PhieuNhapKhoDto(entity) from PhieuNhapKho as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ma LIKE :text or  entity.ten LIKE :text )";
		}
		if (dto.getFromDate() != null && dto.getToDate() != null ) {
			whereClause += " AND ( entity.ngayNhap BETWEEN :fromDate and :toDate  )";
		}
		
		sql += whereClause + orderBy;


		Query q = manager.createQuery(sql, PhieuNhapKhoDto.class);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if (dto.getFromDate() != null && dto.getToDate() != null ) {
			q.setParameter("fromDate",dto.getFromDate());
			q.setParameter("toDate",dto.getToDate());
		}
		List<PhieuNhapKhoDto> entities = q.getResultList();
		List<BaoCaoDto> result = new ArrayList<BaoCaoDto>();
		if(entities != null && entities.size() > 0) {
			for (PhieuNhapKhoDto nhapdto : entities) {
				for (SanPhamPhieuNhapKhoDto sanPhamPhieuNhap : nhapdto.getSanPhamPhieuNhap()) {
					BaoCaoDto bc = new BaoCaoDto();
					if(result!= null && result.size() ==0 ) {
						bc.setTenSP(sanPhamPhieuNhap.getSanPham().getTenSP());
						bc.setSanPhamId(sanPhamPhieuNhap.getSanPham().getId());
						bc.setKhoId(sanPhamPhieuNhap.getKho().getId());
						bc.setTenKho(sanPhamPhieuNhap.getKho().getTenKho());
						bc.setSoLuongNhap(sanPhamPhieuNhap.getSoLuong());
						result.add(bc);
					}
					if(result!= null && result.size() > 0 ) {
						for (BaoCaoDto baoCaoDto : result) {
							if(baoCaoDto.getSanPhamId().equals(sanPhamPhieuNhap.getSanPham().getId()) && baoCaoDto.getKhoId().equals(sanPhamPhieuNhap.getKho().getId())) {
								if(baoCaoDto.getSoLuongNhap() == null) {
									baoCaoDto.setSoLuongNhap(0+sanPhamPhieuNhap.getSoLuong());
								}else {
									baoCaoDto.setSoLuongNhap(baoCaoDto.getSoLuongNhap()+sanPhamPhieuNhap.getSoLuong());
								}
							}else {
								bc.setTenSP(sanPhamPhieuNhap.getSanPham().getTenSP());
								bc.setSanPhamId(sanPhamPhieuNhap.getSanPham().getId());
								bc.setKhoId(sanPhamPhieuNhap.getKho().getId());
								bc.setTenKho(sanPhamPhieuNhap.getKho().getTenKho());
								bc.setSoLuongNhap(sanPhamPhieuNhap.getSoLuong());
								result.add(bc);
							}
						}
						
					}
				}
			}
		}

		return result;
	}

}
