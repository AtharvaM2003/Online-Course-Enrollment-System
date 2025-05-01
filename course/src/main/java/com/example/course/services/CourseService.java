package com.example.course.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.course.entities.Course;

@Service
public interface CourseService {

	List<Course> findAllCourses();
	
	Course findCourseById(Long id);
	
	Course createCourse(Course course);
	
	Course updateCourse(Course course, Long id);
	
	boolean deleteCourse(Long id);
	
	

}
