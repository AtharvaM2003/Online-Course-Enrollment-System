package com.example.course.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.course.entities. Enrollment;
import com.example.course.services. EnrollmentService;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*") 
public class EnrollmentController {
	
	private final  EnrollmentService enrollmentService;

	@Autowired
	public EnrollmentController( EnrollmentService enrollmentService) {
		super();
		this.enrollmentService = enrollmentService;
	}
	
	@GetMapping
	public ResponseEntity<List< Enrollment>> findAllInnstrctors(){
		List< Enrollment> enrollmentList=enrollmentService.findAllEnrollments();
		return ResponseEntity.status(HttpStatus.OK).body(enrollmentList);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity< Enrollment> findEnrollmentById(@PathVariable Long id){
		 Enrollment enrollment=enrollmentService.findEnrollmentById(id);
		return ResponseEntity.status(HttpStatus.OK).body(enrollment);
	}
	
	@PostMapping
	public ResponseEntity< Enrollment> createEnrollment(@RequestBody  Enrollment enrollment){
		 Enrollment save=enrollmentService.createEnrollment(enrollment);
		return ResponseEntity.status(HttpStatus.CREATED).body(save);
	}
	@GetMapping("/user/{id}")
	public ResponseEntity<List<Enrollment>> findByUserid(@PathVariable Long id) {
	    List<Enrollment> enrollments = enrollmentService.findByUserid(id);
		return ResponseEntity.status(HttpStatus.OK).body(enrollments);
	}

	
	@PutMapping("/{id}")
	public ResponseEntity< Enrollment> updateEnrollment(@PathVariable Long id,@RequestBody  Enrollment enrollment){
		 Enrollment newIntructor=enrollmentService.updateEnrollment(enrollment, id);
		return ResponseEntity.status(HttpStatus.OK).body(newIntructor);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity< Enrollment> deleteEnrollment(@PathVariable Long id){
		enrollmentService.deleteEnrollment(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}