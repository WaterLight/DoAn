package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.DonViTinh;
import com.globits.da.dto.DonViTinhDto;

@Repository
public interface DonViTinhRepository extends JpaRepository<DonViTinh, UUID>{
	@Query("select count(entity.id) from DonViTinh entity where entity.ma =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	@Query("select new com.globits.da.dto.DonViTinhDto(ed) from DonViTinh ed")
	Page<DonViTinhDto> getListPage( Pageable pageable);
}
