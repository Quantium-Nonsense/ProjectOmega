package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.List;

public interface SupplierService {
    Supplier addSupplier(Supplier supplier);
    List<Supplier> getAllSuppliers() throws NoRecordsFoundException;
    Supplier getSupplierById(Long id) throws NoRecordsFoundException;
    Supplier getSupplierByName(String companyName) throws NoRecordsFoundException;
    Supplier updateSupplierById(Long id, Supplier supplierDetails) throws NoRecordsFoundException;
    Supplier deleteSupplierById(Long id) throws NoRecordsFoundException;
}
