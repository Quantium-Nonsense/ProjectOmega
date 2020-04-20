package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.SupplierRepository;
import com.project.omega.service.interfaces.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier addSupplier(Supplier supplier) {
        supplierRepository.save(supplier);
        return supplier;
    }

    public List<Supplier> getAllSuppliers() throws NoRecordsFoundException {
        List<Supplier> supplierCompanies = supplierRepository.findAll();
        if(supplierCompanies.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return supplierCompanies;
    }

    public Supplier getSupplierById(Long id) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException("Supplier not found.");
        }
        return supplier.get();
    }

    public Supplier getSupplierByName(String companyName) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findByCompanyName(companyName);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException("Supplier not found.");
        }
        return supplier.get();
    }

    public Supplier updateSupplierById(Long id, Supplier supplierDetails) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        supplierRepository.save(supplierDetails);
        return supplier.get();

//        if(companyRepository.existsById(id)) {
//            throw new NoRecordsFoundException("Supplier not found.");
//        }
//        companyDetails.setId(id);
//        companyRepository.save(companyDetails);
//        return companyRepository.findById(id).get();
    }

    public Supplier deleteSupplierById(Long id) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        supplierRepository.deleteById(id);
        return supplier.get();
    }


}
