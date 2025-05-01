package com.example.course.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.course.entities.Instructor;
import com.example.course.exceptions.InstructorNotFoundException;
import com.example.course.repositories.InstructorRepository;

@Service
public class InstructorServiceImple implements InstructorService {

	private final InstructorRepository instructorRepo;
	
	@Autowired
	public InstructorServiceImple(InstructorRepository instructorRepo) {
		super();
		this.instructorRepo = instructorRepo;
	}

	@Override
	public List<Instructor> findAllInstructor() {
		
		return instructorRepo.findAll();
	}

	@Override
	public Instructor findInstructorById(Long id) {
		
		return instructorRepo.findById(id).orElseThrow(()->new InstructorNotFoundException("Instructor not found with Id"+id));
		
	}

	@Override
	public Instructor createInstructor(Instructor instructor) {
		
		return instructorRepo.save(instructor);
	}

	@Override
	public Instructor updateInstructor(Instructor updated, Long id) {
		Instructor existing=instructorRepo.findById(id).
				orElseThrow(()->new InstructorNotFoundException("Instructor not found with Id"+id));
		existing.setName(updated.getName());
		existing.setExpertise(updated.getExpertise());
		return instructorRepo.save(existing);
	}

	@Override
	public boolean deleteInstructor(Long id) {
		if(!instructorRepo.existsById(id)) {
			throw new InstructorNotFoundException("Instructor not found with Id"+id);
			
		}
		instructorRepo.deleteById(id);
		return false;
	}
	
	

}
