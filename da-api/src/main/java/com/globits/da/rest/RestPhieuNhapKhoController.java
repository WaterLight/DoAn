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

import com.globits.da.dto.PhieuNhapKhoDto;
import com.globits.da.dto.PhieuXuatKhoDto;
import com.globits.da.dto.search.BaoCaoDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.PhieuNhapKhoService;

@RestController
@RequestMapping("/api/phieunhapkho")
public class RestPhieuNhapKhoController {
@Autowired
PhieuNhapKhoService phieuNhapKhoService;
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
public ResponseEntity<Page<PhieuNhapKhoDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
	Page<PhieuNhapKhoDto> results = phieuNhapKhoService.getPage(pageSize, pageIndex);
	return new ResponseEntity<Page<PhieuNhapKhoDto>>(results, HttpStatus.OK);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(method = RequestMethod.POST)
public ResponseEntity<PhieuNhapKhoDto> save(@RequestBody PhieuNhapKhoDto dto) {
	PhieuNhapKhoDto result = phieuNhapKhoService.saveOrUpdate(null,dto);
	return new ResponseEntity<PhieuNhapKhoDto>(result, HttpStatus.OK);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
public ResponseEntity<PhieuNhapKhoDto> save(@RequestBody PhieuNhapKhoDto dto ,@PathVariable UUID id) {
	PhieuNhapKhoDto result = phieuNhapKhoService.saveOrUpdate(id,dto);
	return new ResponseEntity<PhieuNhapKhoDto>(result, HttpStatus.OK);
}

//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{id}", method = RequestMethod.GET)
public ResponseEntity<PhieuNhapKhoDto> getList(@PathVariable UUID id) {
	PhieuNhapKhoDto result = phieuNhapKhoService.getCertificate(id);
	return new ResponseEntity<PhieuNhapKhoDto>(result, HttpStatus.OK);
}


//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
	Boolean result = phieuNhapKhoService.deleteKho(id);
	return new ResponseEntity<Boolean>(result, HttpStatus.OK);
}

//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value="/searchByPage", method = RequestMethod.POST)
public ResponseEntity<Page<PhieuNhapKhoDto>> searchByPage(@RequestBody SearchDto searchDto) {
	Page<PhieuNhapKhoDto> page =  this.phieuNhapKhoService.searchByPage(searchDto);
	return new ResponseEntity<Page<PhieuNhapKhoDto>>(page, HttpStatus.OK);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value = "/checkCode",method = RequestMethod.GET)
public ResponseEntity<Boolean> checkCode(@RequestParam(value = "id", required=false) UUID id, @RequestParam("code") String code) {
	Boolean result = phieuNhapKhoService.checkCode(id, code);
	return new ResponseEntity<Boolean>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
}
//@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
@RequestMapping(value="/baoCao", method = RequestMethod.POST)
public ResponseEntity<List<BaoCaoDto>> baoCao(@RequestBody SearchDto searchDto) {
	List<BaoCaoDto> page =  this.phieuNhapKhoService.baoCao(searchDto);
	return new ResponseEntity<List<BaoCaoDto>>(page, HttpStatus.OK);
}
}
