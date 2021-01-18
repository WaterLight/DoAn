package com.globits.da.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.globits.core.service.FileDescriptionService;
import com.globits.da.dto.SanPhamDto;
import com.globits.da.service.SanPhamService;

@RestController
@RequestMapping("/public")
public class RestPublicController {
	@Autowired
	private Environment env;
	@Autowired
	FileDescriptionService fileDescriptionService;
	@Autowired
	SanPhamService sanPhamService;
//	@Secured({ HrConstants.ROLE_HR_MANAGEMENT, Constants.ROLE_ADMIN })
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public ResponseEntity<Page<SanPhamDto>> getPage(@PathVariable int pageIndex, @PathVariable int pageSize) {
		Page<SanPhamDto> results = sanPhamService.getPage(pageSize, pageIndex);
		return new ResponseEntity<Page<SanPhamDto>>(results, HttpStatus.OK);
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

	

}

