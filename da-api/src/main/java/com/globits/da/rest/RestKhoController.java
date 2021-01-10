package com.globits.da.rest;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.globits.da.dto.KhoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.KhoService;

@RestController
@RequestMapping("/api/kho")
public class RestKhoController {
	@Autowired
	KhoService khoService;
	
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<KhoDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<KhoDto> results = khoService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<KhoDto>>(results, HttpStatus.OK);
	}
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<KhoDto> save(@RequestBody KhoDto dto) {
		KhoDto result = khoService.saveOrUpdate(null,dto);
		return new ResponseEntity<KhoDto>(result, HttpStatus.OK);
	}
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<KhoDto> save(@RequestBody KhoDto dto ,@PathVariable UUID id) {
		KhoDto result = khoService.saveOrUpdate(id,dto);
		return new ResponseEntity<KhoDto>(result, HttpStatus.OK);
	}

//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<KhoDto> getList(@PathVariable UUID id) {
		KhoDto result = khoService.getCertificate(id);
		return new ResponseEntity<KhoDto>(result, HttpStatus.OK);
	}


//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = khoService.deleteKho(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<KhoDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<KhoDto> page =  this.khoService.searchByPage(searchDto);
		return new ResponseEntity<Page<KhoDto>>(page, HttpStatus.OK);
	}
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
		Boolean result = khoService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
