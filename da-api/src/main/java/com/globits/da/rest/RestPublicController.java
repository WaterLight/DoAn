package com.globits.da.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.globits.core.service.FileDescriptionService;
import com.globits.da.dto.DanhMucSanPhamDto;
import com.globits.da.dto.RegisterDto;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.dto.SanPhamSizeDto;
import com.globits.da.dto.SuKienDto;
import com.globits.da.dto.search.SearchDto;
import com.globits.da.service.DanhMucSanPhamService;
import com.globits.da.service.MemberService;
import com.globits.da.service.SanPhamKhoService;
import com.globits.da.service.SanPhamService;
import com.globits.da.service.SuKienService;

@RestController
@RequestMapping("/public")
public class RestPublicController {
	@Autowired
	private Environment env;
	@Autowired
	FileDescriptionService fileDescriptionService;
	@Autowired
	SanPhamService sanPhamService;
	@Autowired
	DanhMucSanPhamService danhMucSanPhamService;
	@Autowired
	MemberService memberService; 
	@Autowired
	SuKienService suKienService; 
	@Autowired
	SanPhamKhoService sanPhamKhoService;
	@RequestMapping(value = "getProductById/{id}", method = RequestMethod.GET)
	public ResponseEntity<SanPhamDto> getList(@PathVariable UUID id) {
		SanPhamDto result = sanPhamService.getCertificate(id);
		return new ResponseEntity<SanPhamDto>(result, HttpStatus.OK);
	}
	@RequestMapping(value = "getNumberOfProduct/{productId}/{sizeId}", method = RequestMethod.GET)
	public Integer getNumberOfProductBySize(@PathVariable UUID productId, @PathVariable UUID sizeId) {
		Integer result = sanPhamKhoService.numberOfProductBySize(productId, sizeId);
		return result;
	}
	@RequestMapping(value = "/getListEvent", method = RequestMethod.POST)
	public ResponseEntity<Page<SuKienDto>> getListEvent(@RequestBody SearchDto dto ) {
		Page<SuKienDto> results = suKienService.searchByPage(dto);
		return new ResponseEntity<Page<SuKienDto>>(results, HttpStatus.OK);
	}
	@RequestMapping(value = "/getListProductByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<SanPhamDto>> getPage(@RequestBody SearchDto dto ) {
		Page<SanPhamDto> results = sanPhamService.searchByPagePublic(dto);
		return new ResponseEntity<Page<SanPhamDto>>(results, HttpStatus.OK);
	}
	@RequestMapping(value = "/getListProductCategoryByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<DanhMucSanPhamDto>> getListProductCategoryByPage(@RequestBody SearchDto dto ) {
		Page<DanhMucSanPhamDto> results = danhMucSanPhamService.searchByPage(dto);
		return new ResponseEntity<Page<DanhMucSanPhamDto>>(results, HttpStatus.OK);
	}
	@RequestMapping(value = "/searchByPageGroupByName", method = RequestMethod.POST)
	public ResponseEntity<Page<SanPhamSizeDto>> searchByPageGroupByName(@RequestBody SearchDto searchDto) {
		Page<SanPhamSizeDto> page = this.sanPhamService.searchByPageGroupByName(searchDto);
		return new ResponseEntity<Page<SanPhamSizeDto>>(page, HttpStatus.OK);
	}
	
	@RequestMapping(path = "/getImage/{filename}/{type}", method = RequestMethod.GET)
	public void getImage(HttpServletResponse response, @PathVariable String filename, @PathVariable String type) throws IOException {
		String path = "";
		if(env.getProperty("da.file.folder") != null) {
			path = env.getProperty("da.file.folder");
		}
	    File file = new File(path+filename+"."+type);
//	    if(file.exists()) {
	        String contentType = "application/octet-stream";
	        response.setContentType(contentType);
	        OutputStream out = response.getOutputStream();
	        FileInputStream in = new FileInputStream(file);
	        // copy from in to out
	        IOUtils.copy(in, out);
	        out.close();
	        in.close();
//	    }else {
//	        throw new FileNotFoundException();
//	    }
	}
	
	@RequestMapping(path = "/image/{filename:.+}", method = RequestMethod.GET)
	public void getImageByName(HttpServletResponse response, @PathVariable(value = "filename") String filename) throws IOException {
		String path = "";
		if(env.getProperty("da.file.folder") != null) {
			path = env.getProperty("da.file.folder");
		}
	    File file = new File(path+filename);
	    if(file.exists()) {
	        String contentType = "application/octet-stream";
	        response.setContentType(contentType);
	        OutputStream out = response.getOutputStream();
	        FileInputStream in = new FileInputStream(file);
	        // copy from in to out
	        IOUtils.copy(in, out);
	        out.close();
	        in.close();
	    }else {
	        throw new FileNotFoundException();
	    }
	}

	@RequestMapping(value = "user/register", method = RequestMethod.POST)
	public RegisterDto registerUser(@RequestBody RegisterDto registerDto) {
		RegisterDto dto = memberService.registerUser(registerDto);
		return dto;
	}

}

