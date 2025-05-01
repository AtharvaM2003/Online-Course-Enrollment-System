package com.example.course.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.course.entities.Enrollment;
import com.example.course.exceptions.EnrollmentNotFoundException;
import com.example.course.repositories.EnrollmentRepository;

@Service
public class EnrollmentServiceImple implements EnrollmentService {

	private final EnrollmentRepository enrollmentRepo;
	
	
	@Autowired
	public EnrollmentServiceImple(EnrollmentRepository enrollmentRepo) {
		super();
		this.enrollmentRepo = enrollmentRepo;
	}

	@Override
	public List<Enrollment> findAllEnrollments() {
		
		return enrollmentRepo.findAll();
	}

	@Override
	public Enrollment findEnrollmentById(Long id) {
		
		return enrollmentRepo.findById(id).orElseThrow(()->new EnrollmentNotFoundException("Enrollment not found with Id: "+id));
		
	}

	@Override
	public Enrollment createEnrollment(Enrollment enrollment) {
		
		return enrollmentRepo.save(enrollment);
	}

	@Override
	public Enrollment updateEnrollment(Enrollment updated, Long id) {
		Enrollment existing=enrollmentRepo.findById(id).
				orElseThrow(()->new EnrollmentNotFoundException("Enrollment not found with Id: "+id));
		existing.setUserid(updated.getUserid());
		existing.setCourseid(updated.getCourseid());
		existing.setEnrollmentdate(updated.getEnrollmentdate());
		return enrollmentRepo.save(existing);
	}

	@Override
	public boolean deleteEnrollment(Long id) {
		if(!enrollmentRepo.existsById(id)) {
			throw new EnrollmentNotFoundException("Enrollment not found with Id: "+id);
			
		}
		enrollmentRepo.deleteById(id);
		return false;
	}

	@Override
	public List<Enrollment> findByUserid(Long userId) {
	    return enrollmentRepo.findByUserid(userId); // or findByUserId(userId)
	}

	

}