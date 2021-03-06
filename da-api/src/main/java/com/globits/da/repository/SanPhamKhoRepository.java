package com.globits.da.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.da.domain.SanPhamKho;
@Repository
public interface SanPhamKhoRepository extends JpaRepository<SanPhamKho, UUID>{
	@Query("select entity from SanPhamKho entity where entity.sanPham.id =?1 and entity.kho.id =?2 and entity.size.id =?3 ")
	List<SanPhamKho> getListSanPhamKho(UUID sanPhamID, UUID khoID, UUID sizeId);
	
	@Query("select entity.soLuong from SanPhamKho entity where entity.sanPham.id =?1 and entity.size.id =?2")
	Integer getNumberOfProductBySie(UUID sanPhamID, UUID sizeId);
}
