package com.project.omega.controller;


import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.SupplierNotFoundException;
import com.project.omega.service.interfaces.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/supplier")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SupplierController {
    @Autowired
    SupplierService supplierService;

    @PostMapping(value = "/create")
    public ResponseEntity createSupplier(@RequestBody Supplier supplier) throws Exception {
        supplierService.addSupplier(supplier);
        return new ResponseEntity(supplier, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getAllSuppliers() {
        List<Supplier> companies = null;
        try {
            companies = supplierService.getAllSuppliers();
        } catch (NoRecordsFoundException e) {
            return ResponseEntity.status(HttpStatus.OK).body("No suppliers found.");
        }
        return new ResponseEntity(companies, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getSupplierById(@PathVariable(value = "id") Long id) throws SupplierNotFoundException {
        Supplier supplier = supplierService.getSupplierById(id);
        return new ResponseEntity(supplier, HttpStatus.OK);
    }

    @GetMapping(value = "/{companyName}")
    public ResponseEntity getSupplierByName(@PathVariable(value = "companyName") String companyName) throws SupplierNotFoundException {
        Supplier supplier = supplierService.getSupplierByName(companyName);
        return new ResponseEntity(supplier, HttpStatus.OK);
    }

    @PutMapping(value = {"/update/{id}"})
    public ResponseEntity updateSupplierById(@PathVariable(value = "id") Long id, @RequestBody Supplier supplierUpdate) throws Exception {
        Supplier updatedSupplier = supplierService.updateSupplierById(id, supplierUpdate);
        return new ResponseEntity(updatedSupplier, HttpStatus.OK);
    }

    @DeleteMapping(value = {"/delete/{id}"})
    public ResponseEntity deleteSupplierById(@PathVariable(value = "id") Long id) throws Exception {
        Supplier supplier = supplierService.deleteSupplierById(id);
        return new ResponseEntity(supplier, HttpStatus.OK);
    }
}
