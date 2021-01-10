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

import com.globits.da.dto.NhanVienDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.NhanVienService;

@RestController
@RequestMapping("/api/nhanvien")
public class RestNhanVienController {
	@Autowired
	NhanVienService nhanVienService;
	
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<NhanVienDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<NhanVienDto> results = nhanVienService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<NhanVienDto>>(results, HttpStatus.OK);
	}
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<NhanVienDto> save(@RequestBody NhanVienDto dto) {
		NhanVienDto result = nhanVienService.saveOrUpdate(null,dto);
		return new ResponseEntity<NhanVienDto>(result, HttpStatus.OK);
	}
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<NhanVienDto> save(@RequestBody NhanVienDto dto ,@PathVariable UUID id) {
		NhanVienDto result = nhanVienService.saveOrUpdate(id,dto);
		return new ResponseEntity<NhanVienDto>(result, HttpStatus.OK);
	}

//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<NhanVienDto> getList(@PathVariable UUID id) {
		NhanVienDto result = nhanVienService.getCertificate(id);
		return new ResponseEntity<NhanVienDto>(result, HttpStatus.OK);
	}


//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
		Boolean result = nhanVienService.deleteKho(id);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<NhanVienDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<NhanVienDto> page =  this.nhanVienService.searchByPage(searchDto);
		return new ResponseEntity<Page<NhanVienDto>>(page, HttpStatus.OK);
	}
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
	public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
		Boolean result = nhanVienService.checkCode(id, code);
		return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
