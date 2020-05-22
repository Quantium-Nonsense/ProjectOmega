package com.quantiumnonsense.omega.bean.dao.entity;


import lombok.Builder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table (name = "clients")
@Builder
public class Client implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String description;

    @NotBlank
    private String companyName;

    @NotBlank
    private String email;

    @NotBlank
    private String contactNumber;

    @NotBlank
    private String notes;

    public Client() {
    }

    public Client(Long id, @NotBlank String first_name, @NotBlank String last_name, @NotBlank String description, @NotBlank String companyName, @NotBlank String email, @NotBlank String contactNumber, @NotBlank String notes) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.description = description;
        this.companyName = companyName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


}