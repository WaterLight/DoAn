package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.SanPham;
import com.globits.da.dto.SanPhamDto;
@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, UUID>{
	@Query("select count(entity.id) from SanPham entity where entity.maSP =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.SanPhamDto(ed) from SanPham ed")
	Page<SanPhamDto> getListPage( Pageable pageable);
}
