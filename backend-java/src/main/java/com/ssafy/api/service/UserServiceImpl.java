package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;
	
	@Override
	public User createUser(String address, String name) {
		User user = new User();
		user.setAddress(address);
		user.setName(name);
		return userRepository.save(user);
	}

	@Override
	public String checkUser (String address, String name) {
		Optional<User> userAddress = userRepository.findByAddress(address);
		Optional<User> userName = userRepository.findByName(name);
		if(userAddress.isPresent()) {
			return "duplicateAddress";
		} else if (userName.isPresent()) {
			return "duplicateName";
		} else {
			return "OK";
		}
	}

	@Override
	public User getISUser(String address) {
		if (userRepository.findByAddress(address).get() == null) {
			return null;
		} else {
			User user = userRepository.findByAddress(address).get();
			return user;
		}
	}

	@Override
	public User getUserByAddress(String address) {
		User user = userRepository.findByAddress(address).get();
		return user;
	}

	@Override
	public User getUserByName(String name) {
		User user = userRepository.findByName(name).get();
		return user;
	}
}
