package com.globits.da.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.globits.da.Constants;
import com.globits.da.dto.SanPhamKhoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.SanPhamKhoService;

@RestController
@RequestMapping("/api/sanphamkho")
public class RestSanPhamKhoController {
	@Autowired
	SanPhamKhoService sanPhamKhoService;
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<SanPhamKhoDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<SanPhamKhoDto> page =  this.sanPhamKhoService.searchByPage(searchDto);
		return new ResponseEntity<Page<SanPhamKhoDto>>(page, HttpStatus.OK);
	}
}
