package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.Company;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.List;

public interface CompanyService {
    Company addCompany(Company company);
    List<Company> getAllCompanies() throws NoRecordsFoundException;
    Company getCompanyById(Long id) throws NoRecordsFoundException;
    Company getCompanyByName(String companyName) throws NoRecordsFoundException;
    Company updateCompanyById(Long id, Company companyDetails) throws NoRecordsFoundException;
    Company deleteCompanyById(Long id) throws NoRecordsFoundException;
}
