package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.PhieuNhapKho;
import com.globits.da.dto.PhieuNhapKhoDto;
@Repository
public interface PhieuNhapKhoRepository extends JpaRepository<PhieuNhapKho, UUID>{
	@Query("select count(entity.id) from PhieuNhapKho entity where entity.ma =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.PhieuNhapKhoDto(ed) from PhieuNhapKho ed")
	Page<PhieuNhapKhoDto> getListPage( Pageable pageable);
}
