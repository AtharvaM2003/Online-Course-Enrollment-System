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

import com.example.course.entities.Course;
import com.example.course.services.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*") 
public class CourseController {
	
	private final CourseService courseService;

	@Autowired
	public CourseController(CourseService courseService) {
		super();
		this.courseService = courseService;
	}
	
	@GetMapping
	public ResponseEntity<List<Course>> findAllInnstrctors(){
		List<Course> courseList=courseService.findAllCourses();
		return ResponseEntity.status(HttpStatus.OK).body(courseList);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Course> findCourseById(@PathVariable Long id){
		Course course=courseService.findCourseById(id);
		return ResponseEntity.status(HttpStatus.OK).body(course);
	}
	
	@PostMapping
	public ResponseEntity<Course> createCourse(@RequestBody Course course){
		Course save=courseService.createCourse(course);
		return ResponseEntity.status(HttpStatus.CREATED).body(save);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable Long id,@RequestBody Course course){
		Course newIntructor=courseService.updateCourse(course, id);
		return ResponseEntity.status(HttpStatus.OK).body(newIntructor);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Course> deleteCourse(@PathVariable Long id){
		courseService.deleteCourse(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
