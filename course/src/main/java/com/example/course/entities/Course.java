package com.example.course.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity

public class Course {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="Title should not be blank")
	private String title;
	
	@NotBlank(message="Description should not be blank")
	private String description;
	
	@NotNull(message="Instructor should not be Null")
	private Long instructorid;
	
	@NotNull(message="Fee should not be Null")
	@Positive(message ="Fees should be positive")
	private Double fees;

	public Course(Long id, @NotBlank(message = "Title should not be blank") String title,
			@NotBlank(message = "Description should not be blank") String description,
			@NotNull(message = "Instructor should not be Null") Long instructorid,
			@NotNull(message = "Fee should not be Null") Double fees) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.instructorid = instructorid;
		this.fees = fees;
	}

	public Course(@NotBlank(message = "Title should not be blank") String title,
			@NotBlank(message = "Description should not be blank") String description,
			@NotNull(message = "Instructor should not be Null") Long instructorid,
			@NotNull(message = "Fee should not be Null") Double fees) {
		super();
		this.title = title;
		this.description = description;
		this.instructorid = instructorid;
		this.fees = fees;
	}

	public Course() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getInstructorid() {
		return instructorid;
	}

	public void setInstructorid(Long instructorid) {
		this.instructorid = instructorid;
	}

	public Double getFees() {
		return fees;
	}

	public void setFees(Double fees) {
		this.fees = fees;
	}

	@Override
	public String toString() {
		return "Course [id=" + id + ", title=" + title + ", description=" + description + ", instructorid="
				+ instructorid + ", fees=" + fees + "]";
	}
	
	
	

}
