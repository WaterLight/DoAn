package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.PhieuXuatKho;
import com.globits.da.dto.PhieuXuatKhoDto;
@Repository
public interface PhieuXuatKhoRepository extends JpaRepository<PhieuXuatKho, UUID>{
	@Query("select count(entity.id) from PhieuXuatKho entity where entity.ma =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.PhieuXuatKhoDto(ed) from PhieuXuatKho ed")
	Page<PhieuXuatKhoDto> getListPage( Pageable pageable);
}
