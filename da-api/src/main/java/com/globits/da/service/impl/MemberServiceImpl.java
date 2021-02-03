package com.globits.da.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.globits.core.Constants;
import com.globits.core.domain.Person;
import com.globits.core.domain.PersonAddress;
import com.globits.core.repository.PersonRepository;
import com.globits.core.service.PersonAddressService;
import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.core.utils.HttpUtils;
import com.globits.core.utils.SecurityUtils;
import com.globits.da.dto.RegisterDto;
import com.globits.da.service.MemberService;
import com.globits.security.domain.Role;
import com.globits.security.domain.User;
import com.globits.security.dto.UserDto;
import com.globits.security.repository.UserRepository;
import com.globits.security.service.RoleService;
import com.globits.security.service.UserService;
@Service
public class MemberServiceImpl extends GenericServiceImpl<Person, UUID> implements MemberService{
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	@Autowired
	PersonAddressService personAddressService;
	@Autowired
	PersonRepository personRepository;
	@Autowired
	UserRepository userRepository;
	
	@Override
	public RegisterDto registerUser(RegisterDto registerDto) {
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		HttpServletRequest request = attributes.getRequest();
		String ipAddr= HttpUtils.getClientIpAddr(request);
		LocalDateTime currentDate = LocalDateTime.now();
		String currentUserName = "Unknown User";
		RegisterDto result = new RegisterDto();
		
		if (registerDto != null && registerDto.getUserName() != null) {
			// check userName tồn tại hay chưa
			UserDto userDto = userService.findByUsername(registerDto.getUserName());
			if (userDto != null) {
				result.setHasUserName(true);
				return result;
			}
			// check số điện thoại tồn tại hay chưa
			List<Person> pPhoneNumber = this.getPersonByPhoneNumber(registerDto.getPhoneNumber());
			if (pPhoneNumber != null && pPhoneNumber.size() > 0) {
				result.setHasPhoneNumber(true);
				return result;
			}
			// check email tồn tại hay chưa
			if(registerDto.getEmail() != null && registerDto.getEmail().length() > 0) {
				List<Person> pEmail = this.getPersonByEmail(registerDto.getEmail());
				if (pEmail != null && pEmail.size() > 0) {
					result.setHasEmail(true);
					return result;
				}
			}
			result = new RegisterDto();
			result.setUserName(registerDto.getUserName());
			result.setPassword(registerDto.getPassword());
			// create user
			User user = new User();
			user.setUsername(registerDto.getUserName());
			user.setCreateDate(currentDate);
			user.setCreatedBy(currentUserName);
			user.setEmail(registerDto.getEmail());
			String password = SecurityUtils.getHashPassword(registerDto.getPassword());
			if (password != null && password.length() > 0) {
				user.setPassword(password);
			}
			user.setRoles(new HashSet<Role>());
			Role userRole = roleService.findByName(Constants.ROLE_USER);
			user.getRoles().add(userRole);
			user = userRepository.save(user);
			
			Person person = new Person();
			person.setDisplayName(registerDto.getDisplayName());
			person.setEmail(registerDto.getEmail());
			person.setPhoneNumber(registerDto.getPhoneNumber());
			person.setGender(registerDto.getGender());
			person.setBirthDate(registerDto.getBirthDate());
//			person.setDiachi(registerDto.getAddress());
			person.setUser(user);
			person = personRepository.save(person);
			PersonAddress pa = new PersonAddress();
			pa.setAddress(registerDto.getAddress());
			pa.setPerson(person);
			pa = personAddressService.save(pa);
			return result;
		}
		return null;
	}
	private List<Person> getPersonByPhoneNumber(String phoneNumber) {
		String sql = "select p from Person p where p.phoneNumber =:phoneNumber ";
		Query q = manager.createQuery(sql, Person.class);
		q.setParameter("phoneNumber", phoneNumber);
		List<Person> entities = q.getResultList();
		return entities;
	}
	
	private List<Person> getPersonByEmail(String email) {
		String sql = "select p from Person p where (p.Email =:email OR p.user.email =:email ) ";
		Query q = manager.createQuery(sql, Person.class);
		q.setParameter("email", email);
		List<Person> entities = q.getResultList();
		return entities;
	}
}
