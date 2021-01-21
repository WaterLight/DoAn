package com.globits.da.rest;

import java.util.List;
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

import com.globits.da.dto.PhieuXuatKhoDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.PhieuXuatKhoService;

@RestController
@RequestMapping("/api/phieuxuatkho")
public class RestPhieuXuatKhoController {
@Autowired
PhieuXuatKhoService phieuXuatKhoService;
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
public ResponseEntity<Page<PhieuXuatKhoDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
	Page<PhieuXuatKhoDto> results = phieuXuatKhoService.getPage(pageSize, pageIndex);
	return new ResponseEntity<Page<PhieuXuatKhoDto>>(results, HttpStatus.OK);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(method = RequestMethod.POST)
public ResponseEntity<PhieuXuatKhoDto> save(@RequestBody PhieuXuatKhoDto dto) {
	PhieuXuatKhoDto result = phieuXuatKhoService.saveOrUpdate(null,dto);
	return new ResponseEntity<PhieuXuatKhoDto>(result, HttpStatus.OK);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
public ResponseEntity<PhieuXuatKhoDto> save(@RequestBody PhieuXuatKhoDto dto ,@PathVariable UUID id) {
	PhieuXuatKhoDto result = phieuXuatKhoService.saveOrUpdate(id,dto);
	return new ResponseEntity<PhieuXuatKhoDto>(result, HttpStatus.OK);
}

//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{id}", method = RequestMethod.GET)
public ResponseEntity<PhieuXuatKhoDto> getList(@PathVariable UUID id) {
	PhieuXuatKhoDto result = phieuXuatKhoService.getCertificate(id);
	return new ResponseEntity<PhieuXuatKhoDto>(result, HttpStatus.OK);
}


//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
	Boolean result = phieuXuatKhoService.deleteKho(id);
	return new ResponseEntity<Boolean>(result, HttpStatus.OK);
}

//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
public ResponseEntity<Page<PhieuXuatKhoDto>> searchByPage(@RequestBody SearchDto searchDto) {
	Page<PhieuXuatKhoDto> page =  this.phieuXuatKhoService.searchByPage(searchDto);
	return new ResponseEntity<Page<PhieuXuatKhoDto>>(page, HttpStatus.OK);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
	Boolean result = phieuXuatKhoService.checkCode(id, code);
	return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value="/baoCao", method = RequestMethod.POST)
public ResponseEntity<List<BaoCaoDto>> baoCao(@RequestBody SearchDto searchDto) {
	List<BaoCaoDto> page =  this.phieuXuatKhoService.baoCao(searchDto);
	return new ResponseEntity<List<BaoCaoDto>>(page, HttpStatus.OK);
}
}
