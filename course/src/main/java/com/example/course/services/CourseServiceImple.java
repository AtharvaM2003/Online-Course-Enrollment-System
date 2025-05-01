package com.example.course.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.course.entities.Course;import com.example.course.exceptions.CourseNotFoundException;
import com.example.course.repositories.CourseRepository;

@Service
public class CourseServiceImple implements CourseService {

	private final CourseRepository courseRepo;
	
	
	@Autowired
	public CourseServiceImple(CourseRepository courseRepo) {
		super();
		this.courseRepo = courseRepo;
	}

	@Override
	public List<Course> findAllCourses() {
		
		return courseRepo.findAll();
	}

	@Override
	public Course findCourseById(Long id) {
		
		return courseRepo.findById(id).orElseThrow(()->new CourseNotFoundException("Course not found with Id"+id));
		
	}

	@Override
	public Course createCourse(Course course) {
		
		return courseRepo.save(course);
	}

	@Override
	public Course updateCourse(Course updated, Long id) {
		Course existing=courseRepo.findById(id).
				orElseThrow(()->new CourseNotFoundException("Course not found with Id"+id));
		existing.setTitle(updated.getTitle());
		existing.setDescription(updated.getDescription());
		existing.setFees(updated.getFees());
		existing.setInstructorid(updated.getInstructorid());
		return courseRepo.save(existing);
	}

	@Override
	public boolean deleteCourse(Long id) {
		if(!courseRepo.existsById(id)) {
			throw new CourseNotFoundException("Course not found with Id"+id);
			
		}
		courseRepo.deleteById(id);
		return false;
	}
	

}
