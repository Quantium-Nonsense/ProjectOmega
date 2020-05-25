package com.project.omega.bean.dto;

public class ClientDTO {

    private Long Id;

    private String first_name;

    private String last_name;

    private String description;

    private String companyName;

    private String email;

    private String contactNumber;

    private String notes;

    public ClientDTO() {
    }

    public ClientDTO(Long id, String first_name, String last_name, String description, String companyName, String email, String contactNumber, String notes) {
        Id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.description = description;
        this.companyName = companyName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.notes = notes;
    }

    public ClientDTO(String first_name, String last_name, String description, String companyName, String email, String contactNumber, String notes) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.description = description;
        this.companyName = companyName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.notes = notes;
    }

    public Long getId() {
        return Id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getDescription() {
        return description;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getEmail() {
        return email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public String getNotes() {
        return notes;
    }
}
