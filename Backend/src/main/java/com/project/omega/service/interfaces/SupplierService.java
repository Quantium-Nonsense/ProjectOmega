package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.SupplierNotFoundException;

import java.util.List;

public interface SupplierService {
    Supplier addSupplier(Supplier supplier);
    List<Supplier> getAllSuppliers() throws NoRecordsFoundException;
    Supplier getSupplierById(Long id) throws SupplierNotFoundException;
    Supplier getSupplierByName(String companyName) throws SupplierNotFoundException;
    Supplier updateSupplierById(Long id, Supplier supplierDetails) throws SupplierNotFoundException;
    Supplier deleteSupplierById(Long id) throws SupplierNotFoundException;
}
