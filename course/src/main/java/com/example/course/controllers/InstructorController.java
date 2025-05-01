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
import org.springframework.web.bind.annotation.RestController;

import com.example.course.entities.Instructor;
import com.example.course.services.InstructorService;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*") 
public class InstructorController {
	
	private final InstructorService instructorService;

	@Autowired
	public InstructorController(InstructorService instructorService) {
		super();
		this.instructorService = instructorService;
	}
	
	@GetMapping
	public ResponseEntity<List<Instructor>> findAllInnstrctors(){
		List<Instructor> instructorList=instructorService.findAllInstructor();
		return ResponseEntity.status(HttpStatus.OK).body(instructorList);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Instructor> findInstructorById(@PathVariable Long id){
		Instructor instructor=instructorService.findInstructorById(id);
		return ResponseEntity.status(HttpStatus.OK).body(instructor);
	}
	
	@PostMapping
	public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor){
		Instructor save=instructorService.createInstructor(instructor);
		return ResponseEntity.status(HttpStatus.CREATED).body(save);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Instructor> updateInstructor(@PathVariable Long id,@RequestBody Instructor instructor){
		Instructor newIntructor=instructorService.updateInstructor(instructor, id);
		return ResponseEntity.status(HttpStatus.OK).body(newIntructor);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Instructor> deleteInstructor(@PathVariable Long id){
		instructorService.deleteInstructor(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
