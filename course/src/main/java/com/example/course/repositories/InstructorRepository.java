package com.example.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course.entities.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

}
