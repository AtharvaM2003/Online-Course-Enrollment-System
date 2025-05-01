package com.example.course.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.course.entities.User;

@Service
public interface UserService {

	List<User> findAllUser();
	
	User findUserById(Long id);
	
	User createUser(User user);
	
	User updateUser(Long id, User updated);
	
	boolean deleteUser(Long id);
}
