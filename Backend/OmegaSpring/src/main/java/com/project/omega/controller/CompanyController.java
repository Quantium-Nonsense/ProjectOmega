package com.project.omega.controller;


import com.project.omega.bean.dao.entity.Company;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.service.interfaces.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @PostMapping(value = "/create")
    public ResponseEntity createCompany(@RequestBody Company company) throws Exception {
        companyService.addCompany(company);
        return new ResponseEntity(company, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getAllCompany() throws NoRecordsFoundException {
        List<Company> companies = companyService.getAllCompanies();
        return new ResponseEntity(companies, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getCompanyById(@PathVariable(value = "id") Long id) throws NoRecordsFoundException {
        Company company = companyService.getCompanyById(id);
        return new ResponseEntity(company, HttpStatus.OK);
    }

    @GetMapping(value = "/{companyName}")
    public ResponseEntity getCompanyByName(@PathVariable(value = "companyName") String companyName) throws NoRecordsFoundException {
        Company company = companyService.getCompanyByName(companyName);
        return new ResponseEntity(company, HttpStatus.OK);
    }

    @PutMapping(value = {"/update/{id}"})
    public ResponseEntity updateCompanyById(@PathVariable(value = "id") Long id, @RequestBody Company companyUpdate) throws Exception {
        Company updatedCompany = companyService.updateCompanyById(id, companyUpdate);
        return new ResponseEntity(updatedCompany, HttpStatus.OK);
    }

    @DeleteMapping(value = {"/delete/{id}"})
    public ResponseEntity deleteCompanyById(@PathVariable(value = "id") Long id) throws Exception {
        Company company = companyService.deleteCompanyById(id);
        return new ResponseEntity(company, HttpStatus.OK);
    }

    //Filtering apis (by name, location....)
}
