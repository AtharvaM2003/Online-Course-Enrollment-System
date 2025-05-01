package com.example.course.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.course.entities.Instructor;

@Service
public interface InstructorService {
	
	List<Instructor> findAllInstructor();
	
	Instructor findInstructorById(Long id);
	
	Instructor createInstructor(Instructor instructor);
	
	Instructor updateInstructor(Instructor instructor, Long id);
	
	boolean deleteInstructor(Long id);
	
	

}
