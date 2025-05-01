package com.example.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course.entities.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
