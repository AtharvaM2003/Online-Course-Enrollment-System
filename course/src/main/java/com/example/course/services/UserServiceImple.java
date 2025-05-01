package com.example.course.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.course.entities.User;
import com.example.course.exceptions.UserNotFoundException;
import com.example.course.repositories.UserRepository;

import jakarta.validation.Valid;

@Service
public class UserServiceImple implements UserService {

	private final UserRepository userRepo;
	
	@Autowired
	public UserServiceImple(UserRepository userRepo) {
		super();
		this.userRepo = userRepo;
	}

	@Override
	public List<User> findAllUser() {
		
		return userRepo.findAll();
	}

	@Override
	public User findUserById(Long id) {
		
		return userRepo.findById(id).orElseThrow(()->new UserNotFoundException("User not found with ID: "+id));
	}

	@Override
	public User createUser(@Valid User user) {
		
		return userRepo.save(user);
	}

	@Override
	public User updateUser(Long id,@Valid User updated) {
		User existing=userRepo.findById(id)
				.orElseThrow(()->new UserNotFoundException("User not found with ID: "+id));
		existing.setName(updated.getName());
		existing.setEmail(updated.getEmail());
		existing.setPassword(updated.getPassword());
		existing.setUsertype(updated.getUsertype());
		existing.setPhone(updated.getPhone());
		return userRepo.save(existing);
	}

	@Override
	public boolean deleteUser(Long id) {
		if(!userRepo.existsById(id)) {
			throw new UserNotFoundException("User not found with ID: "+id);
		}
		userRepo.deleteById(id);
		return false;
	}

}
