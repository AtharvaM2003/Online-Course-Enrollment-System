package com.example.course.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course.entities.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long>{
	
	List<Enrollment> findByUserid(Long userid);
}
