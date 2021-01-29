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
import com.globits.da.domain.PhieuXuatKho;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.domain.SanPhamPhieuXuat;
import com.globits.da.domain.ThuocTinhSanPham;
import com.globits.da.dto.PhieuNhapKhoDto;
import com.globits.da.dto.PhieuXuatKhoDto;
import com.globits.da.dto.SanPhamPhieuNhapKhoDto;
import com.globits.da.dto.SanPhamPhieuXuatDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.KhoRepository;
import com.globits.da.repository.NhanVienRepository;
import com.globits.da.repository.PhieuXuatKhoRepository;
import com.globits.da.repository.SanPhamKhoRepository;
import com.globits.da.repository.SanPhamPhieuXuatRepository;
import com.globits.da.repository.SanPhamRepository;
import com.globits.da.repository.ThuocTinhSanPhamRepository;
import com.globits.da.service.PhieuXuatKhoService;

@Service
public class PhieuXuatKhoServiceImpl extends GenericServiceImpl<PhieuXuatKho, UUID> implements PhieuXuatKhoService {
	@Autowired
	PhieuXuatKhoRepository repos;
	@Autowired
	SanPhamPhieuXuatRepository sanPhamPhieuXuatRepository;

	@Autowired
	SanPhamRepository sanPhamRepository;
	@Autowired
	KhoRepository khoRepository;
	@Autowired
	NhanVienRepository nhanVienRepository;
	@Autowired
	SanPhamKhoRepository sanPhamKhoRepository;
	@Autowired
	ThuocTinhSanPhamRepository sizeRepository;

	@Override
	public Page<PhieuXuatKhoDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public PhieuXuatKhoDto saveOrUpdate(UUID id, PhieuXuatKhoDto dto) {
		if (dto != null) {
			PhieuXuatKho entity = null;
			NhanVien nv = null;
			Kho kho = null;
			if (dto.getId() != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = repos.getOne(dto.getId());
			}
			if (entity == null) {
				entity = new PhieuXuatKho();
			}
			entity.setMa(dto.getMa());
			entity.setTen(dto.getTen());
			entity.setNgayXuat(dto.getNgayXuat());
			if (dto.getNguoiXuat() != null) {
				nv = nhanVienRepository.getOne(dto.getNguoiXuat().getId());
			}
			if (dto.getKho() != null) {
				kho = khoRepository.getOne(dto.getKho().getId());
			}
			entity.setKho(kho);
			entity.setNguoiXuat(nv);
			if (dto.getSanPhamPhieuXuat() != null && dto.getSanPhamPhieuXuat().size() > 0) {
				Set<SanPhamPhieuXuat> listSanPhamPhieuXuat = new HashSet<SanPhamPhieuXuat>();
				for (SanPhamPhieuXuatDto sanPhamPhieuXuatlDto : dto.getSanPhamPhieuXuat()) {
					SanPhamPhieuXuat sanPhamPhieuXuat = null;
					ThuocTinhSanPham size = null;
					if (sanPhamPhieuXuatlDto.getSize() != null && sanPhamPhieuXuatlDto.getSize().getId() != null) {
						size = sizeRepository.getOne(sanPhamPhieuXuatlDto.getSize().getId());
						if(size == null || size.getId() != null) {
							return null;
						}
					}
					if (sanPhamPhieuXuatlDto.getId() != null) {
						sanPhamPhieuXuat = sanPhamPhieuXuatRepository.getOne(sanPhamPhieuXuatlDto.getId());
					}
					if (sanPhamPhieuXuat == null) {
						sanPhamPhieuXuat = new SanPhamPhieuXuat();
					}
					if (sanPhamPhieuXuatlDto.getSanPham() != null) {
						sanPhamPhieuXuat.setSanPham(sanPhamRepository.getOne(sanPhamPhieuXuatlDto.getSanPham().getId()));
						if (kho != null && kho.getId() != null) {
							List<SanPhamKho> listData = sanPhamKhoRepository.getListSanPhamKho(sanPhamPhieuXuatlDto.getSanPham().getId(), kho.getId(), sanPhamPhieuXuatlDto.getSize().getId());
							if (listData != null && listData.size() > 0) {
								SanPhamKho sanPhamKho = listData.get(0);
								if (sanPhamKho == null) {
									return null;
								}
								if (sanPhamKho.getSoLuong() >= sanPhamPhieuXuatlDto.getSoLuong()) {
									sanPhamKho.setSoLuong(sanPhamKho.getSoLuong() - sanPhamPhieuXuatlDto.getSoLuong());
								}
							}
						}
					}
					sanPhamPhieuXuat.setSoLuong(sanPhamPhieuXuatlDto.getSoLuong());
					sanPhamPhieuXuat.setPhieu(entity);
					sanPhamPhieuXuat.setSize(size);
					listSanPhamPhieuXuat.add(sanPhamPhieuXuat);
				}

				if (entity.getSanPhamPhieuXuat() == null) {
					entity.setSanPhamPhieuXuat(listSanPhamPhieuXuat);
				} else {
					entity.getSanPhamPhieuXuat().clear();
					entity.getSanPhamPhieuXuat().addAll(listSanPhamPhieuXuat);
				}
			}
			entity = repos.save(entity);
			if (entity != null) {
				return new PhieuXuatKhoDto(entity);
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
	public PhieuXuatKhoDto getCertificate(UUID id) {
		PhieuXuatKho entity = repos.getOne(id);
		if (entity != null) {
			return new PhieuXuatKhoDto(entity);
		}
		return null;
	}

	@Override
	public Page<PhieuXuatKhoDto> searchByPage(SearchDto dto) {
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

		String sqlCount = "select count(entity.id) from PhieuXuatKho as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.PhieuXuatKhoDto(entity) from PhieuXuatKho as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ma LIKE :text or  entity.ten LIKE :text )";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, PhieuXuatKhoDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<PhieuXuatKhoDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<PhieuXuatKhoDto> result = new PageImpl<PhieuXuatKhoDto>(entities, pageable, count);
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
	public List<BaoCaoDto> baoCao(SearchDto dto) {
		String whereClause = "";

		String orderBy = " ORDER BY entity.createDate DESC";

		String sql = "select new com.globits.da.dto.PhieuXuatKhoDto(entity) from PhieuXuatKho as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ma LIKE :text or  entity.ten LIKE :text )";
		}
		if (dto.getFromDate() != null && dto.getToDate() != null) {
			whereClause += " AND ( entity.ngayXuat BETWEEN :fromDate and :toDate  )";
		}
		if (dto.getKhoId() != null && dto.getKhoId() != null) {
			whereClause += " AND ( entity.kho.id = :khoId )";
		}

		sql += whereClause + orderBy;

		Query q = manager.createQuery(sql, PhieuXuatKhoDto.class);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if (dto.getFromDate() != null && dto.getToDate() != null) {
			q.setParameter("fromDate", dto.getFromDate());
			q.setParameter("toDate", dto.getToDate());
		}
		if (dto.getKhoId() != null && dto.getKhoId() != null) {
			q.setParameter("khoId", dto.getKhoId());
		}
		List<PhieuXuatKhoDto> entities = q.getResultList();
		List<BaoCaoDto> result = new ArrayList<BaoCaoDto>();
		List<SanPhamPhieuXuatDto> listSPPN = new ArrayList<SanPhamPhieuXuatDto>();
		
		if (entities != null && entities.size() > 0) {
			for (PhieuXuatKhoDto nhapDto : entities) {
				if (nhapDto.getSanPhamPhieuXuat() != null && nhapDto.getSanPhamPhieuXuat().size() > 0) {
					for (SanPhamPhieuXuatDto sanPhamPhieuNhap : nhapDto.getSanPhamPhieuXuat()) {
						listSPPN.add(sanPhamPhieuNhap);
					}
				}
			}
		}
		if (listSPPN != null && listSPPN.size() > 0) {
			for (SanPhamPhieuXuatDto spDto : listSPPN) {
				BaoCaoDto bc = new BaoCaoDto();
				bc.setSanPhamId(spDto.getSanPham().getId());
				bc.setTenSP(spDto.getSanPham().getTenSP());
				bc.setMaSP(spDto.getSanPham().getMaSP());
				bc.setKhoId(spDto.getPhieu().getKho().getId());
				bc.setTenKho(spDto.getPhieu().getKho().getTenKho());
				bc.setSoLuong(0);
				if (spDto.getSoLuong() != null) {
					bc.setSoLuong(spDto.getSoLuong());
				}

				if (result != null && result.size() == 0) {
					result.add(bc);
				} else {
					Boolean check = false;
					for (BaoCaoDto bcDto : result) {
						if (bc.getSanPhamId().equals(bcDto.getSanPhamId()) && bc.getKhoId().equals(bcDto.getKhoId())) {
							bcDto.setSoLuong(bcDto.getSoLuong() + bc.getSoLuong());
							check = true;
							break;
						} else {
							check = false;
						}
					}
					if (!check) {
						result.add(bc);
					}
				}
			}
		}

		return result;
	}

}
