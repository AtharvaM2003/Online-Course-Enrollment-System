package com.example.course.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Enrollment {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message="User id should not be blank")
	private Long userid;
	

	@NotNull(message="Course id should not be blank")
	private Long courseid;
	

	@NotNull(message="Enrollment date should not be blank")
	private LocalDate enrollmentdate;


	public Enrollment(Long id, @NotNull(message = "User id should not be blank") Long userid,
			@NotNull(message = "Course id should not be blank") Long courseid,
			@NotNull(message = "Enrollment date should not be blank") LocalDate enrollmentdate) {
		super();
		this.id = id;
		this.userid = userid;
		this.courseid = courseid;
		this.enrollmentdate = enrollmentdate;
	}


	public Enrollment(@NotNull(message = "User id should not be blank") Long userid,
			@NotNull(message = "Course id should not be blank") Long courseid,
			@NotNull(message = "Enrollment date should not be blank") LocalDate enrollmentdate) {
		super();
		this.userid = userid;
		this.courseid = courseid;
		this.enrollmentdate = enrollmentdate;
	}


	public Enrollment() {
		super();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getUserid() {
		return userid;
	}


	public void setUserid(Long userid) {
		this.userid = userid;
	}


	public Long getCourseid() {
		return courseid;
	}


	public void setCourseid(Long courseid) {
		this.courseid = courseid;
	}


	public LocalDate getEnrollmentdate() {
		return enrollmentdate;
	}


	public void setEnrollmentdate(LocalDate enrollmentdate) {
		this.enrollmentdate = enrollmentdate;
	}


	@Override
	public String toString() {
		return "Enrollment [id=" + id + ", userid=" + userid + ", courseid=" + courseid + ", enrollmentdate="
				+ enrollmentdate + "]";
	}
	
	

}
