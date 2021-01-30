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
import org.springframework.web.bind.annotation.RestController;

import com.globits.da.Constants;
import com.globits.da.dto.SuKienDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.SuKienService;

@RestController
@RequestMapping("/api/sukien")
public class RestSuKienController {
	@Autowired
	SuKienService suKienService;

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<SuKienDto>> searchByPage(@RequestBody SearchDto searchDto) {
		Page<SuKienDto> page = suKienService.searchByPage(searchDto);
		return new ResponseEntity<Page<SuKienDto>>(page, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<SuKienDto> getList(@PathVariable UUID id) {
		SuKienDto result = suKienService.getById(id);
		return new ResponseEntity<SuKienDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<SuKienDto> save(@RequestBody SuKienDto dto) {
		SuKienDto result = suKienService.saveOrUpdate(null, dto);
		return new ResponseEntity<SuKienDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<SuKienDto> save(@RequestBody SuKienDto dto, @PathVariable String id) {
		SuKienDto result = suKienService.saveOrUpdate(UUID.fromString(id), dto);
		return new ResponseEntity<SuKienDto>(result, HttpStatus.OK);
	}

	@Secured({ Constants.ROLE_STAFF, Constants.ROLE_ADMIN, Constants.ROLE_USER })
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> delete(@PathVariable String id) {
		Boolean result = suKienService.deleteById(UUID.fromString(id));
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

}
