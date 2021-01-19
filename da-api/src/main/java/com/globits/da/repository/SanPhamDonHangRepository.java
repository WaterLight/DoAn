package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.DonHang;
import com.globits.da.domain.Kho;
import com.globits.da.domain.SanPhamDonHang;
import com.globits.da.dto.DonHangDto;
import com.globits.da.dto.KhoDto;
@Repository
public interface SanPhamDonHangRepository extends JpaRepository<SanPhamDonHang, UUID>{
}
