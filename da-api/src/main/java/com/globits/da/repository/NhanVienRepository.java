package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.NhanVien;
import com.globits.da.dto.NhanVienDto;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, UUID>{
	@Query("select count(entity.id) from NhanVien entity where entity.maNV =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.NhanVienDto(ed) from NhanVien ed")
	Page<NhanVienDto> getListPage( Pageable pageable);
}
