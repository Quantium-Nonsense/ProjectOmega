package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.entity.Supplier;
import com.quantiumnonsense.omega.exceptions.NoRecordsFoundException;
import com.quantiumnonsense.omega.exceptions.SupplierNotFoundException;

import java.util.List;

public interface SupplierService {
    Supplier addSupplier(Supplier supplier);
    List<Supplier> getAllSuppliers() throws NoRecordsFoundException;
    Supplier getSupplierById(Long id) throws SupplierNotFoundException;
    Supplier getSupplierByName(String companyName) throws SupplierNotFoundException;
    Supplier updateSupplierById(Long id, Supplier supplierDetails) throws SupplierNotFoundException;
    Supplier deleteSupplierById(Long id) throws SupplierNotFoundException;
}
