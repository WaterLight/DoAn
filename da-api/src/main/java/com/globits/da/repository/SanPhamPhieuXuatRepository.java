package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.SanPhamPhieuXuat;
@Repository
public interface SanPhamPhieuXuatRepository extends JpaRepository<SanPhamPhieuXuat, UUID>{

}
