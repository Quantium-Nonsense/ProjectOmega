package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.Company;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.CompanyRepository;
import com.project.omega.service.interfaces.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public Company addCompany(Company company) {
        companyRepository.save(company);
        return company;
    }

    public List<Company> getAllCompanies() throws NoRecordsFoundException {
        List<Company> supplierCompanies = companyRepository.findAll();
        if(supplierCompanies.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return supplierCompanies;
    }

    public Company getCompanyById(Long id) throws NoRecordsFoundException {
        Optional<Company> supplier = companyRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException("Supplier not found.");
        }
        return supplier.get();
    }

    public Company getCompanyByName(String companyName) throws NoRecordsFoundException {
        Optional<Company> supplier = companyRepository.findByCompanyName(companyName);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException("Supplier not found.");
        }
        return supplier.get();
    }

    public Company updateCompanyById(Long id, Company companyDetails) throws NoRecordsFoundException {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        companyRepository.save(companyDetails);
        return company.get();

//        if(companyRepository.existsById(id)) {
//            throw new NoRecordsFoundException("Supplier not found.");
//        }
//        companyDetails.setId(id);
//        companyRepository.save(companyDetails);
//        return companyRepository.findById(id).get();
    }

    public Company deleteCompanyById(Long id) throws NoRecordsFoundException {
        Optional<Company> company = companyRepository.findById(id);
        if(!company.isPresent()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        companyRepository.deleteById(id);
        return company.get();
    }


}
