package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.DonHang;
import com.globits.da.domain.Kho;
import com.globits.da.dto.DonHangDto;
import com.globits.da.dto.KhoDto;
@Repository
public interface DonHangRepository extends JpaRepository<DonHang, UUID>{
	@Query("select count(entity.id) from DonHang entity where entity.ma =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.DonHangDto(ed) from DonHang ed")
	Page<DonHangDto> getListPage( Pageable pageable);
}
