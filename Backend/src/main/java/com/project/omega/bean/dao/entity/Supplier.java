package com.project.omega.bean.dao.entity;

import lombok.Builder;

import javax.persistence.*;

@Entity
@Builder
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String companyName;

    private String email;

    private String address;

    private String postcode;

    private String town;

    private String county;

    private String country;

    private String description;

    private String contactNumber;

    private String notes;

    public Supplier() {

    }

    public Supplier(Long id, String firstName, String lastName, String companyName, String email, String address, String postcode, String town, String county, String country, String description, String contactNumber, String notes) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.town = town;
        this.county = county;
        this.country = country;
        this.description = description;
        this.contactNumber = contactNumber;
        this.notes = notes;
    }


    public Supplier(String firstName, String lastName, String companyName, String email, String address, String postcode, String town, String county, String country, String description, String contactNumber, String notes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.town = town;
        this.county = county;
        this.country = country;
        this.description = description;
        this.contactNumber = contactNumber;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getPostcode() {
        return postcode;
    }

    public String getTown() {
        return town;
    }

    public String getCounty() {
        return county;
    }

    public String getCountry() {
        return country;
    }

    public String getDescription() {
        return description;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public String getNotes() {
        return notes;
    }

    public static class SupplierBuilder {

        private Long id;
        private String firstName;
        private String lastName;
        private String companyName;
        private String email;
        private String address;
        private String postcode;
        private String town;
        private String county;
        private String country;
        private String description;
        private String contactNumber;
        private String notes;

        public SupplierBuilder() {
        }

        public SupplierBuilder setId(Long id) {
            this.id = id;
            return this;
        }

        public SupplierBuilder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public SupplierBuilder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public SupplierBuilder setCompanyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public SupplierBuilder setAddress(String address) {
            this.address = address;
            return this;
        }

        public SupplierBuilder setPostcode(String postcode) {
            this.postcode = postcode;
            return this;
        }

        public SupplierBuilder setTown(String town) {
            this.town = town;
            return this;
        }

        public SupplierBuilder setCounty(String county) {
            this.county = county;
            return this;
        }

        public SupplierBuilder setCountry(String country) {
            this.country = country;
            return this;
        }

        public SupplierBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public SupplierBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public SupplierBuilder setContactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public SupplierBuilder setNotes(String notes) {
            this.notes = notes;
            return this;
        }

        public Supplier build() {
            return new Supplier(id, firstName, lastName, companyName, address, postcode, town, county, country, email, description, contactNumber, notes);
        }
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", postcode='" + postcode + '\'' +
                ", town='" + town + '\'' +
                ", county='" + county + '\'' +
                ", country='" + country + '\'' +
                ", description='" + description + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }
}
