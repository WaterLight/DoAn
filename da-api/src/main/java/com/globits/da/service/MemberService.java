package com.globits.da.service;

import java.util.UUID;
import org.springframework.stereotype.Service;
import com.globits.core.domain.Person;
import com.globits.core.service.GenericService;
import com.globits.da.dto.RegisterDto;
@Service
public interface MemberService  extends GenericService<Person, UUID>{
	RegisterDto registerUser(RegisterDto registerDto);
}
