package com.example.course.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Instructor {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="Name should not be blank")
	private String name;

	@NotBlank(message="Expertise should not be blank")
	private String expertise;

	public Instructor(Long id, @NotBlank(message = "Name should not be blank") String name,
			@NotBlank(message = "Expertise should not be blank") String expertise) {
		super();
		this.id = id;
		this.name = name;
		this.expertise = expertise;
	}

	public Instructor() {
		super();
	}

	public Instructor(@NotBlank(message = "Name should not be blank") String name,
			@NotBlank(message = "Expertise should not be blank") String expertise) {
		super();
		this.name = name;
		this.expertise = expertise;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExpertise() {
		return expertise;
	}

	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}

	@Override
	public String toString() {
		return "Instructor [id=" + id + ", name=" + name + ", expertise=" + expertise + "]";
	}
	
	
	
}
