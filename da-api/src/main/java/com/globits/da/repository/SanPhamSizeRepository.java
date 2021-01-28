package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.SanPham;
import com.globits.da.domain.SanPhamSize;
import com.globits.da.dto.SanPhamDto;
@Repository
public interface SanPhamSizeRepository extends JpaRepository<SanPhamSize, UUID>{
	
}
