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
import com.globits.da.dto.ThuocTinhSanPhamDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.ThuocTinhSanPhamService;

@RestController
@RequestMapping("/api/thuocTinhSanPham")
public class RestThuocTinhSanPhamController {
	@Autowired
	ThuocTinhSanPhamService thuocTinhSanPhamService;
	
	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<ThuocTinhSanPhamDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<ThuocTinhSanPhamDto> results = thuocTinhSanPhamService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<ThuocTinhSanPhamDto>>(results, HttpStatus.OK);
	}
	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ThuocTinhSanPhamDto> save(@RequestBody ThuocTinhSanPhamDto dto) {
		ThuocTinhSanPhamDto result = thuocTinhSanPhamService.saveOrUpdate(null,dto);
		return new ResponseEntity<ThuocTinhSanPhamDto>(result, HttpStatus.OK);
	}
	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ThuocTinhSanPhamDto> save(@RequestBody ThuocTinhSanPhamDto dto ,@PathVariable UUID id) {
		ThuocTinhSanPhamDto result = thuocTinhSanPhamService.saveOrUpdate(id,dto);
		return new ResponseEntity<ThuocTinhSanPhamDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ThuocTinhSanPhamDto> getList(@PathVariable UUID id) {
		ThuocTinhSanPhamDto result = thuocTinhSanPhamService.getCertificate(id);
		return new ResponseEntity<ThuocTinhSanPhamDto>(result, HttpStatus.OK);
	}


	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = thuocTinhSanPhamService.deleteThuocTinhSanPham(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<ThuocTinhSanPhamDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<ThuocTinhSanPhamDto> page =  this.thuocTinhSanPhamService.searchByPage(searchDto);
		return new ResponseEntity<Page<ThuocTinhSanPhamDto>>(page, HttpStatus.OK);
	}
	@Secured({ Constants.ROLE_USER, Constants.ROLE_ADMIN, Constants.ROLE_STAFF })
	@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
		Boolean result = thuocTinhSanPhamService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
