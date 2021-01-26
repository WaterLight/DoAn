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
import com.globits.da.dto.DonViTinhDto;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.DonViTinhService;

@RestController
@RequestMapping("/api/donvitinh")
public class RestDonViTinhController {
	@Autowired
	DonViTinhService donViTinhService;
	
@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<DonViTinhDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<DonViTinhDto> results = donViTinhService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<DonViTinhDto>>(results, HttpStatus.OK);
	}
@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<DonViTinhDto> save(@RequestBody DonViTinhDto dto) {
		DonViTinhDto result = donViTinhService.saveOrUpdate(null,dto);
		return new ResponseEntity<DonViTinhDto>(result, HttpStatus.OK);
	}
@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<DonViTinhDto> save(@RequestBody DonViTinhDto dto ,@PathVariable UUID id) {
		DonViTinhDto result = donViTinhService.saveOrUpdate(id,dto);
		return new ResponseEntity<DonViTinhDto>(result, HttpStatus.OK);
	}

@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<DonViTinhDto> getList(@PathVariable UUID id) {
		DonViTinhDto result = donViTinhService.getCertificate(id);
		return new ResponseEntity<DonViTinhDto>(result, HttpStatus.OK);
	}


@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = donViTinhService.deleteKho(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<DonViTinhDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<DonViTinhDto> page =  this.donViTinhService.searchByPage(searchDto);
		return new ResponseEntity<Page<DonViTinhDto>>(page, HttpStatus.OK);
	}
@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
		Boolean result = donViTinhService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
