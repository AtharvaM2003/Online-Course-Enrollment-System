package com.example.course.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.course.entities.Enrollment;


@Service
public interface EnrollmentService {

	List<Enrollment> findAllEnrollments();
	
	Enrollment findEnrollmentById(Long id);
	
	Enrollment createEnrollment(Enrollment enrollment);
	
	Enrollment updateEnrollment(Enrollment enrollment, Long id);
	
	List<Enrollment> findByUserid(Long userid);
	boolean deleteEnrollment(Long id);
}
