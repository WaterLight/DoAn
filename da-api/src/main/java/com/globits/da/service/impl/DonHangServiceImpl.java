package com.globits.da.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import javax.persistence.Query;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.crm.CrmConstants;
import com.globits.crm.domain.CommonKeyCode;
import com.globits.crm.domain.CrmAdministrativeUnit;
import com.globits.crm.dto.SaleOrderDto;
import com.globits.da.domain.DonHang;
import com.globits.da.domain.DonViTinh;
import com.globits.da.domain.Kho;
import com.globits.da.domain.NhanVien;
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamDonHang;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.domain.SanPhamPhieuXuat;
import com.globits.da.dto.DonHangDto;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.SanPhamDonHangDto;
import com.globits.da.dto.SanPhamPhieuXuatDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.DonHangRepository;
import com.globits.da.repository.DonViTinhRepository;
import com.globits.da.repository.KhoRepository;
import com.globits.da.repository.NhanVienRepository;
import com.globits.da.repository.SanPhamDonHangRepository;
import com.globits.da.repository.SanPhamRepository;
import com.globits.da.service.DonHangService;
import com.globits.da.service.KhoService;

@Service
public class DonHangServiceImpl extends GenericServiceImpl<DonHang, UUID> implements DonHangService {
	@Autowired
	DonHangRepository repos;
	@Autowired
	private NhanVienRepository nhanVienRepository;
	@Autowired
	private SanPhamDonHangRepository sanPhamDonHangRepository;
	@Autowired
	private SanPhamRepository sanPhamRepository;
	@Autowired
	private DonViTinhRepository donViTinhRepository;
	
	@Override
	public Page<DonHangDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public DonHangDto saveOrUpdate(UUID id, DonHangDto dto) {
		if (dto != null) {
			DonHang entity = null;
			if (dto.getId() != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = repos.getOne(dto.getId());
			}
			if (entity == null) {
				entity = new DonHang();
			}
			entity.setTen(dto.getTen());
			entity.setMa(RandomStringUtils.randomAlphabetic(9));
			entity.setNgayDatHang(new Date());
			entity.setNgayGiaoHang(dto.getNgayGiaoHang());
			entity.setTongGia(dto.getTongGia());
			entity.setGiamGia(dto.getTongGia());
			entity.setThanhTien(dto.getThanhTien());
			entity.setTrangThai(dto.getTrangThai());
			entity.setGhiChu(dto.getGhiChu());
			NhanVien nguoiBan = null;
			if (dto.getNguoiBan() != null && dto.getNguoiBan().getId() != null) {
				nguoiBan = nhanVienRepository.getOne(dto.getNguoiBan().getId());
				if (nguoiBan == null) {
					return null;
				}
			}
			entity.setNguoiBan(nguoiBan);

			if (dto.getSanPhamDonHang() != null && dto.getSanPhamDonHang().size() > 0) {
				Set<SanPhamDonHang> listSanPhamDonHang = new HashSet<SanPhamDonHang>();
				for (SanPhamDonHangDto sanPhamDonHangDto : dto.getSanPhamDonHang()) {
					SanPhamDonHang sanPhamDonHang = null;
					if (sanPhamDonHangDto.getId() != null) {
						sanPhamDonHang = sanPhamDonHangRepository.getOne(sanPhamDonHangDto.getId());
					}

					if (sanPhamDonHang == null) {
						sanPhamDonHang = new SanPhamDonHang();
					}
					
					SanPham sanPham = null;
					if(sanPhamDonHangDto.getSanPham() != null && sanPhamDonHangDto.getSanPham().getId() != null) {
						sanPham = sanPhamRepository.getOne(sanPhamDonHangDto.getSanPham().getId());
						if(sanPham == null) {
							return null;
						}
					}
					sanPhamDonHang.setSanPham(sanPham);
					sanPhamDonHang.setDonHang(entity);
					sanPhamDonHang.setSoLuong(sanPhamDonHangDto.getSoLuong());
					sanPhamDonHang.setDonGia(sanPhamDonHangDto.getDonGia());
					sanPhamDonHang.setThanhTien(sanPhamDonHangDto.getThanhTien());
					sanPhamDonHang.setTrietKhau(sanPhamDonHangDto.getTrietKhau());
					DonViTinh donViTinh = null;
					if(sanPhamDonHangDto.getDonViTinh() != null && sanPhamDonHangDto.getDonViTinh().getId() != null) {
						donViTinh = donViTinhRepository.getOne(sanPhamDonHangDto.getDonViTinh().getId());
						if(donViTinh == null) {
							return null;
						}
					}
					sanPhamDonHang.setDonViTinh(donViTinh);
					listSanPhamDonHang.add(sanPhamDonHang);
				}

				if (entity.getSanPhamDonHang() == null) {
					entity.setSanPhamDonHang(listSanPhamDonHang);;
				} else {
					entity.getSanPhamDonHang().clear();
					entity.getSanPhamDonHang().addAll(listSanPhamDonHang);
				}
			}

			entity = repos.save(entity);
			if (entity != null) {
				return new DonHangDto(entity);
			}
		}
		return null;
	}

	@Override
	public Boolean deleteDonHang(UUID id) {
		if (id != null) {
			repos.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public DonHangDto getCertificate(UUID id) {
		DonHang entity = repos.getOne(id);
		if (entity != null) {
			return new DonHangDto(entity);
		}
		return null;
	}

	@Override
	public Page<DonHangDto> searchByPage(SearchDto dto) {
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

		String sqlCount = "select count(entity.id) from DonHang as entity where (1=1)   ";
		String sql = "select new com.globits.da.dto.DonHangDto(entity) from DonHang as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.name LIKE :text OR entity.ma LIKE :text )";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, DonHangDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<DonHangDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<DonHangDto> result = new PageImpl<DonHangDto>(entities, pageable, count);
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

}
