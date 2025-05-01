package com.example.course.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity

public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="Name cannot be blank")
	private String name;
	
	@NotBlank(message="Email cannot be blank")
	@Email(message="Enter Valid Email")
	private String email;
	
	@NotBlank(message="Password cannot be blank")
	private String password;
	
	@NotNull(message="Phone Number cannot be Null")
	private Long phone;
	
	@NotBlank(message="UserType cannot be blank")
	private String usertype;

	
	public User(@NotBlank(message = "Name cannot be blank") String name,
			@NotBlank(message = "Email cannot be blank") @Email(message = "Enter Valid Email") String email,
			@NotBlank(message = "Password cannot be blank") String password,
			@NotNull(message = "Phone Number cannot be Null") Long phone,
			@NotBlank(message = "UserType cannot be blank") String usertype) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.usertype = usertype;
	}

	public User(Long id, @NotBlank(message = "Name cannot be blank") String name,
			@NotBlank(message = "Email cannot be blank") @Email(message = "Enter Valid Email") String email,
			@NotBlank(message = "Password cannot be blank") String password,
			@NotNull(message = "Phone Number cannot be Null") Long phone,
			@NotBlank(message = "UserType cannot be blank") String usertype) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.usertype = usertype;
	}

	public User() {
		super();
	}
	

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", phone=" + phone
				+ ", usertype=" + usertype + "]";
	}


}
