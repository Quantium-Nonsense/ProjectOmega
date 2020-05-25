package com.project.omega.controller;


import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.SupplierNotFoundException;
import com.project.omega.service.interfaces.SupplierService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/supplier")
public class SupplierController {
    @Autowired
    SupplierService supplierService;
    
    private final Logger LOGGER = LoggerFactory.getLogger(SupplierController.class);

    @PostMapping(value = "/create")
    public ResponseEntity createSupplier(@RequestBody Supplier supplier) throws Exception {
        LOGGER.info("Request received: /api/supplier/create");
        supplierService.addSupplier(supplier);
        LOGGER.info("Supplier created and sent in response");
        return new ResponseEntity(supplier, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public ResponseEntity getAllSuppliers() {
        LOGGER.info("Request received: /api/supplier/get");
        List<Supplier> companies = null;
        try {
            companies = supplierService.getAllSuppliers();
        } catch (NoRecordsFoundException e) {
            LOGGER.info("No suppliers found");
            return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
        }
        LOGGER.info("Suppliers found and returned in response");
        return new ResponseEntity(companies, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getSupplierById(@PathVariable(value = "id") Long id) throws SupplierNotFoundException {
        LOGGER.info("Request received: /api/supplier/{}", id);
        Supplier supplier = supplierService.getSupplierById(id);
        
        LOGGER.info("Supplier found and returned in response");
        return new ResponseEntity(supplier, HttpStatus.OK);
    }

    @GetMapping(value = "/{companyName}")
    public ResponseEntity getSupplierByName(@PathVariable(value = "companyName") String companyName) throws SupplierNotFoundException {
        LOGGER.info("Request received: /api/supplier/{}", companyName);
        Supplier supplier = supplierService.getSupplierByName(companyName);
        
        LOGGER.info("Supplier found and returned in response");
        return new ResponseEntity(supplier, HttpStatus.OK);
    }

    @PutMapping(value = {"/update/{id}"})
    public ResponseEntity updateSupplierById(@PathVariable(value = "id") Long id, @RequestBody Supplier supplierUpdate) throws Exception {
        LOGGER.info("Request received: /api/supplier/update/{}", id);
        Supplier updatedSupplier = supplierService.updateSupplierById(id, supplierUpdate);
        LOGGER.info("Supplier successfully updated");
        return new ResponseEntity(updatedSupplier, HttpStatus.OK);
    }

    @DeleteMapping(value = {"/delete/{id}"})
    public ResponseEntity deleteSupplierById(@PathVariable(value = "id") Long id) throws Exception {
        LOGGER.info("Request received: /api/supplier/delete/{}", id);
        Supplier supplier = supplierService.deleteSupplierById(id);
        LOGGER.info("Supplier successfully deleted");
        return new ResponseEntity(supplier, HttpStatus.OK);
    }
}
