package com.globits.da.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import javax.persistence.Query;

import org.apache.commons.lang3.RandomStringUtils;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.da.Constants;
import com.globits.da.domain.DonHang;
import com.globits.da.domain.DonViTinh;
import com.globits.da.domain.Kho;
import com.globits.da.domain.NhanVien;
import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamDonHang;
import com.globits.da.domain.SanPhamKho;
import com.globits.da.domain.SanPhamPhieuXuat;
import com.globits.da.domain.ThuocTinhSanPham;
import com.globits.da.dto.DonHangDto;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.PhieuNhapKhoDto;
import com.globits.da.dto.PhieuXuatKhoDto;
import com.globits.da.dto.SanPhamDonHangDto;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.dto.SanPhamPhieuNhapKhoDto;
import com.globits.da.dto.SanPhamPhieuXuatDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.repository.DonHangRepository;
import com.globits.da.repository.DonViTinhRepository;
import com.globits.da.repository.KhoRepository;
import com.globits.da.repository.NhanVienRepository;
import com.globits.da.repository.PhieuNhapKhoRepository;
import com.globits.da.repository.SanPhamDonHangRepository;
import com.globits.da.repository.SanPhamRepository;
import com.globits.da.repository.ThuocTinhSanPhamRepository;
import com.globits.da.service.DonHangService;
import com.globits.da.service.KhoService;
import com.globits.da.service.PhieuNhapKhoService;
import com.globits.da.service.PhieuXuatKhoService;
import com.globits.security.domain.User;

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
	@Autowired
	private PhieuNhapKhoService phieuNhapKhoService;
	@Autowired
	private ThuocTinhSanPhamRepository sizeRepository;
	@Autowired
	private PhieuXuatKhoService phieuXuatKhoService;

	@Override
	public Page<DonHangDto> getPage(int pageSize, int pageIndex) {
		Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
		return repos.getListPage(pageable);
	}

	@Override
	public DonHangDto saveOrUpdate(UUID id, DonHangDto dto) {
		if (dto != null) {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			User user = null;
			LocalDateTime currentDate = LocalDateTime.now();
			String currentUserName = "Unknown User";
			boolean isNew = false;
			if (authentication != null) {
				user = (User) authentication.getPrincipal();
				currentUserName = user.getUsername();
			}
			DonHang entity = null;
			if (dto.getId() != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = repos.getOne(dto.getId());
			}
			if (entity == null) {
				isNew = true;
				entity = new DonHang();
			}
			entity.setTrangThai(dto.getTrangThai());
			if (isNew == true) {
				entity.setTrangThai(Constants.OrderStatus.newOrder.getValue());
				if (user != null && user.getPerson() != null && user.getPerson().getDisplayName() != null) {
					entity.setTen(user.getPerson().getDisplayName());
				}
				entity.setMa(RandomStringUtils.random(9, true, true));
				entity.setNgayDatHang(new Date());
			}
			entity.setNgayGiaoHang(dto.getNgayGiaoHang());
			entity.setTongGia(dto.getTongGia());
			entity.setGiamGia(dto.getGiamGia());
			entity.setThanhTien(dto.getThanhTien());
			entity.setGhiChu(dto.getGhiChu());
			if (dto.getPaymentType() == Constants.TypeOfPayMent.transferBanking.getValue()
					|| dto.getPaymentType() == Constants.TypeOfPayMent.cashing.getValue()) {
				entity.setPaymentType(dto.getPaymentType());
			}
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
					if (sanPhamDonHangDto.getSanPham() != null && sanPhamDonHangDto.getSanPham().getId() != null) {
						sanPham = sanPhamRepository.getOne(sanPhamDonHangDto.getSanPham().getId());
						if (sanPham == null) {
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
					if (sanPhamDonHangDto.getDonViTinh() != null && sanPhamDonHangDto.getDonViTinh().getId() != null) {
						donViTinh = donViTinhRepository.getOne(sanPhamDonHangDto.getDonViTinh().getId());
						if (donViTinh == null) {
							return null;
						}
					}
					ThuocTinhSanPham size = null;
					if (sanPhamDonHangDto.getSize() != null && sanPhamDonHangDto.getSize().getId() != null) {
						size = sizeRepository.getOne(sanPhamDonHangDto.getSize().getId());
						if (size == null) {
							return null;
						}
						sanPhamDonHang.setSize(size);
					}
					sanPhamDonHang.setDonViTinh(donViTinh);
					listSanPhamDonHang.add(sanPhamDonHang);
				}

				if (entity.getSanPhamDonHang() == null) {
					entity.setSanPhamDonHang(listSanPhamDonHang);
					;
				} else {
					entity.getSanPhamDonHang().clear();
					entity.getSanPhamDonHang().addAll(listSanPhamDonHang);
				}
			}

			entity = repos.save(entity);
			if (entity != null) {
				if (entity.getTrangThai() == Constants.OrderStatus.confirmOrder.getValue()) {
					PhieuXuatKhoDto phieuXuatKhoDto = new PhieuXuatKhoDto();
					Set<SanPhamPhieuXuatDto> sanPhamPhieuXuatDtos = new HashSet<SanPhamPhieuXuatDto>();
					SanPhamPhieuXuatDto sanPhamPhieuXuatDto = new SanPhamPhieuXuatDto();
					phieuXuatKhoDto.setNgayXuat(new Date());
					phieuXuatKhoDto.setTen(entity.getTen());
					phieuXuatKhoDto.setMa(entity.getMa());
					if (dto.getSanPhamDonHang() != null && dto.getSanPhamDonHang().size() > 0) {
						for (SanPhamDonHangDto spdhDto : dto.getSanPhamDonHang()) {
							if (spdhDto.getSanPham() != null && spdhDto.getSanPham().getId() != null) {
								sanPhamPhieuXuatDto.setSanPham(spdhDto.getSanPham());
							}
							if (spdhDto.getSize() != null && spdhDto.getSize().getId() != null) {
								sanPhamPhieuXuatDto.setSize(spdhDto.getSize());
							}
							if (spdhDto.getSoLuong() > 0) {
								sanPhamPhieuXuatDto.setSoLuong(spdhDto.getSoLuong());
							}
							sanPhamPhieuXuatDtos.add(sanPhamPhieuXuatDto);
						}
					}
					phieuXuatKhoDto.setSanPhamPhieuXuat(sanPhamPhieuXuatDtos);
					phieuXuatKhoService.saveOrUpdate(null, phieuXuatKhoDto);
				}
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
		System.out.println(entity.getSanPhamDonHang().size());
		if (entity != null) {
			DonHangDto dto = new DonHangDto(entity);
			System.out.println(dto.getSanPhamDonHang().size());
			return dto;
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
			whereClause += " AND ( entity.ten LIKE :text OR entity.ma LIKE :text )";
		}
		if (dto.getDateOrder() != null) {
			whereClause += " AND ( entity.ngayDatHang =: dateOrder)";
		}
		if (dto.getStatusOrder() > 0 && dto.getStatusOrder() < 5) {
			whereClause += " AND ( entity.trangThai =: statusOrder)";
		}
		sql += whereClause + orderBy;
		sqlCount += whereClause;
		Query q = manager.createQuery(sql, DonHangDto.class);
		Query qCount = manager.createQuery(sqlCount);
		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if (dto.getDateOrder() != null) {
			q.setParameter("dateOrder", dto.getDateOrder());
			qCount.setParameter("dateOrder", dto.getDateOrder());
		}
		if (dto.getStatusOrder() > 0 && dto.getStatusOrder() < 5) {
			q.setParameter("statusOrder", dto.getStatusOrder());
			qCount.setParameter("statusOrder", dto.getStatusOrder());
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

	@Override
	public List<BaoCaoDto> baoCao(SearchDto dto) {
		String whereClause = "";

		String orderBy = " ORDER BY entity.createDate DESC";

		String sql = "select new com.globits.da.dto.DonHangDto(entity) from DonHang as entity where (1=1)  ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( entity.ma LIKE :text or entity.ten LIKE :text )";
		}
		if (dto.getFromDate() != null && dto.getToDate() != null) {
			whereClause += " AND ( entity.ngayDatHang BETWEEN :fromDate and :toDate  )";
		}

		sql += whereClause + orderBy;

		Query q = manager.createQuery(sql, DonHangDto.class);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		if (dto.getFromDate() != null && dto.getToDate() != null) {
			q.setParameter("fromDate", dto.getFromDate());
			q.setParameter("toDate", dto.getToDate());
		}

		List<DonHangDto> entities = q.getResultList();
		List<BaoCaoDto> result = new ArrayList<BaoCaoDto>();
		List<SanPhamDonHangDto> listSPDH = new ArrayList<SanPhamDonHangDto>();

		if (entities == null || entities.size() == 0) {
			return result;
		}

		for (DonHangDto dhDto : entities) {
			if (dhDto.getSanPhamDonHang() != null && dhDto.getSanPhamDonHang().size() > 0) {
				for (SanPhamDonHangDto spdhDto : dhDto.getSanPhamDonHang()) {
					listSPDH.add(spdhDto);
				}
			}
		}

		if (listSPDH == null || listSPDH.size() == 0) {
			return result;
		}

		for (SanPhamDonHangDto spdh : listSPDH) {
			BaoCaoDto bcDto = new BaoCaoDto();
			bcDto.setSanPhamId(spdh.getSanPham().getId());
			bcDto.setTenSP(spdh.getSanPham().getTenSP());
			bcDto.setMaSP(spdh.getSanPham().getMaSP());
			bcDto.setSoLuongBan(0);
			if (spdh.getSoLuong() != null) {
				bcDto.setSoLuongBan(spdh.getSoLuong());
			}
			bcDto.setTongTienBan(0.0);
			if (spdh.getDonGia() != null) {
				bcDto.setTongTienBan(spdh.getDonGia());
			}
			if (result.size() == 0) {
				result.add(bcDto);
			} else {
				for (BaoCaoDto bc : result) {
					Boolean check = false;
					if (bcDto.getSanPhamId().equals(bc.getSanPhamId())) {
						bc.setSoLuongBan(bc.getSoLuongBan() + bcDto.getSoLuongBan());
						bc.setTongTienBan(bc.getTongTienBan() + bcDto.getTongTienBan());
						check = true;
						break;
					} else {
						check = false;
					}
					if (!check) {
						result.add(bcDto);
						break;
					}
				}
			}
		}

		List<BaoCaoDto> listPhieuNhap = phieuNhapKhoService.baoCao(dto);
		List<BaoCaoDto> listPhieuNhapGroupBySPID = new ArrayList<BaoCaoDto>();
		if (listPhieuNhap != null && listPhieuNhap.size() > 0) {
			for (BaoCaoDto bcDto : listPhieuNhap) {
				if (listPhieuNhapGroupBySPID.size() == 0) {
					listPhieuNhapGroupBySPID.add(bcDto);
				} else {
					for (BaoCaoDto bc : listPhieuNhapGroupBySPID) {
						Boolean check = false;
						if (bc.getSanPhamId().equals(bcDto.getSanPhamId())) {
							bc.setSoLuong(bc.getSoLuong() + bcDto.getSoLuong());
							bc.setTongTienNhap(bc.getTongTienNhap() + bcDto.getTongTienNhap());
							check = true;
							break;
						} else {
							check = false;
						}
						if (!check) {
							listPhieuNhapGroupBySPID.add(bcDto);
							break;
						}
					}
				}
			}
		}

		if (listPhieuNhapGroupBySPID.size() > 0) {
			for (BaoCaoDto pn : listPhieuNhapGroupBySPID) {
				for (BaoCaoDto bc : result) {
					if (pn.getSanPhamId().equals(bc.getSanPhamId())) {
						pn.setSoLuongBan(bc.getSoLuongBan());
						pn.setTongTienBan(bc.getTongTienBan());
					}
				}
			}
		}

		return listPhieuNhapGroupBySPID;
	}

}
