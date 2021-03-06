package com.globits.da.rest;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.globits.da.Constants;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.dto.SanPhamSizeDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.SanPhamService;

@RestController
@RequestMapping("/api/sanpham")
public class RestSanPhamController {
	@Autowired
	SanPhamService sanPhamService;

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<SanPhamDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<SanPhamDto> results = sanPhamService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<SanPhamDto>>(results, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<SanPhamDto> save(@RequestBody SanPhamDto dto) {
		SanPhamDto result = sanPhamService.saveOrUpdate(null, dto);
		return new ResponseEntity<SanPhamDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<SanPhamDto> save(@RequestBody SanPhamDto dto, @PathVariable UUID id) {
		SanPhamDto result = sanPhamService.saveOrUpdate(id, dto);
		return new ResponseEntity<SanPhamDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<SanPhamDto> getList(@PathVariable UUID id) {
		SanPhamDto result = sanPhamService.getCertificate(id);
		return new ResponseEntity<SanPhamDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = sanPhamService.deleteKho(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<SanPhamDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<SanPhamDto> page = this.sanPhamService.searchByPageAdmin(searchDto);
		return new ResponseEntity<Page<SanPhamDto>>(page, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/checkCode", method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required = false) UUID id,
			@RequestParam("code") String code) {
		Boolean result = sanPhamService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/searchByPageGroupByName", method = RequestMethod.POST)
	public ResponseEntity<Page<SanPhamSizeDto>> searchByPageGroupByName(@RequestBody SearchDto searchDto) {
		Page<SanPhamSizeDto> page = this.sanPhamService.searchByPageGroupByName(searchDto);
		return new ResponseEntity<Page<SanPhamSizeDto>>(page, HttpStatus.OK);
	}
}
