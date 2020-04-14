package com.project.omega.controller;


import com.project.omega.bean.Industry;
import com.project.omega.exceptions.DuplicateIndustryException;
import com.project.omega.exceptions.IndustryNotFoundException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/industry")
public class IndustryController {

    @Autowired
    IndustryService industryService;

    @PostMapping(value="/create")
    public ResponseEntity createIndustry(@RequestBody Industry industry) throws DuplicateIndustryException
    {
        industryService.createIndustry(industry);
        return new ResponseEntity(industry, HttpStatus.CREATED);
    }
    //get all api
    @GetMapping(value="/get")
    public ResponseEntity getAllIndustries() throws NoRecordsFoundException
    {
        List<Industry> industries = industryService.getAllIndustry();
        return new ResponseEntity(industries, HttpStatus.OK);
    }
    //get by id api

    @GetMapping(value="/{id}")
    public ResponseEntity getIndustryById(@PathVariable(value = "id") Long id ) throws NoRecordsFoundException
    {
        Industry industry = industryService.getIndustryById(id);
        return new ResponseEntity (industry, HttpStatus.OK);
    }
    //delete by id
    @DeleteMapping(value="/{id}")
    public ResponseEntity deleteIndustryById(@PathVariable(value= "id") long id) throws IndustryNotFoundException
    {
        Industry industry = industryService.deleteIndustryById(id);

        return new ResponseEntity(industry, HttpStatus.I_AM_A_TEAPOT);
    }

    //update by id
    @PatchMapping(value = {"/update/{id}"})
    public ResponseEntity updateIndustry(@PathVariable (value = "id") Long id, @RequestBody Industry update) throws Exception
    {
        Industry newIndustry = industryService.updateIndustry(id, update);
        return new ResponseEntity(newIndustry, HttpStatus.OK);
    }

}




