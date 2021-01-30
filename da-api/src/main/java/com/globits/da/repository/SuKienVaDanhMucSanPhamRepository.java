package com.globits.da.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.SuKienVaDanhMucSanPham;

@Repository
public interface SuKienVaDanhMucSanPhamRepository extends JpaRepository<SuKienVaDanhMucSanPham, UUID> {

}
