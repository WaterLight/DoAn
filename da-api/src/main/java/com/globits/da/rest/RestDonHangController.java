package com.globits.da.rest;

import java.util.List;
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
import com.globits.da.dto.DonHangDto;
import com.globits.da.dto.KhoDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.DonHangService;
import com.globits.da.service.KhoService;

@RestController
@RequestMapping("/api/donHang")
public class RestDonHangController {
	@Autowired
	DonHangService donHangService;
	
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<DonHangDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<DonHangDto> results = donHangService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<DonHangDto>>(results, HttpStatus.OK);
	}
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<DonHangDto> save(@RequestBody DonHangDto dto) {
		DonHangDto result = donHangService.saveOrUpdate(null,dto);
		return new ResponseEntity<DonHangDto>(result, HttpStatus.OK);
	}
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<DonHangDto> save(@RequestBody DonHangDto dto ,@PathVariable UUID id) {
		DonHangDto result = donHangService.saveOrUpdate(id,dto);
		return new ResponseEntity<DonHangDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<DonHangDto> getList(@PathVariable UUID id) {
		DonHangDto result = donHangService.getCertificate(id);
		return new ResponseEntity<DonHangDto>(result, HttpStatus.OK);
	}


	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = donHangService.deleteDonHang(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<DonHangDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<DonHangDto> page =  this.donHangService.searchByPage(searchDto);
		return new ResponseEntity<Page<DonHangDto>>(page, HttpStatus.OK);
	}
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
		Boolean result = donHangService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/baoCao", method = RequestMethod.POST)
	public ResponseEntity<List<BaoCaoDto>> baoCao(@RequestBody SearchDto searchDto) {
		List<BaoCaoDto> page = this.donHangService.baoCao(searchDto);
		return new ResponseEntity<List<BaoCaoDto>>(page, HttpStatus.OK);
	}
}
